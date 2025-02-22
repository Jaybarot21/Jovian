import { motion } from "framer-motion";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-white to-blue-300 text-transparent bg-clip-text"
          whileHover={{ scale: 1.05 }}
        >
          Jovian Overseas
        </motion.div>
        <nav className="hidden md:flex gap-8">
          {["Products", "Partners", "About", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-blue-100/80 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <Button className="bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur transition-all duration-300">
          Get in Touch
        </Button>
      </div>
    </motion.div>
  );
};

export default Navigation;
