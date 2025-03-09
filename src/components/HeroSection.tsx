import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Award, Globe, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('https://iili.io/32okrR1.md.jpg?q=80&w=2000')] bg-cover bg-center opacity-60" />
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
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Trusted by businesses in 25+ countries
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-green-800">
              Global Agricultural{" "}
              <span className="text-green-600">Excellence</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-green-700/80 mb-8 leading-relaxed max-w-xl">
              Premium exporters of agricultural treasures: chickpeas,
              groundnuts, cotton, rice, and exquisite spices. Bridging Indian
              agriculture with global markets through excellence and
              reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg rounded-lg group"
              >
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 hover:border-green-700 text-green-700 hover:text-green-800 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg rounded-lg"
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { icon: Globe, text: "Global Reach", value: "25+" },
                { icon: Award, text: "Years Experience", value: "10+" },
                { icon: TrendingUp, text: "Tons Exported", value: "1000+" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="flex flex-col items-center text-center p-1 sm:p-2"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center mb-1 sm:mb-2">
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" />
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-green-700">
                    {item.value}
                  </p>
                  <p className="text-xs sm:text-sm text-green-600">
                    {item.text}
                  </p>
                </motion.div>
              ))}
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

            {/* Floating badges */}
            <motion.div
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm font-medium text-green-800">
                ISO 22000:2018 Certified
              </p>
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm font-medium text-green-800">
                Premium Quality Exports
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling marquee of partners */}
      <div className="relative mt-8 py-5 bg-green-50 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-green-50 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-green-50 to-transparent z-10"></div>

        <div className="flex space-x-8 sm:space-x-12 animate-marquee">
          {[
            "Trusted by",
            "Cargill",
            "ADM",
            "Olam",
            "Louis Dreyfus",
            "Bunge",
            "Wilmar",
            "Glencore",
            "COFCO",
          ].map((partner, index) => (
            <div
              key={index}
              className={`text-green-700 text-sm sm:text-base ${index === 0 ? "font-medium" : "opacity-70"}`}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
