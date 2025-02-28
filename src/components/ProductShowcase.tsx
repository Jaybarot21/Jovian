import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "./ui/button";

const products = [
  {
    name: "Premium Chickpeas",
    image:
      "https://images.unsplash.com/photo-1632731354898-c3c8b796e41b?q=80&w=1200",
    description: "Superior quality chickpeas with exceptional protein content",
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
    name: "Premium Red Chilli",
    image:
      "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=1200",
    description: "Vibrant, aromatic red chillis",
    specifications: "S4, S5, S6 grades available",
  },
];

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayTimeoutRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const itemsPerView = {
    sm: 1,
    md: 2,
    lg: 3,
  };

  const getItemsPerView = useCallback(() => {
    if (windowWidth < 768) return itemsPerView.sm;
    if (windowWidth < 1024) return itemsPerView.md;
    return itemsPerView.lg;
  }, [windowWidth]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const itemsPerPage = getItemsPerView();
    setCurrentIndex((prev) =>
      prev + 1 >= products.length - itemsPerPage + 1 ? 0 : prev + 1,
    );

    // Clear any existing transition timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Set a timeout to allow the transition to complete
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Slightly longer than the CSS transition duration
  }, [getItemsPerView, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const itemsPerPage = getItemsPerView();
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? products.length - itemsPerPage : prev - 1,
    );

    // Clear any existing transition timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Set a timeout to allow the transition to complete
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Slightly longer than the CSS transition duration
  }, [getItemsPerView, isTransitioning]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide functionality with improved timing
  useEffect(() => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    if (autoPlay && !isTransitioning) {
      autoPlayTimeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [autoPlay, nextSlide, isTransitioning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Pause auto-slide on hover
  const handleMouseEnter = () => setAutoPlay(false);
  const handleMouseLeave = () => setAutoPlay(true);

  // Jump to a specific slide
  const jumpToSlide = (index) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(index * getItemsPerView());

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text">
            Our Premium Products
          </h2>
          <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto">
            Discover our curated selection of premium agricultural exports
          </p>
        </motion.div>

        <div
          className="relative px-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900/80 border-white/10 hover:bg-slate-800 text-white hidden md:flex"
            onClick={prevSlide}
            disabled={isTransitioning}
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
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-0 sm:px-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group h-full overflow-hidden bg-slate-900/50 border-white/5 hover:border-blue-500/50 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 hover:translate-y-[-5px]">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 backdrop-blur-sm bg-slate-900/50">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-blue-300 transition-colors duration-300 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-blue-100/80 mb-2 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-xs md:text-sm text-blue-400 font-medium">
                        {product.specifications}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900/80 border-white/10 hover:bg-slate-800 text-white hidden md:flex"
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Mobile navigation buttons */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="bg-slate-900/80 border-white/10 hover:bg-slate-800 text-white"
              onClick={prevSlide}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-slate-900/80 border-white/10 hover:bg-slate-800 text-white"
              onClick={nextSlide}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {Array.from({
              length: Math.ceil(products.length / getItemsPerView()),
            }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === Math.floor(currentIndex / getItemsPerView()) ? "bg-blue-500" : "bg-slate-600"}`}
                onClick={() => jumpToSlide(index)}
                disabled={isTransitioning}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
