import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Building, CheckCircle2, Users } from "lucide-react";

const partners = [
  { name: "USA", x: "20%", y: "30%", region: "North America", flag: "🇺🇸" },
  { name: "UK", x: "45%", y: "25%", region: "Europe", flag: "🇬🇧" },
  { name: "UAE", x: "58%", y: "40%", region: "Middle East", flag: "🇦🇪" },
  { name: "India", x: "65%", y: "45%", region: "South Asia", flag: "🇮🇳" },
  { name: "China", x: "75%", y: "35%", region: "East Asia", flag: "🇨🇳" },
  { name: "Australia", x: "85%", y: "70%", region: "Oceania", flag: "🇦🇺" },
];

const clients = [
  {
    name: "Global Foods Inc.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GF&backgroundColor=4ade80",
  },
  {
    name: "Eastern Imports Ltd.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=EI&backgroundColor=4ade80",
  },
  {
    name: "Pacific Trade Co.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=PT&backgroundColor=4ade80",
  },
  {
    name: "European Distributors",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=ED&backgroundColor=4ade80",
  },
  {
    name: "American Wholesalers",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AW&backgroundColor=4ade80",
  },
  {
    name: "Asian Markets Group",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AM&backgroundColor=4ade80",
  },
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
          <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
            International Network
          </div>
          <h2 className="text-4xl font-bold mb-4 text-green-800">
            Our Global Presence
          </h2>
          <p className="text-lg text-green-700/80 max-w-3xl mx-auto">
            Connecting agricultural excellence with markets worldwide
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
                <p className="text-sm font-medium text-green-800 flex items-center">
                  <span className="mr-1">{partner.flag}</span> {partner.name}
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

        {/* Key clients section */}
        <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Our Valued Clients
                </h3>
                <p className="text-green-700/80 mb-6">
                  We're proud to partner with leading food manufacturers,
                  distributors, and retailers worldwide who trust us for
                  consistent quality and reliable service.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {clients.map((client, index) => (
                    <motion.div
                      key={client.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center text-center"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-12 h-12 rounded-full mb-2"
                      />
                      <p className="text-xs text-green-700 font-medium">
                        {client.name}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="mt-8 border-green-600 text-green-700 hover:bg-green-50"
                >
                  View All Partners
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div>
              <Card className="p-6 border-green-200 bg-green-50/50">
                <h3 className="text-2xl font-bold text-green-800 mb-6">
                  Why Partner With Us
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      icon: Building,
                      title: "Established Reputation",
                      text: "10+ years of excellence in agricultural exports",
                    },
                    {
                      icon: CheckCircle2,
                      title: "Quality Assurance",
                      text: "Rigorous testing and international certifications",
                    },
                    {
                      icon: Users,
                      title: "Dedicated Support",
                      text: "Personalized service and relationship management",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mt-1 mr-4 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">
                          {item.title}
                        </h4>
                        <p className="text-sm text-green-700/70">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium">
                    "Jovian Overseas has been our trusted supplier for over 5
                    years. Their commitment to quality and reliability sets them
                    apart."
                  </p>
                  <div className="mt-4 flex items-center">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                      alt="John Smith"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-green-800">John Smith</p>
                      <p className="text-xs text-green-600">
                        Procurement Director, Global Foods Inc.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersMap;
