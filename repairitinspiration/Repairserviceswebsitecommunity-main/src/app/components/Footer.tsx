import { Wrench, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="size-8 text-blue-400" />
              <span className="text-xl">TechFix Pro</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for mobile, laptop, computer, printer, and LED TV repairs. Fast, reliable, and affordable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Mobile Repairing</li>
              <li>Laptop Repairing</li>
              <li>Computer Repairing</li>
              <li>Printer Repairing</li>
              <li>LED TV Repairing</li>
              <li>CCTV Installation</li>
              <li>Data Recovery</li>
              <li>Battery Replacement</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Kalahazra more, old B.D.O rode</li>
              <li>SONAKHALI BAZAR, Sonakhali</li>
              <li>West Bengal 743312</li>
              <li>+91 7501573355</li>
              <li>alokeshbar2015@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 TechFix Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="size-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="size-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="size-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}