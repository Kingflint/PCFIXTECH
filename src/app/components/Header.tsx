import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wrench, Menu, X, User, ShoppingBag, Search, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  user: any;
  isAdmin: boolean;
  onBookRepair: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onAdminClick: () => void;
  onTrackOrder: () => void;
  onStoreClick: () => void;
  onPurchasesClick: () => void;
  onHomeClick: () => void;
  storeEnabled: boolean;
  currentView: string;
  logoUrl?: string;
}

export function Header({
  user,
  isAdmin,
  onBookRepair,
  onLogin,
  onLogout,
  onAdminClick,
  onTrackOrder,
  onStoreClick,
  onPurchasesClick,
  onHomeClick,
  storeEnabled,
  currentView,
  logoUrl,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ifixit-theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("ifixit-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "#home", onClick: onHomeClick },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ];

  if (storeEnabled) {
    navLinks.push({ label: "Store", href: "#store", onClick: onStoreClick });
  }

  if (user && storeEnabled) {
    navLinks.push({ label: "My Purchases", href: "#purchases", onClick: onPurchasesClick });
  }

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.onClick) {
      link.onClick();
      setIsMobileMenuOpen(false);
    } else if (link.href.startsWith("#") && currentView === "home") {
      // Close menu first, then scroll after exit animation completes
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={onHomeClick} className="flex items-center gap-2 group">
            <img src="/logo.png" alt="PCFIXTECH logo" className="w-8 h-8 object-contain rounded-lg" />
            <span className="text-xl font-semibold text-foreground">PCFIXTECH</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 h-9 p-0">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {user && (
              <Button variant="ghost" size="sm" onClick={onTrackOrder} className="hidden sm:inline-flex">
                <Search className="w-4 h-4" />
                Track Order
              </Button>
            )}

            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={onAdminClick} className="hidden sm:inline-flex">
                Admin
              </Button>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                {!isAdmin && (
                  <span className="hidden sm:inline text-sm text-muted-foreground">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                )}
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={onLogin} className="hidden sm:inline-flex">
                <User className="w-4 h-4" />
                Sign In
              </Button>
            )}

            <Button onClick={onBookRepair} size="sm" className="hidden sm:inline-flex">
              Book Repair
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg"
                >
                  {link.label}
                </button>
              ))}

              {user && (
                <button onClick={() => { onTrackOrder(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg">
                  Track Order
                </button>
              )}

              {isAdmin && (
                <button onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm font-medium text-primary hover:bg-accent/50 rounded-lg">
                  Admin Dashboard
                </button>
              )}

              <div className="pt-2 border-t space-y-2">
                {!user && (
                  <Button variant="outline" className="w-full" onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}>
                    Sign In
                  </Button>
                )}
                <Button className="w-full" onClick={() => { onBookRepair(); setIsMobileMenuOpen(false); }}>
                  Book Repair
                </Button>
                {user && (
                  <Button variant="ghost" className="w-full" onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}>
                    Sign Out
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
