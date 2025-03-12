import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Download, FileText } from "lucide-react";

const categories = [
  {
    name: "Pulses",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800",
    products: ["Chickpeas", "Lentils", "Mung Beans", "Pigeon Peas"],
    description:
      "Premium quality pulses sourced from the finest growing regions of India",
  },
  {
    name: "Grains",
    image:
      "https://images.unsplash.com/photo-1530272532890-11ad2b5877e7?q=80&w=800",
    products: ["Basmati Rice", "Wheat", "Maize", "Millet"],
    description: "Exceptional grains meeting international quality standards",
  },
  {
    name: "Spices",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=800",
    products: ["Turmeric", "Cumin", "Coriander", "Red Chilli"],
    description:
      "Aromatic spices with authentic flavor profiles and rich color",
  },
  {
    name: "Oil Seeds",
    image:
      "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=800",
    products: [
      "Sesame Seeds",
      "Groundnuts",
      "Mustard Seeds",
      "Sunflower Seeds",
    ],
    description: "High oil content seeds with superior nutritional profiles",
  },
  {
    name: "Cotton",
    image:
      "https://images.unsplash.com/photo-1594113179520-2e02db38b897?q=80&w=800",
    products: ["Raw Cotton", "Cotton Yarn", "Cotton Lint", "Cotton Seed"],
    description: "Premium cotton with excellent fiber length and strength",
  },
  {
    name: "Specialty Products",
    image:
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800",
    products: ["Organic Produce", "Superfoods", "Gluten-Free", "Non-GMO"],
    description:
      "Specialty and niche agricultural products for discerning markets",
  },
];

const ProductGrid = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full overflow-hidden bg-white border-green-200 hover:border-green-500 transition-all duration-300 shadow-md hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-green-700/80 mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.products.map((product) => (
                      <span
                        key={product}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {product}
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
