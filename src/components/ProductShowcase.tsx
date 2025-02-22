import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const products = {
  grains: [
    {
      name: "Premium Chickpeas",
      image:
        "https://images.unsplash.com/photo-1632731354898-c3c8b796e41b?q=80&w=1200",
      description:
        "Superior quality chickpeas with exceptional protein content",
      specifications: "8mm, 9mm, 10mm sizes available",
    },
    {
      name: "Exotic Rice Varieties",
      image:
        "https://images.unsplash.com/photo-1626016570496-9b10c86cd975?q=80&w=1200",
      description: "Finest basmati and specialty rice varieties",
      specifications: "Premium Long & Medium grain",
    },
    {
      name: "Premium Wheat",
      image:
        "https://images.unsplash.com/photo-1631209121750-a9f625f98944?q=80&w=1200",
      description: "High-grade wheat for premium flour production",
      specifications: "Protein content: 12-13%",
    },
  ],
  oilSeeds: [
    {
      name: "Selected Groundnuts",
      image:
        "https://images.unsplash.com/photo-1567204912523-924c85323be4?q=80&w=1200",
      description: "Hand-picked, premium grade groundnuts",
      specifications: "Bold 40/50, Java 45/50",
    },
    {
      name: "Golden Sesame Seeds",
      image:
        "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=1200",
      description: "Pure, natural sesame seeds",
      specifications: "99.95% purity, 45-50% oil content",
    },
    {
      name: "Premium Sunflower Seeds",
      image:
        "https://images.unsplash.com/photo-1599077932214-6b3d769b98fe?q=80&w=1200",
      description: "High-oil content sunflower seeds",
      specifications: "Oil content: 40-45%",
    },
  ],
  spices: [
    {
      name: "Premium Red Chilli",
      image:
        "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=1200",
      description: "Vibrant, aromatic red chillis",
      specifications: "S4, S5, S6 grades available",
    },
    {
      name: "Fragrant Coriander",
      image:
        "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=1200",
      description: "Fresh, aromatic coriander seeds",
      specifications: "Eagle quality, Machine cleaned",
    },
    {
      name: "Black Pepper",
      image:
        "https://images.unsplash.com/photo-1599909533294-7b69889f6f0b?q=80&w=1200",
      description: "Premium black pepper",
      specifications: "500g/l density, 4.5% volatile oil",
    },
  ],
};

const ProductCategory = ({ title, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="mb-20 last:mb-0">
      <h3 className="text-3xl font-bold mb-8 text-blue-300 capitalize">
        {title}
      </h3>

      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900/80 border-white/10 hover:bg-slate-800 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((product, index) => (
              <motion.div
                key={product.name}
                className="w-full flex-shrink-0 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden bg-slate-900/50 border-white/5 hover:border-blue-500/50 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                  </div>
                  <div className="p-8 backdrop-blur-sm bg-slate-900/50">
                    <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-blue-100/80 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-sm text-blue-400 font-medium">
                      {product.specifications}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900/80 border-white/10 hover:bg-slate-800 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="flex justify-center mt-6 gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-blue-500" : "bg-slate-600"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-b from-slate-950 to-[#001B3B]"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text">
            Our Premium Products
          </h2>
          <p className="text-xl text-blue-100/80">
            Discover our curated selection of premium agricultural exports
          </p>
        </motion.div>

        {Object.entries(products).map(([category, items]) => (
          <ProductCategory key={category} title={category} items={items} />
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
