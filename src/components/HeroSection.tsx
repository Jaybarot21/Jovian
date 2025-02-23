import { motion } from "framer-motion";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1605745341112-85968b19335b"
          alt="Cargo Ship"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-2xl">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-slate-900/30 p-6 md:p-8 rounded-2xl border border-white/10"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              Global Agricultural
              <span className="block mt-2">Excellence</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-blue-100/90 mb-8 leading-relaxed">
              Premium exporters of agricultural treasures: chickpeas,
              groundnuts, cotton, rice, and exquisite spices. Bridging Indian
              agriculture with global markets through excellence and
              reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105"
              >
                Explore Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-xl backdrop-blur transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl"
          >
            {[
              { value: "10+", label: "Years Experience" },
              { value: "25+", label: "Countries Served" },
              { value: "1000+", label: "Tons Exported" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.2 }}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-300 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-blue-100/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
    </div>
  );
};

export default HeroSection;
