import { motion } from "framer-motion";

const Globe3D = () => {
  return (
    <div className="relative w-full h-full">
      {/* Glow effect behind globe */}
      <div className="absolute inset-0 blur-[100px] bg-blue-500/20 rounded-full" />

      {/* Shadow under globe */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[20px] blur-xl bg-blue-500/20 rounded-full" />

      {/* Globe container with gradient background */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-[#001B3B] via-[#002D5E] to-[#001B3B] flex items-center justify-center overflow-hidden"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Light reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/10 to-blue-400/20" />

        {/* Animated meridians */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-blue-400/20 rounded-full"
            style={{
              transform: `rotate(${i * 36}deg) scale(${0.8 + i * 0.05})`,
            }}
          />
        ))}

        {/* Parallels */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-blue-400/20"
            style={{
              top: `${25 + i * 25}%`,
            }}
          />
        ))}

        {/* Continents */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Stylized continent shapes */}
          <div className="absolute top-[20%] left-[30%] w-[20%] h-[15%] bg-blue-400/30 rounded-full blur-sm" />
          <div className="absolute top-[40%] left-[50%] w-[25%] h-[20%] bg-blue-400/30 rounded-full blur-sm" />
          <div className="absolute top-[60%] left-[20%] w-[15%] h-[15%] bg-blue-400/30 rounded-full blur-sm" />
        </motion.div>

        {/* Highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
};

export default Globe3D;
