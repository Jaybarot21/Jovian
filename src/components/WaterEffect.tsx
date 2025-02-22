import { motion } from "framer-motion";

const WaterEffect = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated waves */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-[20vh] opacity-30"
          style={{
            background: `linear-gradient(180deg, rgba(0,40,80,0) 0%, rgba(0,40,80,${0.1 * i}) 100%)`,
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
  );
};

export default WaterEffect;
