import { motion } from "framer-motion";

const partners = [
  { name: "USA", x: "20%", y: "30%", region: "North America" },
  { name: "UK", x: "45%", y: "25%", region: "Europe" },
  { name: "UAE", x: "58%", y: "40%", region: "Middle East" },
  { name: "India", x: "65%", y: "45%", region: "South Asia" },
  { name: "China", x: "75%", y: "35%", region: "East Asia" },
  { name: "Australia", x: "85%", y: "70%", region: "Oceania" },
];

const PartnersMap = () => {
  return (
    <section id="partners" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Global Presence
          </h2>
          <p className="text-lg text-slate-300">
            Trusted by partners worldwide
          </p>
        </motion.div>

        <div className="relative h-[500px] bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
          <img
            src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=1200"
            alt="World Map"
            className="w-full h-full object-cover opacity-30"
          />
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="absolute w-4 h-4 bg-blue-500 rounded-full"
              style={{ left: partner.x, top: partner.y }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.2 }}
              >
                <p className="text-sm font-medium">{partner.name}</p>
                <p className="text-xs text-slate-400">{partner.region}</p>
              </motion.div>
              <motion.div
                className="absolute w-12 h-12 -inset-4 bg-blue-500/20 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMap;
