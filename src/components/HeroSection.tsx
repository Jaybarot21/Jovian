import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Globe3D from "./Globe3D";
import StatsOverlay from "./StatsOverlay";
import WaterEffect from "./WaterEffect";

const HeroSection = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-slate-950 via-[#001B3B] to-[#002D5E] relative overflow-hidden">
      {/* Animated water effect */}
      <WaterEffect />

      {/* Ship Image with Animation */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1577126781627-e2e41c49952c?q=80&w=2000"
            alt="Cargo Ship"
            className="w-[120%] h-full object-cover opacity-30"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-slate-900/30 p-8 rounded-2xl border border-white/10"
          >
            <motion.h1
              className="text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              Global Agricultural
              <span className="block mt-2">Excellence</span>
            </motion.h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Premium exporters of agricultural treasures: chickpeas,
              groundnuts, cotton, rice, and exquisite spices. Bridging Indian
              agriculture with global markets through excellence and
              reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40"
              >
                Explore Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-blue-100 border-blue-400/50 hover:bg-blue-400/10 px-8 py-6 text-lg rounded-xl backdrop-blur transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px]"
            >
              <Globe3D />
              <StatsOverlay />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
    </div>
  );
};

export default HeroSection;
