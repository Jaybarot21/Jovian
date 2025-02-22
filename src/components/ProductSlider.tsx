import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Product {
  name: string;
  image: string;
  description: string;
  specifications: string;
}

interface ProductSliderProps {
  products: Product[];
  title: string;
}

const ProductSlider = ({ products, title }: ProductSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative py-12">
      <h3 className="text-3xl font-bold mb-8 text-blue-300 capitalize">
        {title}
      </h3>

      <div className="relative overflow-hidden">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 z-10 bg-slate-900/80 border-white/10 hover:bg-slate-800 text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                className="w-full flex-shrink-0 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden bg-slate-900/50 border-white/5 hover:border-blue-500/50 transition-all duration-500">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
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

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 z-10 bg-slate-900/80 border-white/10 hover:bg-slate-800 text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-blue-500" : "bg-slate-600"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
