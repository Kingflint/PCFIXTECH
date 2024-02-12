import { Shield, Clock, Award, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most repairs completed within 1-2 hours. Same-day service available for urgent repairs."
  },
  {
    icon: Shield,
    title: "30-Day Warranty",
    description: "All repairs backed by our comprehensive 30-day warranty for your peace of mind."
  },
  {
    icon: Award,
    title: "Certified Technicians",
    description: "Our team consists of certified professionals with years of experience in device repair."
  },
  {
    icon: ThumbsUp,
    title: "Quality Parts",
    description: "We use only high-quality, genuine parts to ensure the longevity of your device."
  }
];

export function Features() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">Why Choose TechFix Pro?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best repair experience with quality service and customer satisfaction
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="size-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="size-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}