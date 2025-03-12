import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  CreditCard,
  Briefcase,
  Newspaper,
  ShoppingBag,
  Info,
} from "lucide-react";
import { useState, useEffect } from "react";

const NavigationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeRoute, setActiveRoute] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Set active route based on current path
    setActiveRoute(window.location.pathname);
  }, []);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/products", icon: ShoppingBag, label: "Products" },
    { path: "/about", icon: Info, label: "About Us" },
    { path: "/terms", icon: FileText, label: "Terms" },
    { path: "/payment-terms", icon: CreditCard, label: "Payment" },
    { path: "/careers", icon: Briefcase, label: "Careers" },
    { path: "/news", icon: Newspaper, label: "News" },
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 left-0 right-0 z-50 w-fit mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-3 sm:px-6 py-3 flex items-center justify-center space-x-2 sm:space-x-4 border border-green-200 mx-auto overflow-x-auto max-w-[95vw]">
        {navItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <Button
              variant="ghost"
              className={`rounded-full w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 p-0 relative group ${activeRoute === item.path ? "bg-green-50" : ""}`}
              onClick={() => setActiveRoute(item.path)}
            >
              <item.icon
                className={`h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 ${activeRoute === item.path ? "text-green-600" : "text-green-700"}`}
              />

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {item.label}
              </span>

              {/* Active indicator */}
              {activeRoute === item.path && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-600 rounded-full"></span>
              )}
            </Button>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default NavigationBar;
