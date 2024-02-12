import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic Repair",
    price: "$49",
    description: "Perfect for simple fixes",
    features: [
      "Battery replacement",
      "Basic diagnostics",
      "30-day warranty",
      "Standard parts",
      "2-3 hour turnaround"
    ]
  },
  {
    name: "Standard Repair",
    price: "$99",
    description: "Most popular choice",
    features: [
      "Screen replacement",
      "Full diagnostics",
      "60-day warranty",
      "Quality parts",
      "1-2 hour turnaround",
      "Free cleaning"
    ],
    popular: true
  },
  {
    name: "Premium Repair",
    price: "$199",
    description: "Complete device care",
    features: [
      "Complete hardware repair",
      "Advanced diagnostics",
      "90-day warranty",
      "Genuine parts",
      "30-min turnaround",
      "Free cleaning & checkup",
      "Priority support"
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the service package that fits your needs. No hidden fees, ever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-blue-600 border-2 shadow-xl' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl text-gray-900">{plan.price}</span>
                  <span className="text-gray-600"> starting</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
