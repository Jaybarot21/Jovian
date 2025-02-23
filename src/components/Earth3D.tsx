import { motion } from "framer-motion";

const Earth3D = () => {
  return (
    <div className="relative w-full h-full">
      {/* Simple rotating sphere */}
      <motion.div
        className="w-full h-full"
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-[#193366] via-[#0F4C81] to-[#193366] relative overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-[1px] bg-blue-400/10"
                style={{ top: `${(i + 1) * 12.5}%` }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[1px] h-full bg-blue-400/10"
                style={{ left: `${(i + 1) * 12.5}%` }}
              />
            ))}
          </div>

          {/* Continents (simplified shapes) */}
          <div className="absolute inset-0">
            <div className="absolute top-[20%] left-[30%] w-[20%] h-[15%] bg-blue-400/20 rounded-full blur-sm" />
            <div className="absolute top-[40%] left-[50%] w-[25%] h-[20%] bg-blue-400/20 rounded-full blur-sm" />
            <div className="absolute top-[60%] left-[20%] w-[15%] h-[15%] bg-blue-400/20 rounded-full blur-sm" />
          </div>
        </div>
      </motion.div>

      {/* Cargo ship */}
      <motion.div
        className="absolute -bottom-[5%] left-1/2 -translate-x-1/2 w-[60%] z-10"
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1559288923-9e7d97b09915?q=80&w=1200"
          alt="Cargo Ship"
          className="w-full h-auto object-contain"
          style={{ filter: "brightness(0.8) contrast(1.2)" }}
        />
      </motion.div>
    </div>
  );
};

export default Earth3D;
