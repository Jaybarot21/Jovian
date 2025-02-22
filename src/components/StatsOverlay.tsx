import { motion } from "framer-motion";
import { Card } from "./ui/card";

const stats = [
  { label: "Years Experience", value: "10+" },
  { label: "Countries Served", value: "25+" },
  { label: "Tons Exported", value: "1000+" },
];

const StatsOverlay = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
      <div className="flex justify-center gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="p-4 bg-slate-800/90 backdrop-blur border-slate-700">
              <p className="text-3xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-sm text-slate-300">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverlay;
