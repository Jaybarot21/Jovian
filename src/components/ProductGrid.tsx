import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Download, FileText } from "lucide-react";
import { useSupabaseRealtime } from "../hooks/useSupabaseRealtime";

const ProductGrid = () => {
  const { data: products, loading } = useSupabaseRealtime("products");
  const [filter, setFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(
        filter === "All"
          ? products
          : products.filter((product) => product.category === filter),
      );
    }
  }, [products, filter]);

  const categories = [
    "All",
    "Pulses",
    "Grains",
    "Spices",
    "Oil Seeds",
    "Cotton",
  ];

  if (loading) {
    return (
      <section id="product-categories" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-700">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="product-categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
            Extensive Product Range
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">
            Product Categories
          </h2>
          <p className="text-lg md:text-xl text-green-700/80 max-w-3xl mx-auto">
            Explore our comprehensive range of premium agricultural exports
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              className={`${filter === category ? "bg-green-600 hover:bg-green-700" : "text-green-700 hover:bg-green-50"}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full overflow-hidden bg-white border-green-200 hover:border-green-500 transition-all duration-300 shadow-md hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {product.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-green-700/80 mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.specifications &&
                      product.specifications.split(",").map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {spec.trim()}
                        </span>
                      ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="link"
                      className="p-0 text-green-600 hover:text-green-700 font-medium flex items-center"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Specs
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-green-700">
              No products found in this category. Please check back later.
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg rounded-lg group">
            <Download className="mr-2 h-5 w-5" />
            Download Complete Product Catalog
          </Button>
          <p className="mt-4 text-sm text-green-700/60">
            Detailed specifications, grades, and packaging options available
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
