import { Wrench, Phone, MapPin, Mail } from "lucide-react";
import { DEFAULT_BUSINESS_INFO } from "../../data/constants";

interface FooterProps {
  settings?: {
    address?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  onBookRepair: () => void;
  logoUrl?: string;
}

export function Footer({ settings, onBookRepair, logoUrl }: FooterProps) {
  const info = {
    address: settings?.address || DEFAULT_BUSINESS_INFO.address,
    phone: settings?.phone || DEFAULT_BUSINESS_INFO.phone,
    email: settings?.email || DEFAULT_BUSINESS_INFO.email,
    whatsapp: settings?.whatsapp || DEFAULT_BUSINESS_INFO.whatsapp,
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="PCFIXTECH logo" className="w-8 h-8 object-contain rounded-lg" />
              <span className="text-xl font-semibold">PCFIXTECH</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Professional windows/mac os device repair services in Indiana, USA.
              Fast, reliable, and affordable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><button onClick={onBookRepair} className="text-sm text-gray-400 hover:text-white transition-colors">Book Repair</button></li>
              <li><a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-400">MacBook Repair</span></li>
              <li><span className="text-sm text-gray-400">iPhone Repair</span></li>
              <li><span className="text-sm text-gray-400">iPad Repair</span></li>
              <li><span className="text-sm text-gray-400">Apple Watch Repair</span></li>
              <li><span className="text-sm text-gray-400">AirPods Repair</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">{info.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <a href={`tel:${info.phone}`} className="text-sm text-gray-400 hover:text-white transition-colors">{info.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <a href={`mailto:${info.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">{info.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} PCFIXTECH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
