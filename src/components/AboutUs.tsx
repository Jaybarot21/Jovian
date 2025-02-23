import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Award, Globe2, Shield, TrendingUp } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: Globe2,
      title: "Global Reach",
      description:
        "Connecting Indian agriculture with markets across 25+ countries, facilitating seamless international trade relationships.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Rigorous quality control processes ensuring every product meets international standards and specifications.",
    },
    {
      icon: Award,
      title: "Industry Excellence",
      description:
        "Over a decade of expertise in agricultural exports, recognized for reliability and premium product quality.",
    },
    {
      icon: TrendingUp,
      title: "Sustainable Growth",
      description:
        "Committed to sustainable farming practices and supporting local agricultural communities.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-[#001B3B] to-slate-950 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text">
            Pioneering Agricultural Excellence
          </h2>
          <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto">
            Since our inception, Jovian Overseas has been at the forefront of
            agricultural exports, bridging the gap between Indian farmers and
            global markets with unwavering commitment to quality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 bg-slate-900/50 backdrop-blur border-white/5 hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-100/70 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "10+", label: "Years of Excellence" },
              { value: "25+", label: "Countries Served" },
              { value: "1000+", label: "Tons Exported Annually" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-lg bg-slate-900/30 backdrop-blur"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
