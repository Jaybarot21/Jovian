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
  const slideIntervalRef = useRef(null);

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

    // Set a shorter timeout to allow for faster transitions
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [getItemsPerView, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const itemsPerPage = getItemsPerView();
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? products.length - itemsPerPage : prev - 1,
    );

    // Set a shorter timeout to allow for faster transitions
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [getItemsPerView, isTransitioning]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Reset current index when screen size changes to avoid empty slides
      setCurrentIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide functionality with improved timing
  useEffect(() => {
    const startAutoSlide = () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }

      slideIntervalRef.current = setInterval(() => {
        if (!isTransitioning && autoPlay) {
          nextSlide();
        }
      }, 3000);
    };

    startAutoSlide();

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [autoPlay, nextSlide, isTransitioning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
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

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">
            Our Premium Products
          </h2>
          <p className="text-lg md:text-xl text-green-700/80 max-w-3xl mx-auto">
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
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border-green-200 hover:bg-green-50 text-green-700 hidden md:flex"
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="overflow-hidden rounded-xl">
            <div
              className="flex gap-4 transition-all duration-300 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / getItemsPerView())}%)`,
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.name}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-0 sm:px-1"
                >
                  <Card className="group h-full overflow-hidden bg-white border-green-200 hover:border-green-500 transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-5px]">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 bg-white">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-green-800 group-hover:text-green-600 transition-colors duration-300 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-green-700/80 mb-2 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-xs md:text-sm text-green-600 font-medium">
                        {product.specifications}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border-green-200 hover:bg-green-50 text-green-700 hidden md:flex"
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
              className="bg-white border-green-200 hover:bg-green-50 text-green-700"
              onClick={prevSlide}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white border-green-200 hover:bg-green-50 text-green-700"
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
                className={`w-2 h-2 rounded-full transition-colors ${index === Math.floor(currentIndex / getItemsPerView()) ? "bg-green-600" : "bg-green-200"}`}
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
