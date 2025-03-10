import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Ship, Plane, Truck, BarChart3, Clock, Shield } from "lucide-react";

const LogisticsSection = () => {
  const features = [
    {
      icon: Ship,
      title: "Sea Freight",
      description:
        "Efficient ocean freight solutions with competitive rates and reliable schedules.",
    },
    {
      icon: Plane,
      title: "Air Freight",
      description:
        "Express delivery options for time-sensitive agricultural exports.",
    },
    {
      icon: Truck,
      title: "Inland Transport",
      description:
        "Seamless first-mile and last-mile delivery across India and destination countries.",
    },
    {
      icon: BarChart3,
      title: "Real-time Tracking",
      description:
        "Advanced tracking systems for complete visibility of your shipments.",
    },
    {
      icon: Clock,
      title: "Just-in-Time",
      description:
        "Optimized logistics planning to meet your delivery schedules.",
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description:
        "Comprehensive coverage for your valuable agricultural exports.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">
            Global Logistics Excellence
          </h2>
          <p className="text-lg md:text-xl text-green-700/80 max-w-3xl mx-auto">
            End-to-end logistics solutions for your agricultural exports
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full p-6 bg-white border-green-200 hover:border-green-500 transition-all duration-300 shadow-md hover:shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-green-700/80 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogisticsSection;
