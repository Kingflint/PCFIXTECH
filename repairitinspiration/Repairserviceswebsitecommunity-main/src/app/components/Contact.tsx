import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

export function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or ready to book a repair? Contact us today!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-gray-600">Kalahazra more, old B.D.O rode<br />SONAKHALI BAZAR, Sonakhali<br />West Bengal 743312</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600">+91 7501573355</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600">alokeshbar2015@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600">
                      Every Day: 8:00 AM - 8:00 PM<br />
                      Open All Days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1566728595340-a0484f0494e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwcmVwYWlyJTIwZml4aW5nfGVufDF8fHx8MTc2OTA2MzgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Phone repair service"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl text-gray-900 mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                  Your Name
                </label>
                <Input id="name" placeholder="John Doe" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" />
              </div>

              <div>
                <label htmlFor="device" className="block text-sm text-gray-700 mb-2">
                  Device Type
                </label>
                <Input id="device" placeholder="e.g., iPhone 14, MacBook Pro" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about the issue with your device..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}