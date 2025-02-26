import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const products = [
  {
    name: "Premium Chickpeas",
    image:
      "https://images.unsplash.com/photo-1632731354898-c3c8b796e41b?q=80&w=1200",
    description: "Superior quality chickpeas with exceptional protein content",
    specifications: "8mm, 9mm, 10mm sizes available",
    details: [
      "Protein Content: 20-22%",
      "Moisture: <10%",
      "Foreign Matter: <0.5%",
      "Origin: Premium Indian Farms",
    ],
  },
  {
    name: "Exotic Rice Varieties",
    image:
      "https://images.unsplash.com/photo-1626016570496-9b10c86cd975?q=80&w=1200",
    description: "Finest basmati and specialty rice varieties",
    specifications: "Premium Long & Medium grain",
    details: [
      "Length: >7mm",
      "Aroma: Premium Grade",
      "Aging: 2 Years",
      "Variety: Pure Basmati",
    ],
  },
  {
    name: "Premium Wheat",
    image:
      "https://images.unsplash.com/photo-1631209121750-a9f625f98944?q=80&w=1200",
    description: "High-grade wheat for premium flour production",
    specifications: "Protein content: 12-13%",
    details: [
      "Gluten: 28-30%",
      "Moisture: <12%",
      "Test Weight: 78-80 kg/hl",
      "Grade: Premium A",
    ],
  },
  {
    name: "Selected Groundnuts",
    image:
      "https://images.unsplash.com/photo-1567204912523-924c85323be4?q=80&w=1200",
    description: "Hand-picked, premium grade groundnuts",
    specifications: "Bold 40/50, Java 45/50",
    details: [
      "Oil Content: 48-50%",
      "Moisture: <6%",
      "Split: <1%",
      "Aflatoxin: Nil",
    ],
  },
  {
    name: "Golden Sesame Seeds",
    image:
      "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=1200",
    description: "Pure, natural sesame seeds",
    specifications: "99.95% purity, 45-50% oil content",
    details: [
      "Oil Content: 48-52%",
      "Moisture: <5%",
      "Purity: 99.95%",
      "Color: Natural White",
    ],
  },
  {
    name: "Premium Red Chilli",
    image:
      "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=1200",
    description: "Vibrant, aromatic red chillis",
    specifications: "S4, S5, S6 grades available",
    details: [
      "Color: Deep Red",
      "Moisture: <10%",
      "Heat Units: 30-35k SHU",
      "Grade: Premium Export",
    ],
  },
];

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const itemsPerView = {
    sm: 1,
    md: 2,
    lg: 3,
  };

  const getItemsPerView = () => {
    if (typeof window === "undefined") return itemsPerView.lg;
    if (window.innerWidth < 768) return itemsPerView.sm;
    if (window.innerWidth < 1024) return itemsPerView.md;
    return itemsPerView.lg;
  };

  const nextSlide = () => {
    const itemsPerPage = getItemsPerView();
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= products.length ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    const itemsPerPage = getItemsPerView();
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? products.length - itemsPerPage : prev - 1,
    );
  };

  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-b from-dark-800 to-dark-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,195,0,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gold-DEFAULT via-white to-gold-DEFAULT text-transparent bg-clip-text">
            Our Premium Products
          </h2>
          <p className="text-lg md:text-xl text-gold-light/90 max-w-3xl mx-auto">
            Discover our curated selection of premium agricultural exports
          </p>
        </motion.div>

        <div className="relative px-4">
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-dark-800/80 border-gold-DEFAULT/20 hover:border-gold-DEFAULT/40 hover:bg-dark-800 text-white hidden md:flex"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="overflow-hidden rounded-xl">
            <motion.div
              className="flex gap-6 transition-all duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / getItemsPerView())}%)`,
              }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Card className="group h-full overflow-hidden bg-dark-800/80 backdrop-blur border-gold-DEFAULT/20 hover:border-gold-DEFAULT/40 transition-all duration-500 shadow-lg hover:shadow-gold-DEFAULT/20 relative">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${hoveredIndex === index ? "scale-110 blur-sm" : ""}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                    </div>
                    <div className="p-6 md:p-8 backdrop-blur-sm bg-dark-800/50 relative z-10">
                      <h3 className="text-xl md:text-2xl font-semibold mb-3 bg-gradient-to-r from-gold-DEFAULT via-white to-gold-DEFAULT text-transparent bg-clip-text">
                        {product.name}
                      </h3>
                      <p className="text-gold-light/80 mb-4 leading-relaxed text-sm md:text-base">
                        {product.description}
                      </p>
                      <p className="text-xs md:text-sm text-gold-DEFAULT font-medium">
                        {product.specifications}
                      </p>

                      {/* Product Details Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-dark-900/95 p-6 transition-all duration-300 flex flex-col justify-center ${hoveredIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        initial={false}
                        animate={{
                          y: hoveredIndex === index ? 0 : 20,
                          scale: hoveredIndex === index ? 1 : 0.95,
                        }}
                      >
                        <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gold-DEFAULT via-white to-gold-DEFAULT text-transparent bg-clip-text">
                          Product Specifications
                        </h4>
                        <ul className="space-y-2">
                          {product.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-white-muted flex items-center space-x-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-DEFAULT/60" />
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-dark-800/80 border-gold-DEFAULT/20 hover:border-gold-DEFAULT/40 hover:bg-dark-800 text-white hidden md:flex"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-8 gap-2">
            {Array.from({
              length: Math.ceil(products.length / getItemsPerView()),
            }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === Math.floor(currentIndex / getItemsPerView()) ? "bg-gold-DEFAULT" : "bg-gold-DEFAULT/20"}`}
                onClick={() => setCurrentIndex(index * getItemsPerView())}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
