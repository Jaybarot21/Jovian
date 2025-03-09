import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Home, FileText, CreditCard, Briefcase, Newspaper } from "lucide-react";

const NavigationBar = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center space-x-1 border border-green-200">
        <Link to="/">
          <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
            <Home className="h-5 w-5 text-green-700" />
          </Button>
        </Link>
        <Link to="/terms">
          <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
            <FileText className="h-5 w-5 text-green-700" />
          </Button>
        </Link>
        <Link to="/payment-terms">
          <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
            <CreditCard className="h-5 w-5 text-green-700" />
          </Button>
        </Link>
        <Link to="/careers">
          <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
            <Briefcase className="h-5 w-5 text-green-700" />
          </Button>
        </Link>
        <Link to="/news">
          <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
            <Newspaper className="h-5 w-5 text-green-700" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default NavigationBar;
