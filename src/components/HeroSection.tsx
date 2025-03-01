import { motion } from "framer-motion";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('https://iili.io/32okrR1.md.jpg?q=80&w=2000')] bg-cover bg-center opacity-99" />
        {/* Animated elements */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0 h-[20vh] opacity-10"
            style={{
              background: `linear-gradient(180deg, rgba(101,163,13,0) 0%, rgba(101,163,13,${0.05 * i}) 100%)`,
              transform: `translateY(${(i - 1) * 20}%)`,
            }}
            animate={{
              translateX: ["-5%", "5%", "-5%"],
              translateY: [
                `${(i - 1) * 20}%`,
                `${(i - 1) * 20 + 2}%`,
                `${(i - 1) * 20}%`,
              ],
            }}
            transition={{
              duration: 7 - i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-green-800">
              Global Agricultural Excellence
            </h1>
            <p className="text-lg md:text-xl text-green-700/80 mb-8 leading-relaxed">
              Premium exporters of agricultural treasures: chickpeas,
              groundnuts, cotton, rice, and exquisite spices. Bridging Indian
              agriculture with global markets through excellence and
              reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg rounded-lg"
              >
                Explore Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 hover:border-green-700 text-green-700 hover:text-green-800 px-6 py-3 text-lg rounded-lg"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200"
              alt="Agricultural Fields"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
