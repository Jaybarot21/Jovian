import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Globe, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../lib/translations";
import { useContactInfo } from "../hooks/useContactInfo";
import { useNavigation } from "../hooks/useNavigation";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { contactInfo } = useContactInfo();
  const { navigationItems, loading } = useNavigation("header");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-green-800"
            >
              Jovian Overseas
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-5 lg:gap-8">
            {!loading &&
              navigationItems.map((item) => (
                <div key={item.id} className="relative group">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center"
                  >
                    {item.href.startsWith("/#") ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-green-700 hover:text-green-500 transition-colors flex items-center"
                      >
                        {t(item.name.toLowerCase().replace(/ /g, ""))}
                        {item.has_dropdown && (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-sm font-medium text-green-700 hover:text-green-500 transition-colors flex items-center"
                      >
                        {t(item.name.toLowerCase().replace(/ /g, ""))}
                        {item.has_dropdown && (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </Link>
                    )}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
                  </motion.div>

                  {item.has_dropdown && item.dropdownItems && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {item.dropdownItems.map((subItem) => (
                        <a
                          key={subItem.id}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-sm text-green-700 hover:bg-green-50 hover:text-green-600"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button className="bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-300 text-sm md:text-base py-1.5 md:py-2">
              {t("getInTouch")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="text-green-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
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
                {!loading &&
                  navigationItems.map((item) =>
                    item.href.startsWith("/#") ? (
                      <a
                        key={item.id}
                        href={item.href}
                        className="text-green-700 hover:text-green-500 py-2 border-b border-green-50 text-base font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t(item.name.toLowerCase().replace(/ /g, ""))}
                      </a>
                    ) : (
                      <Link
                        key={item.id}
                        to={item.href}
                        className="text-green-700 hover:text-green-500 py-2 border-b border-green-50 text-base font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t(item.name.toLowerCase().replace(/ /g, ""))}
                      </Link>
                    ),
                  )}
              </nav>
              <div className="mt-6">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-300 py-2.5 text-base">
                  {t("getInTouch")}
                </Button>
              </div>
              <div className="mt-6 flex flex-col space-y-3 text-base text-green-700 bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-green-600" />
                  <span className="font-medium">
                    {contactInfo?.phone || "+91 123 456 7890"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-green-600" />
                  <span className="font-medium">
                    {contactInfo?.email || "contact@jovianoverseas.com"}
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
