import { Smartphone, Laptop, Battery, HardDrive, Monitor, Cpu, Tv, Printer, Camera } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Repairing",
    description: "Complete mobile repair services including screen replacement, battery change, charging port fix, water damage repair, and software troubleshooting for all brands."
  },
  {
    icon: Laptop,
    title: "Laptop Repairing",
    description: "Expert laptop repair including screen replacement, keyboard repair, battery replacement, hard drive upgrade, motherboard repair, and virus removal."
  },
  {
    icon: Monitor,
    title: "Computer Repairing",
    description: "Professional desktop computer repair services including hardware replacement, motherboard repair, RAM upgrade, power supply fix, and system optimization."
  },
  {
    icon: Printer,
    title: "Printer Repairing",
    description: "Complete printer repair and maintenance for all types including inkjet, laser, and multifunction printers. We fix paper jams, print quality issues, and connectivity problems."
  },
  {
    icon: Tv,
    title: "LED TV Repairing",
    description: "Professional LED TV repair for all brands including display panel replacement, backlight repair, sound issues, board replacements, and remote control problems."
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Expert data recovery services from damaged phones, laptops, computers, and storage devices. We recover lost files, photos, and important documents."
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    description: "Professional CCTV camera installation and setup services for homes and businesses with remote monitoring support and maintenance."
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Quick battery replacement services for mobiles, laptops, and other electronic devices using genuine, high-quality batteries."
  },
  {
    icon: Cpu,
    title: "Hardware Upgrades",
    description: "Speed up your devices with RAM upgrades, SSD installation, graphics card replacement, and other hardware enhancement services."
  }
];

export function Services() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive repair services for all your electronic devices and installation needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="size-6 text-blue-600" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}