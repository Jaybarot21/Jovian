import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Globe, Phone } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar with contact info */}
      <div className="hidden md:block bg-green-900 text-white py-3">
        <div className="container mx-auto px-4 flex flex-wrap md:flex-nowrap justify-between items-center">
          <div className="flex items-center space-x-6 text-[13px] md:text-sm">
            <div className="flex items-center whitespace-nowrap">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">+91 123 456 7890</span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Globe className="h-4 w-4 mr-2" />
              <span className="font-medium">contact@jovianoverseas.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-[13px] md:text-sm">
            <a
              href="/careers"
              className="hover:text-green-300 transition-colors font-medium"
            >
              Careers
            </a>
            <a
              href="/news"
              className="hover:text-green-300 transition-colors font-medium"
            >
              News
            </a>
            <a
              href="/terms"
              className="hover:text-green-300 transition-colors font-medium"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 w-full z-50 ${isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"} transition-all duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center h-16 sm:h-20 px-4">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl sm:text-2xl font-bold text-green-800">
              Jovian Overseas
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-5 lg:gap-8">
            {[
              { name: "Home", href: "#" },
              {
                name: "Products",
                href: "#products",
                hasDropdown: true,
                dropdownItems: [
                  "Pulses",
                  "Grains",
                  "Spices",
                  "Oil Seeds",
                  "Cotton",
                ],
              },
              { name: "Services", href: "#services" },
              { name: "Partners", href: "#partners" },
              { name: "About", href: "#about" },
              { name: "Contact", href: "#contact" },
              { name: "Forms", href: "/forms" },
            ].map((item) => (
              <div key={item.name} className="relative group">
                <motion.a
                  href={item.href}
                  className="text-sm font-medium text-green-700 hover:text-green-500 transition-colors flex items-center"
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                </motion.a>

                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {item.dropdownItems.map((subItem) => (
                      <a
                        key={subItem}
                        href={`#${subItem.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-2.5 text-sm text-green-700 hover:bg-green-50 hover:text-green-600"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button className="bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-300 text-sm md:text-base py-1.5 md:py-2">
              Get in Touch
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-green-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-green-100"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {[
                  "Home",
                  "Products",
                  "Services",
                  "Partners",
                  "About",
                  "Contact",
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-green-700 hover:text-green-500 py-2 border-b border-green-50 text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div className="mt-6">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-300 py-2.5 text-base">
                  Get in Touch
                </Button>
              </div>
              <div className="mt-6 flex flex-col space-y-3 text-base text-green-700 bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-green-600" />
                  <span className="font-medium">+91 123 456 7890</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-green-600" />
                  <span className="font-medium">
                    contact@jovianoverseas.com
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Navigation;
