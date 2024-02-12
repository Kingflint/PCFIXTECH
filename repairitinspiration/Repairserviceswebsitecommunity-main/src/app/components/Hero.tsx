import { Button } from "@/app/components/ui/button";
import { CheckCircle } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="pt-24 pb-12 lg:pt-32 lg:pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900">
              Mobile, Laptop, Computer, Printer & LED TV Repairing
            </h1>
            <p className="text-lg text-gray-600">
              Professional repair services for all your electronic devices. We fix mobiles, laptops, computers, printers, and LED TVs with expert technicians and quality parts.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Same-day repair available</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">30-day warranty on all repairs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Free diagnostics & quotes</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-lg">
                Book Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Get a Quote
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1709102884400-b50ca1a12bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjByZXBhaXIlMjB0ZWNobmljaWFufGVufDF8fHx8MTc2OTA2MzgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Laptop repair technician"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}