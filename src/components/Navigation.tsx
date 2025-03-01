import { motion } from "framer-motion";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl font-bold text-green-800">
            Jovian Overseas
          </span>
        </motion.div>
        <nav className="hidden md:flex gap-8">
          {["Products", "Partners", "About", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-green-700 hover:text-green-500 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>
        <Button className="bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-300">
          Get in Touch
        </Button>
      </div>
    </motion.div>
  );
};

export default Navigation;
