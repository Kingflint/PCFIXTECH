import { useState } from "react";
import { motion } from "motion/react";
import { X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type FieldType = "text" | "number" | "textarea" | "select";

interface ServiceField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface ServiceDef {
  id: string;
  title: string;
  blurb: string;
  fields: ServiceField[];
}

export const SERVICE_DEFS: Record<string, ServiceDef> = {
  "computer-repair": {
    id: "computer-repair",
    title: "Computer Repair & IT Support",
    blurb: "Tell us about the computer that needs attention.",
    fields: [
      { id: "deviceType", label: "Device type", type: "select", required: true, options: ["Windows Desktop", "Windows Laptop", "All-in-One PC", "Workstation", "Other"] },
      { id: "brandModel", label: "Brand & model", type: "text", placeholder: "e.g. Dell OptiPlex 7090" },
      { id: "serviceNeeded", label: "What do you need?", type: "select", required: true, options: ["Hardware diagnostics & troubleshooting", "Software installation & configuration", "Virus / malware / spyware removal", "OS installation or upgrade", "Data backup & recovery", "Performance optimization", "Hardware upgrade", "Other"] },
      { id: "details", label: "Describe the issue", type: "textarea", placeholder: "What is happening with the device?", required: true },
    ],
  },
  "network-wireless": {
    id: "network-wireless",
    title: "Network & Wireless Solutions",
    blurb: "Help us scope your Wi-Fi or network project.",
    fields: [
      { id: "serviceNeeded", label: "Service needed", type: "select", required: true, options: ["Wi-Fi setup & optimization", "Wireless access point installation", "Access point repair & maintenance", "Network troubleshooting", "Small-business network deployment", "Other"] },
      { id: "siteType", label: "Site type", type: "select", required: true, options: ["Home / Residential", "Small office", "Commercial / Retail", "Warehouse", "Multi-floor building", "Other"] },
      { id: "approxSize", label: "Approx. coverage area (sq ft) or # of rooms", type: "text", placeholder: "e.g. 2,500 sq ft or 6 rooms" },
      { id: "accessPoints", label: "Number of access points (if known)", type: "number", placeholder: "e.g. 3" },
      { id: "details", label: "Additional details", type: "textarea", placeholder: "Existing equipment, ISP, problem areas, etc." },
    ],
  },
  "structured-cabling": {
    id: "structured-cabling",
    title: "Structured Cabling",
    blurb: "Tell us about the cabling job.",
    fields: [
      { id: "cableType", label: "Cable type", type: "select", required: true, options: ["CAT5", "CAT5e", "CAT6", "Mixed / Not sure"] },
      { id: "drops", label: "Number of cable drops / runs", type: "number", placeholder: "e.g. 12", required: true },
      { id: "footage", label: "Approx. total footage (if known)", type: "text", placeholder: "e.g. 800 ft" },
      { id: "extras", label: "Also needed", type: "select", options: ["Cable testing & certification", "Cable management & organization", "Both", "None"] },
      { id: "siteType", label: "Site type", type: "select", required: true, options: ["Office", "Commercial", "Warehouse", "Residential", "Other"] },
      { id: "details", label: "Additional details", type: "textarea", placeholder: "Building layout, deadlines, etc." },
    ],
  },
  "server-infrastructure": {
    id: "server-infrastructure",
    title: "Server & Infrastructure",
    blurb: "Describe your infrastructure project.",
    fields: [
      { id: "serviceNeeded", label: "Service needed", type: "select", required: true, options: ["Server rack installation", "Rack organization & cable management", "Network equipment installation", "IT infrastructure setup", "Server-room deployment support", "Other"] },
      { id: "racks", label: "Number of racks / cabinets", type: "number", placeholder: "e.g. 2" },
      { id: "equipment", label: "Equipment involved", type: "text", placeholder: "e.g. 2x switches, 1x firewall, NAS" },
      { id: "details", label: "Additional details", type: "textarea", placeholder: "Room conditions, power, timeline, etc.", required: true },
    ],
  },
  "security-surveillance": {
    id: "security-surveillance",
    title: "Security & Surveillance",
    blurb: "Tell us about your camera / CCTV needs.",
    fields: [
      { id: "serviceNeeded", label: "Service needed", type: "select", required: true, options: ["New camera / CCTV installation", "System configuration", "Camera maintenance & repair", "System upgrade", "Remote monitoring setup", "Other"] },
      { id: "cameras", label: "Number of cameras", type: "number", placeholder: "e.g. 8", required: true },
      { id: "placement", label: "Placement", type: "select", required: true, options: ["Indoor", "Outdoor", "Both indoor & outdoor"] },
      { id: "remoteView", label: "Remote viewing on phone/PC?", type: "select", options: ["Yes", "No", "Not sure"] },
      { id: "details", label: "Additional details", type: "textarea", placeholder: "Existing system, property type, problem areas, etc." },
    ],
  },
  "pos-services": {
    id: "pos-services",
    title: "Point of Sale (POS) Services",
    blurb: "Help us scope your POS setup or support.",
    fields: [
      { id: "businessType", label: "Business type", type: "select", required: true, options: ["Retail", "Restaurant / Bar", "Service business", "Other"] },
      { id: "serviceNeeded", label: "Service needed", type: "select", required: true, options: ["POS system installation", "POS hardware setup", "POS network configuration", "Troubleshooting & repair", "Other"] },
      { id: "terminals", label: "Number of terminals / stations", type: "number", placeholder: "e.g. 3" },
      { id: "posBrand", label: "POS brand/software (if any)", type: "text", placeholder: "e.g. Square, Clover, Toast" },
      { id: "details", label: "Additional details", type: "textarea", placeholder: "What do you need help with?" },
    ],
  },
  "business-it": {
    id: "business-it",
    title: "Business IT Services",
    blurb: "Tell us how we can support your business.",
    fields: [
      { id: "serviceNeeded", label: "Service needed", type: "select", required: true, options: ["Office IT equipment setup", "Preventive maintenance", "IT consulting & technical support", "Technology upgrade", "On-site technical support", "Remote technical support", "Other"] },
      { id: "companyName", label: "Company name", type: "text", placeholder: "Your business name" },
      { id: "workstations", label: "Approx. number of workstations / users", type: "number", placeholder: "e.g. 15" },
      { id: "supportType", label: "Support preference", type: "select", options: ["On-site", "Remote", "Either"] },
      { id: "details", label: "Describe what you need", type: "textarea", placeholder: "Scope, recurring vs one-time, timeline, etc.", required: true },
    ],
  },
};

interface ServiceRequestProps {
  service: ServiceDef;
  user: any;
  onClose: () => void;
  onLogin: () => void;
  onSubmit: (data: any) => Promise<void> | void;
}

export function ServiceRequest({ service, user, onClose, onLogin, onSubmit }: ServiceRequestProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (id: string, v: string) => setValues((prev) => ({ ...prev, [id]: v }));

  const missingRequired =
    service.fields.some((f) => f.required && !values[f.id]?.trim()) ||
    !fullName.trim() ||
    !email.trim() ||
    !phone.trim();

  const handleSubmit = async () => {
    if (!user) { onLogin(); return; }
    if (missingRequired) { setError("Please fill in all required fields."); return; }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        serviceId: service.id,
        serviceTitle: service.title,
        fields: service.fields.map((f) => ({ label: f.label, value: values[f.id] || "" })),
        details: values,
        fullName,
        email,
        phone,
      });
      setDone(true);
    } catch (e: any) {
      setError(e?.message || "Could not submit your request. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{service.title}</h2>
            <p className="text-sm text-muted-foreground">Request service</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Request received</h3>
              <p className="text-muted-foreground">Thanks, {fullName.split(" ")[0] || "there"}. Our team will review your {service.title.toLowerCase()} request and reach out shortly.</p>
              <Button className="mt-6" onClick={onClose}>Done</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.blurb}</p>

              {service.fields.map((f) => (
                <div key={f.id}>
                  <Label className="mb-2">{f.label}{f.required && <span className="text-destructive"> *</span>}</Label>
                  {f.type === "select" ? (
                    <Select value={values[f.id] || ""} onValueChange={(v) => set(f.id, v)}>
                      <SelectTrigger><SelectValue placeholder={`Select ${f.label.toLowerCase()}`} /></SelectTrigger>
                      <SelectContent>
                        {f.options?.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  ) : f.type === "textarea" ? (
                    <Textarea value={values[f.id] || ""} onChange={(e) => set(f.id, e.target.value)} placeholder={f.placeholder} rows={3} />
                  ) : (
                    <Input type={f.type === "number" ? "number" : "text"} value={values[f.id] || ""} onChange={(e) => set(f.id, e.target.value)} placeholder={f.placeholder} />
                  )}
                </div>
              ))}

              <div className="pt-2 border-t space-y-4">
                <h4 className="font-medium">Your contact details</h4>
                <div>
                  <Label className="mb-2">Full name <span className="text-destructive">*</span></Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-2">Email <span className="text-destructive">*</span></Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                  </div>
                  <div>
                    <Label className="mb-2">Phone <span className="text-destructive">*</span></Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          )}
        </div>

        {!done && (
          <div className="px-6 py-4 border-t flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitting || missingRequired}>
              {submitting ? "Submitting..." : user ? "Submit request" : "Sign in to submit"}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
