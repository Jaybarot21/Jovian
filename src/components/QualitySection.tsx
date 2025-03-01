import { motion } from "framer-motion";
import { Card } from "./ui/card";

const QualitySection = () => {
  const certifications = [
    {
      name: "ISO 22000:2018",
      description: "Food safety management systems certification",
      image:
        "https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?q=80&w=800",
    },
    {
      name: "HACCP Certified",
      description: "Hazard Analysis Critical Control Point certification",
      image:
        "https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?q=80&w=800",
    },
    {
      name: "Organic Certification",
      description: "International organic product certification",
      image:
        "https://images.unsplash.com/photo-1615645465208-d86c06035641?q=80&w=800",
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
            Quality Assurance
          </h2>
          <p className="text-lg md:text-xl text-green-700/80 max-w-3xl mx-auto">
            Meeting international standards with rigorous quality control
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="group overflow-hidden bg-white border-green-200 hover:border-green-500 transition-all duration-500 shadow-md hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <p className="text-green-700/70">{cert.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quality Process Steps */}
        <div className="mt-20 relative">
          <div className="absolute left-0 right-0 h-0.5 top-1/2 transform -translate-y-1/2 bg-green-500/20" />
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              "Sample Testing",
              "Quality Inspection",
              "Certification",
              "Export Ready",
            ].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-600 mx-auto mb-4 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  {step}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
