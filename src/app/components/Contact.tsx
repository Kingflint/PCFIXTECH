import { motion } from "motion/react";
import { MapPin, Phone, MessageCircle, Clock, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { DEFAULT_BUSINESS_INFO } from "../../data/constants";

interface ContactProps {
  settings?: {
    address?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    workingHours?: string;
  };
}

export function Contact({ settings }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const info = {
    address: settings?.address || DEFAULT_BUSINESS_INFO.address,
    phone: settings?.phone || DEFAULT_BUSINESS_INFO.phone,
    whatsapp: settings?.whatsapp || DEFAULT_BUSINESS_INFO.whatsapp,
    email: settings?.email || DEFAULT_BUSINESS_INFO.email,
    workingHours: settings?.workingHours || DEFAULT_BUSINESS_INFO.workingHours,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Open WhatsApp with pre-filled message
    const whatsappMessage = encodeURIComponent(`Hi iFixit! My name is ${name} (${email}). ${message}`);
    window.open(`${info.whatsapp}?text=${whatsappMessage}`, "_blank");
    setSending(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Reach out to us through any of these channels.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Repair Station</h3>
                <p className="text-muted-foreground text-sm">{info.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <a href={`tel:${info.phone}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  {info.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-950/50 rounded-lg flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">WhatsApp</h3>
                <a href={info.whatsapp} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-green-600 transition-colors">
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <a href={`mailto:${info.email}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  {info.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Working Hours</h3>
                <p className="text-muted-foreground text-sm">{info.workingHours}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-2xl border p-6">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <Textarea
                  placeholder="Tell us about your device issue..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={sending}>
                {sending ? "Sending..." : "Send via WhatsApp"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
