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
    <section id="partners" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-green-800">
            Global Presence
          </h2>
          <p className="text-lg text-green-700/80">
            Trusted by partners worldwide
          </p>
        </motion.div>

        <div className="relative h-[500px] bg-amber-50 rounded-lg overflow-hidden border border-green-200 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=1200"
            alt="World Map"
            className="w-full h-full object-cover opacity-60"
          />
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="absolute w-4 h-4 bg-green-600 rounded-full"
              style={{ left: partner.x, top: partner.y }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-2 rounded-lg border border-green-200 shadow-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.2 }}
              >
                <p className="text-sm font-medium text-green-800">
                  {partner.name}
                </p>
                <p className="text-xs text-green-600">{partner.region}</p>
              </motion.div>
              <motion.div
                className="absolute w-12 h-12 -inset-4 bg-green-500/20 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {partners.map((partner, index) => {
              // Connect to India (which is at index 3)
              if (index !== 3) {
                const startX = parseFloat(partners[3].x);
                const startY = parseFloat(partners[3].y);
                const endX = parseFloat(partner.x);
                const endY = parseFloat(partner.y);

                return (
                  <motion.path
                    key={`line-${index}`}
                    d={`M ${startX}% ${startY}% Q ${(startX + endX) / 2}% ${Math.min(startY, endY) - 10}%, ${endX}% ${endY}%`}
                    stroke="rgba(74, 222, 128, 0.4)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* India highlight */}
          <motion.div
            className="absolute w-6 h-6 bg-green-600 rounded-full"
            style={{
              left: partners[3].x,
              top: partners[3].y,
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersMap;
