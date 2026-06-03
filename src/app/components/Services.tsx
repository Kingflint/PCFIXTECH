import { motion } from "motion/react";
import {
  Monitor,
  Wifi,
  Cable,
  Server,
  Cctv,
  CreditCard,
  Briefcase,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Monitor,
    title: "Computer Repair & IT Support",
    description:
      "Windows desktop & laptop repair, hardware diagnostics, OS installs & upgrades, virus/malware removal, data backup & recovery, and performance tuning.",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    icon: Wifi,
    title: "Network & Wireless Solutions",
    description:
      "Wi-Fi setup & optimization, wireless access point installation & repair, network troubleshooting, and small-business network deployment.",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/50",
  },
  {
    icon: Cable,
    title: "Structured Cabling",
    description:
      "CAT5, CAT5e & CAT6 cable installation, cable testing & certification, cable management, and office/commercial cabling solutions.",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    icon: Server,
    title: "Server & Infrastructure",
    description:
      "Server rack installation & organization, network equipment installation, IT infrastructure setup, and server-room deployment support.",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    icon: Cctv,
    title: "Security & Surveillance",
    description:
      "Security camera & CCTV installation, system configuration, camera maintenance & repair, upgrades, and remote monitoring setup.",
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/50",
  },
  {
    icon: CreditCard,
    title: "Point of Sale (POS) Services",
    description:
      "POS system & hardware installation, network configuration, troubleshooting & repair, with retail and restaurant POS support.",
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/50",
  },
  {
    icon: Briefcase,
    title: "Business IT Services",
    description:
      "Office IT equipment setup, preventive maintenance, IT consulting, technology upgrades, and on-site or remote technical support.",
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-950/50",
  },
  {
    icon: Smartphone,
    title: "Apple Device Repair",
    description:
      "MacBook, iPhone, iPad & Apple Watch repair. iPhone and iPad repairs are available to clients using our services from Nigeria only.",
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-950/50",
  },
];

interface ServicesProps {
  onBookRepair: () => void;
}

export function Services({ onBookRepair }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reliable computer repair, network infrastructure, surveillance, POS solutions,
            and business IT support for residential, commercial, and organizational clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-transparent hover:border-primary/20 h-full"
                onClick={onBookRepair}
              >
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-4`}>
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
