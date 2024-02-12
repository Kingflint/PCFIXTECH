import { motion } from "motion/react";
import { Truck, MapPin, Wrench, CheckCircle, CreditCard, RotateCcw } from "lucide-react";

const steps = [
  {
    icon: Wrench,
    step: "1",
    title: "Book Your Repair",
    description: "Select your device, describe the issue, and choose a delivery method.",
    color: "bg-blue-600",
  },
  {
    icon: Truck,
    step: "2",
    title: "We Pick Up or You Drop Off",
    description: "Our agent picks up your device, or bring it to our repair station.",
    color: "bg-green-600",
  },
  {
    icon: CheckCircle,
    step: "3",
    title: "Diagnosis & Repair Quote",
    description: "Our technicians diagnose the issue and send you a repair cost estimate.",
    color: "bg-orange-600",
  },
  {
    icon: CreditCard,
    step: "4",
    title: "Approve & Pay for Repair",
    description: "Review the diagnosis, approve the repair, and pay the repair fee.",
    color: "bg-purple-600",
  },
  {
    icon: RotateCcw,
    step: "5",
    title: "Repair & Return",
    description: "We fix your device and return it to you — good as new!",
    color: "bg-pink-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your Apple device repaired is easy. Just follow these simple steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-orange-200 via-purple-200 to-pink-200 dark:from-blue-800 dark:via-green-800 dark:via-orange-800 dark:via-purple-800 dark:to-pink-800" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center relative"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-xs font-bold text-primary mb-2">STEP {step.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
