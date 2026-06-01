import { motion } from "motion/react";
import { Shield, Clock, Award, Cpu } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most repairs completed within 24-48 hours. We value your time.",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    icon: Shield,
    title: "30-Day Warranty",
    description: "Every repair comes with a 30-day warranty for your peace of mind.",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/50",
  },
  {
    icon: Award,
    title: "Certified Technicians",
    description: "Our team is trained to handle all Apple devices with expertise.",
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/50",
  },
  {
    icon: Cpu,
    title: "Quality Parts",
    description: "We use only premium quality replacement parts for all repairs.",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/50",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose PCFIXTECH?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine expertise, speed, and quality to deliver the best repair experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
