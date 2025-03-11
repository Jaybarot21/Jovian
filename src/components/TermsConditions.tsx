import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ContentDisplay from "./ContentDisplay";
import NavigationBar from "./NavigationBar";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Legal Information
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              Terms and Conditions
            </h1>
            <p className="text-lg text-green-700/80">
              Please read these terms carefully before engaging in business with
              Jovian Overseas
            </p>
          </div>

          <ContentDisplay pageType="terms_conditions" />

          <div className="text-center mt-12">
            <p className="text-green-700">
              For any questions regarding our Terms and Conditions, please
              contact our legal department at:
            </p>
            <p className="font-medium text-green-800 mt-2">
              legal@jovianoverseas.com
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default TermsConditions;
