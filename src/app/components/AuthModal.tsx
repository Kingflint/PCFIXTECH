import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const ALLOWED_EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "yahoo.co.uk", "outlook.com", "hotmail.com",
  "live.com", "msn.com", "icloud.com", "me.com", "mac.com",
  "aol.com", "protonmail.com", "proton.me", "zoho.com", "yandex.com",
  "mail.com", "gmx.com", "fastmail.com", "tutanota.com", "hairsparadise.com",
];

const PASSWORD_RULES = [
  { label: "8–15 characters", test: (p: string) => p.length >= 8 && p.length <= 15 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character (!@#$%^&*...)", test: (p: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(p) },
];

function validateEmail(email: string): string | null {
  if (!email) return "Email is required";
  const parts = email.split("@");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return "Invalid email format";
  const domain = parts[1].toLowerCase();
  if (!ALLOWED_EMAIL_DOMAINS.includes(domain)) {
    return `Email domain "@${domain}" is not supported. Use a popular provider like Gmail, Yahoo, Outlook, etc.`;
  }
  return null;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const passwordChecks = useMemo(() => PASSWORD_RULES.map(r => ({ ...r, pass: r.test(password) })), [password]);
  const allPasswordRulesPass = passwordChecks.every(r => r.pass);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); setLoading(false); return; }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!cred.user.emailVerified && cred.user.email !== "admin@hairsparadise.com") {
        await sendEmailVerification(cred.user);
        await auth.signOut();
        setError("Your email is not verified. A new verification link has been sent to your inbox. Please verify and try again.");
        setLoading(false);
        return;
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.code === "auth/invalid-credential" ? "Invalid email or password" : err.message);
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name.trim()) { setError("Full name is required"); setLoading(false); return; }
    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); setLoading(false); return; }
    if (!allPasswordRulesPass) { setError("Password does not meet all requirements"); setLoading(false); return; }
    if (!passwordsMatch) { setError("Passwords do not match"); setLoading(false); return; }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, "ifixit_users", cred.user.uid), {
        uid: cred.user.uid,
        email,
        displayName: name,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      });
      await sendEmailVerification(cred.user);
      await auth.signOut();
      setVerificationSent(true);
    } catch (err: any) {
      setError(err.code === "auth/email-already-in-use" ? "An account with this email already exists" : err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userDoc = await getDoc(doc(db, "ifixit_users", result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "ifixit_users", result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          isAdmin: false,
          createdAt: new Date().toISOString(),
        });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); setLoading(false); return; }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const switchMode = (newMode: "login" | "signup" | "reset") => {
    setMode(newMode);
    setError("");
    setPassword("");
    setConfirmPassword("");
    setVerificationSent(false);
    setResetSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Reset Password"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Verification sent screen */}
        {verificationSent ? (
          <div className="text-center py-6">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="font-medium mb-2">Verify your email</p>
            <p className="text-sm text-muted-foreground mb-4">
              We've sent a verification link to <strong>{email}</strong>. Please check your inbox and click the link to activate your account.
            </p>
            <Button onClick={() => switchMode("login")} className="w-full">
              Go to Sign In
            </Button>
          </div>
        ) : mode === "reset" ? (
          resetSent ? (
            <div className="text-center py-6">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="font-medium mb-2">Check your email</p>
              <p className="text-sm text-muted-foreground mb-4">We've sent a password reset link to <strong>{email}</strong></p>
              <Button onClick={() => switchMode("login")} variant="outline">
                Back to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <Label className="mb-2">Email</Label>
                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => switchMode("login")}>
                Back to Sign In
              </Button>
            </form>
          )
        ) : (
          <>
            {/* Google sign-in temporarily disabled (re-enable once auth.pc-fix-tech.com is set up). */}
            {false && (
              <>
                <Button variant="outline" className="w-full mb-4" onClick={handleGoogleSignIn} disabled={loading}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 mb-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR</span>
                  <Separator className="flex-1" />
                </div>
              </>
            )}

            <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <Label className="mb-2">Full Name</Label>
                  <Input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              )}
              <div>
                <Label className="mb-2">Email</Label>
                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {mode === "signup" && email && validateEmail(email) && (
                  <p className="text-xs text-destructive mt-1">{validateEmail(email)}</p>
                )}
              </div>
              <div>
                <Label className="mb-2">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === "signup" ? "Create a strong password" : "Password"}
                    value={password}
                    onChange={(e) => { if (mode === "signup" && e.target.value.length > 15) return; setPassword(e.target.value); }}
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === "signup" && password && (
                  <div className="mt-2 space-y-1">
                    {passwordChecks.map((r, i) => (
                      <div key={i} className={`flex items-center gap-1.5 text-xs ${r.pass ? "text-green-600" : "text-muted-foreground"}`}>
                        {r.pass ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {r.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {mode === "signup" && (
                <div>
                  <Label className="mb-2">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => { if (e.target.value.length > 15) return; setConfirmPassword(e.target.value); }}
                      required
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                  )}
                  {passwordsMatch && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Passwords match</p>
                  )}
                </div>
              )}

              {mode === "login" && (
                <button type="button" onClick={() => switchMode("reset")} className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || (mode === "signup" && (!allPasswordRulesPass || !passwordsMatch || !!validateEmail(email)))}
              >
                {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => switchMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline font-medium">
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
