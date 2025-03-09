import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Jovian Overseas
            </h3>
            <p className="text-green-200 mb-6">
              Premium agricultural exports connecting Indian farmers to global
              markets.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#about" },
                { name: "Products", href: "#products" },
                { name: "Services", href: "#services" },
                { name: "Contact", href: "#contact" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Payment Terms", href: "/payment-terms" },
                { name: "Careers", href: "/careers" },
                { name: "News", href: "/news" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-green-300 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Our Products
            </h4>
            <ul className="space-y-3">
              {["Grains", "Spices", "Oil Seeds", "Pulses", "Cotton"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-green-300 transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-300" />
                <span>123 Business Avenue, Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-300" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-300" />
                <span>contact@jovianoverseas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-300">
          <p>© 2024 Jovian Overseas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
