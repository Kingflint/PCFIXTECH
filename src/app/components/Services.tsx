import { motion } from "motion/react";
import { Laptop, Smartphone, Tablet, Watch, Headphones, Monitor } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Laptop,
    title: "MacBook Repair",
    description: "Screen, battery, keyboard, trackpad, logic board & more",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    icon: Smartphone,
    title: "iPhone Repair",
    description: "Screen replacement, battery, charging port, camera & Face ID",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/50",
  },
  {
    icon: Tablet,
    title: "iPad Repair",
    description: "Screen, battery, charging port, button & software issues",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    icon: Watch,
    title: "Apple Watch Repair",
    description: "Screen, battery, crown, sensor & connectivity issues",
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/50",
  },
  {
    icon: Headphones,
    title: "AirPods Repair",
    description: "Audio issues, battery, connectivity & charging case repair",
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-950/50",
  },
  {
    icon: Monitor,
    title: "Non-Apple Devices",
    description: "HP, Dell, Lenovo, Samsung & other laptop/phone repairs",
    color: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-50 dark:bg-gray-800/50",
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
            Our Repair Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional repair services for all Apple devices and select non-Apple brands.
            Quality parts, certified technicians, guaranteed work.
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
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-transparent hover:border-primary/20"
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
