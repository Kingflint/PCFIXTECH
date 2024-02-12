import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, X, Laptop, Smartphone, Tablet, Watch, Headphones, Monitor, Truck, MapPin, Package, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { getStates, getLGAsForState } from "../../data/nigerianStatesLGAs";
import { APPLE_DEVICE_MODELS, NON_APPLE_BRANDS, DEVICE_ISSUES, getIssuesForCategory, isAppleDevice } from "../../data/devices";
import { DELIVERY_OPTIONS, DEFAULT_SERVICE_FEE_APPLE, DEFAULT_SERVICE_FEE_NON_APPLE, DEFAULT_MINIMUM_PICKUP_FEE, DEFAULT_PICKUP_LOCAL_FEE, formatPrice } from "../../data/constants";
import type { DeliveryMethod } from "../../data/constants";
import type { DeviceCategory } from "../../data/devices";
import type { SiteSettings } from "../../types";

const DEVICE_CATEGORIES: { id: DeviceCategory; label: string; icon: any; description: string }[] = [
  { id: "MacBook", label: "MacBook", icon: Laptop, description: "MacBook Pro & Air" },
  { id: "iPhone", label: "iPhone", icon: Smartphone, description: "All iPhone models" },
  { id: "iPad", label: "iPad", icon: Tablet, description: "iPad Pro, Air, Mini" },
  { id: "Apple Watch", label: "Apple Watch", icon: Watch, description: "All Watch models" },
  { id: "AirPods", label: "AirPods", icon: Headphones, description: "AirPods & AirPods Max" },
  { id: "Non-Apple", label: "Non-Apple Device", icon: Monitor, description: "HP, Dell, Lenovo, etc." },
];

const DELIVERY_ICONS: Record<string, any> = {
  "pickup-comfort": Truck,
  "physical": MapPin,
  "pickup-local": Package,
};

interface RepairBookingProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogin: () => void;
  settings: SiteSettings | null;
  onSubmitOrder: (orderData: any) => void;
}

export function RepairBooking({ isOpen, onClose, user, onLogin, settings, onSubmitOrder }: RepairBookingProps) {
  const [step, setStep] = useState(1);
  const [deviceCategory, setDeviceCategory] = useState<DeviceCategory | "">("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | "">("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");

  const totalSteps = 5;
  const nonAppleEnabled = settings?.nonAppleEnabled !== false;

  const filteredCategories = DEVICE_CATEGORIES.filter(c =>
    c.id === "Non-Apple" ? nonAppleEnabled : true
  );

  const enabledDeliveryOptions = DELIVERY_OPTIONS.filter(opt => {
    if (opt.id === "pickup-comfort") return settings?.pickupComfortEnabled !== false;
    if (opt.id === "physical") return settings?.physicalEnabled !== false;
    if (opt.id === "pickup-local") return settings?.pickupLocalEnabled !== false;
    return true;
  });

  const serviceFee = deviceCategory && isAppleDevice(deviceCategory as DeviceCategory)
    ? (settings?.serviceFeeApple || DEFAULT_SERVICE_FEE_APPLE)
    : (settings?.serviceFeeNonApple || DEFAULT_SERVICE_FEE_NON_APPLE);

  const getPickupFee = (): number => {
    if (deliveryMethod === "physical") return 0;
    if (deliveryMethod === "pickup-local") return settings?.pickupLocalFee || DEFAULT_PICKUP_LOCAL_FEE;
    // pickup-comfort: check LGA-specific pricing
    if (selectedLGA && settings?.lgaPickupPricing?.[selectedLGA]) {
      return settings.lgaPickupPricing[selectedLGA];
    }
    return settings?.minimumPickupFee || DEFAULT_MINIMUM_PICKUP_FEE;
  };

  const pickupFee = getPickupFee();
  const totalPayment = serviceFee + pickupFee;

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues(prev =>
      prev.includes(issueId) ? prev.filter(id => id !== issueId) : [...prev, issueId]
    );
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return !!deviceCategory;
      case 2:
        if (deviceCategory === "Non-Apple") return !!deviceBrand && !!customModel;
        return !!deviceModel;
      case 3: return selectedIssues.length > 0;
      case 4:
        if (!deliveryMethod) return false;
        if (deliveryMethod === "physical") return true;
        return !!selectedState && !!selectedLGA && !!address;
      case 5: return !!fullName && !!phone && !!email;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!user) {
      onLogin();
      return;
    }

    const modelName = deviceCategory === "Non-Apple"
      ? `${deviceBrand} - ${customModel}`
      : deviceModel;

    onSubmitOrder({
      deviceCategory,
      isApple: deviceCategory !== "Non-Apple",
      deviceModel: modelName,
      deviceBrand: deviceCategory === "Non-Apple" ? deviceBrand : undefined,
      selectedIssues,
      additionalNotes,
      deliveryMethod,
      state: selectedState || (settings?.state || "Lagos"),
      lga: selectedLGA || (settings?.lga || "Ojo"),
      address: deliveryMethod === "physical" ? settings?.address : address,
      fullName,
      phone,
      email,
      serviceFee,
      pickupFee,
      totalInitialPayment: totalPayment,
    });
  };

  const reset = () => {
    setStep(1);
    setDeviceCategory("");
    setDeviceModel("");
    setDeviceBrand("");
    setCustomModel("");
    setSelectedIssues([]);
    setAdditionalNotes("");
    setDeliveryMethod("");
    setSelectedState("");
    setSelectedLGA("");
    setAddress("");
    setPhone("");
  };

  if (!isOpen) return null;

  const availableIssues = deviceCategory ? getIssuesForCategory(deviceCategory as DeviceCategory) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Book a Repair</h2>
            <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
          </div>
          <button onClick={() => { reset(); onClose(); }} className="p-2 hover:bg-accent rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Device Category */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-xl font-semibold mb-2">What device needs repair?</h3>
                <p className="text-sm text-muted-foreground mb-6">Select the type of device you need repaired.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredCategories.map((cat) => {
                    const Icon = cat.icon;
                    const selected = deviceCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setDeviceCategory(cat.id); setDeviceModel(""); setDeviceBrand(""); setCustomModel(""); setSelectedIssues([]); }}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${selected ? "border-primary bg-primary/5" : "border-transparent bg-secondary/50 hover:bg-secondary"}`}
                      >
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                        <p className={`text-sm font-medium ${selected ? "text-primary" : "text-foreground"}`}>{cat.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Device Model */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-xl font-semibold mb-2">Select your device model</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {deviceCategory === "Non-Apple" ? "Tell us about your device." : `Choose your ${deviceCategory} model.`}
                </p>

                {deviceCategory === "Non-Apple" ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2">Brand</Label>
                      <Select value={deviceBrand} onValueChange={setDeviceBrand}>
                        <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                        <SelectContent>
                          {NON_APPLE_BRANDS.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2">Model Name</Label>
                      <Input placeholder="e.g., HP Pavilion 15, Dell XPS 13" value={customModel} onChange={(e) => setCustomModel(e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2">
                    {deviceCategory && (deviceCategory as string) !== "Non-Apple" && (APPLE_DEVICE_MODELS as any)[deviceCategory]?.map((model: any) => (
                      <button
                        key={model.id}
                        onClick={() => setDeviceModel(model.name)}
                        className={`px-4 py-3 rounded-lg border text-left transition-all ${deviceModel === model.name ? "border-primary bg-primary/5" : "border-transparent bg-secondary/50 hover:bg-secondary"}`}
                      >
                        <p className={`text-sm font-medium ${deviceModel === model.name ? "text-primary" : "text-foreground"}`}>{model.name}</p>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Issues */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-xl font-semibold mb-2">What's the issue?</h3>
                <p className="text-sm text-muted-foreground mb-6">Select all issues that apply to your device.</p>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {availableIssues.map(issue => {
                    const checked = selectedIssues.includes(issue.id);
                    return (
                      <button
                        key={issue.id}
                        onClick={() => handleIssueToggle(issue.id)}
                        className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg border text-left transition-all ${checked ? "border-primary bg-primary/5" : "border-transparent bg-secondary/50 hover:bg-secondary"}`}
                      >
                        <Checkbox checked={checked} className="mt-0.5" />
                        <div>
                          <p className={`text-sm font-medium ${checked ? "text-primary" : "text-foreground"}`}>{issue.name}</p>
                          <p className="text-xs text-muted-foreground">{issue.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <Label className="mb-2">Additional Notes (optional)</Label>
                  <Textarea
                    placeholder="Describe any other details about the issue..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Delivery Method & Location */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-xl font-semibold mb-2">How should we get your device?</h3>
                <p className="text-sm text-muted-foreground mb-6">Choose a delivery method.</p>

                <div className="grid gap-3 mb-6">
                  {enabledDeliveryOptions.map(opt => {
                    const Icon = DELIVERY_ICONS[opt.id];
                    const selected = deliveryMethod === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => { setDeliveryMethod(opt.id); if (opt.id === "physical") { setSelectedState(""); setSelectedLGA(""); setAddress(""); } }}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${selected ? "border-primary bg-primary/5" : "border-transparent bg-secondary/50 hover:bg-secondary"}`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-primary/10" : "bg-accent"}`}>
                          <Icon className={`w-5 h-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${selected ? "text-primary" : "text-foreground"}`}>{opt.name}</p>
                          <p className="text-xs text-muted-foreground">{opt.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {deliveryMethod && deliveryMethod !== "physical" && (
                  <div className="space-y-4">
                    <Separator />
                    <h4 className="font-medium">Pickup Location</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="mb-2">State</Label>
                        <Select value={selectedState} onValueChange={(v) => { setSelectedState(v); setSelectedLGA(""); }}>
                          <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                          <SelectContent>
                            {getStates().map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="mb-2">LGA</Label>
                        <Select value={selectedLGA} onValueChange={setSelectedLGA} disabled={!selectedState}>
                          <SelectTrigger><SelectValue placeholder="Select LGA" /></SelectTrigger>
                          <SelectContent>
                            {getLGAsForState(selectedState).map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2">Pickup Address</Label>
                      <Textarea placeholder="Full address for device pickup" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
                    </div>
                  </div>
                )}

                {deliveryMethod === "physical" && (
                  <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm font-medium text-primary mb-1">Repair Station Address</p>
                    <p className="text-sm text-muted-foreground">
                      {settings?.address || "11 Shaba Ojo Street, Igando Lagos"}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 5: Contact & Review */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-xl font-semibold mb-2">Review & Contact Info</h3>
                <p className="text-sm text-muted-foreground mb-6">Confirm your details and review the order.</p>

                {/* Order Summary */}
                <Card className="mb-6">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Device</span>
                      <span className="text-sm font-medium">
                        {deviceCategory === "Non-Apple" ? `${deviceBrand} - ${customModel}` : deviceModel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Issues</span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                        {selectedIssues.map(id => {
                          const issue = DEVICE_ISSUES.find(i => i.id === id);
                          return <Badge key={id} variant="secondary" className="text-xs">{issue?.name}</Badge>;
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Delivery</span>
                      <span className="text-sm font-medium">{DELIVERY_OPTIONS.find(o => o.id === deliveryMethod)?.name}</span>
                    </div>
                    {deliveryMethod !== "physical" && selectedLGA && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Location</span>
                        <span className="text-sm font-medium">{selectedLGA}, {selectedState}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Service Fee</span>
                      <span className="text-sm font-medium">{formatPrice(serviceFee)}</span>
                    </div>
                    {pickupFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Pickup Fee</span>
                        <span className="text-sm font-medium">{formatPrice(pickupFee)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold">Total (Initial Payment)</span>
                      <span className="text-lg font-bold text-primary">{formatPrice(totalPayment)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      * Repair cost will be determined after diagnosis. You'll pay the repair fee separately.
                    </p>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2">Full Name</Label>
                    <Input placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div>
                    <Label className="mb-2">Phone Number</Label>
                    <Input placeholder="e.g., 08012345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div>
                    <Label className="mb-2">Email Address</Label>
                    <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <Button variant="ghost" onClick={step === 1 ? () => { reset(); onClose(); } : handleBack}>
            {step === 1 ? "Cancel" : <><ArrowLeft className="w-4 h-4" /> Back</>}
          </Button>

          {step < totalSteps ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed()}>
              {user ? (
                <><CheckCircle className="w-4 h-4" /> Proceed to Payment</>
              ) : (
                "Sign In to Continue"
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
