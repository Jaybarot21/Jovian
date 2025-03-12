import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowRight, Download, FileText, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import ProductCard from "./ProductCard";
import RequestQuoteForm from "./RequestQuoteForm";

const categories = [
  {
    id: "pulses",
    name: "Pulses",
    products: [
      {
        name: "Chickpeas (Kabuli)",
        image:
          "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800",
        description:
          "Premium quality chickpeas with excellent cooking properties",
        specifications: "Size: 8mm, 9mm, 10mm | Moisture: 12% max",
        origin: "India",
        packaging: "25kg, 50kg bags, Bulk",
      },
      {
        name: "Red Lentils (Masoor)",
        image:
          "https://images.unsplash.com/photo-1622920389023-fd356240e1b1?q=80&w=800",
        description: "Vibrant red lentils with high protein content",
        specifications: "Purity: 99% | Split: 2% max",
        origin: "India",
        packaging: "25kg, 50kg bags",
      },
      {
        name: "Mung Beans",
        image:
          "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=800",
        description: "Green mung beans with excellent germination rate",
        specifications: "Moisture: 10% max | Foreign matter: 0.5% max",
        origin: "India",
        packaging: "25kg, 50kg bags",
      },
      {
        name: "Pigeon Peas (Toor Dal)",
        image:
          "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=800",
        description: "High-quality pigeon peas with consistent color",
        specifications: "Moisture: 12% max | Weeviled grains: 1% max",
        origin: "India",
        packaging: "25kg, 50kg bags",
      },
    ],
  },
  {
    id: "grains",
    name: "Grains",
    products: [
      {
        name: "Basmati Rice",
        image:
          "https://images.unsplash.com/photo-1626016570496-9b10c86cd975?q=80&w=800",
        description: "Premium long-grain basmati rice with exceptional aroma",
        specifications: "Length: 7.5mm+ | Moisture: 12% max",
        origin: "India",
        packaging: "5kg, 10kg, 25kg bags",
      },
      {
        name: "Wheat",
        image:
          "https://images.unsplash.com/photo-1631209121750-a9f625f98944?q=80&w=800",
        description:
          "High-protein wheat suitable for bread and pasta production",
        specifications: "Protein: 12-13% | Moisture: 12% max",
        origin: "India",
        packaging: "50kg bags, Bulk",
      },
      {
        name: "Maize (Corn)",
        image:
          "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800",
        description: "Yellow maize with high starch content",
        specifications: "Moisture: 14% max | Broken: 2% max",
        origin: "India",
        packaging: "50kg bags, Bulk",
      },
      {
        name: "Millet",
        image:
          "https://images.unsplash.com/photo-1622920389023-fd356240e1b1?q=80&w=800",
        description:
          "Nutritious millet varieties including pearl, foxtail, and finger millet",
        specifications: "Purity: 99% | Moisture: 12% max",
        origin: "India",
        packaging: "25kg, 50kg bags",
      },
    ],
  },
  {
    id: "spices",
    name: "Spices",
    products: [
      {
        name: "Turmeric",
        image:
          "https://images.unsplash.com/photo-1615485500704-8e990f9900e1?q=80&w=800",
        description: "Vibrant yellow turmeric with high curcumin content",
        specifications: "Curcumin: 3-5% | Moisture: 10% max",
        origin: "India",
        packaging: "10kg, 25kg bags",
      },
      {
        name: "Cumin Seeds",
        image:
          "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800",
        description: "Aromatic cumin seeds with intense flavor profile",
        specifications: "Essential oil: 2-5% | Purity: 99.5%",
        origin: "India",
        packaging: "10kg, 25kg bags",
      },
      {
        name: "Coriander Seeds",
        image:
          "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800",
        description: "Premium coriander seeds with excellent aroma",
        specifications: "Essential oil: 0.5-1% | Moisture: 9% max",
        origin: "India",
        packaging: "10kg, 25kg bags",
      },
      {
        name: "Red Chilli",
        image:
          "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=800",
        description: "Vibrant red chilies with varying heat levels",
        specifications: "Color: 150-200 ASTA | Moisture: 10% max",
        origin: "India",
        packaging: "10kg, 25kg bags",
      },
    ],
  },
  {
    id: "oilseeds",
    name: "Oil Seeds",
    products: [
      {
        name: "Sesame Seeds",
        image:
          "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=800",
        description:
          "Natural white and black sesame seeds with high oil content",
        specifications: "Oil content: 48-52% | Purity: 99.95%",
        origin: "India",
        packaging: "25kg bags, Bulk",
      },
      {
        name: "Groundnuts (Peanuts)",
        image:
          "https://images.unsplash.com/photo-1567204912523-924c85323be4?q=80&w=800",
        description: "Premium quality groundnuts with excellent flavor",
        specifications: "Size: 40/50, 50/60 count | Moisture: 8% max",
        origin: "India",
        packaging: "50kg bags, Bulk",
      },
      {
        name: "Mustard Seeds",
        image:
          "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=800",
        description: "Yellow and brown mustard seeds with pungent flavor",
        specifications: "Oil content: 35-40% | Purity: 99.9%",
        origin: "India",
        packaging: "25kg, 50kg bags",
      },
      {
        name: "Sunflower Seeds",
        image:
          "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=800",
        description: "High-oil content sunflower seeds for oil extraction",
        specifications: "Oil content: 40-45% | Moisture: 9% max",
        origin: "India",
        packaging: "50kg bags, Bulk",
      },
    ],
  },
  {
    id: "cotton",
    name: "Cotton",
    products: [
      {
        name: "Raw Cotton",
        image:
          "https://images.unsplash.com/photo-1594113179520-2e02db38b897?q=80&w=800",
        description:
          "Premium quality raw cotton with excellent fiber properties",
        specifications: "Staple length: 28-32mm | Micronaire: 3.5-4.9",
        origin: "India",
        packaging: "Bales (170kg)",
      },
      {
        name: "Cotton Yarn",
        image:
          "https://images.unsplash.com/photo-1594113179520-2e02db38b897?q=80&w=800",
        description: "High-quality cotton yarn in various counts",
        specifications: "Count: 20s-60s | Strength: 18-22 g/tex",
        origin: "India",
        packaging: "Cones, Cartons",
      },
      {
        name: "Cotton Lint",
        image:
          "https://images.unsplash.com/photo-1594113179520-2e02db38b897?q=80&w=800",
        description: "Clean cotton lint with minimal contamination",
        specifications: "Trash content: <1% | Moisture: 8.5% max",
        origin: "India",
        packaging: "Bales (170kg)",
      },
      {
        name: "Cotton Seed",
        image:
          "https://images.unsplash.com/photo-1594113179520-2e02db38b897?q=80&w=800",
        description:
          "High-quality cotton seeds for oil extraction and animal feed",
        specifications: "Oil content: 18-20% | Moisture: 10% max",
        origin: "India",
        packaging: "50kg bags, Bulk",
      },
    ],
  },
  {
    id: "specialty",
    name: "Specialty Products",
    products: [
      {
        name: "Organic Pulses",
        image:
          "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800",
        description: "Certified organic pulses grown without synthetic inputs",
        specifications: "Certification: USDA, EU Organic | Various varieties",
        origin: "India",
        packaging: "10kg, 25kg bags",
      },
      {
        name: "Gluten-Free Grains",
        image:
          "https://images.unsplash.com/photo-1626016570496-9b10c86cd975?q=80&w=800",
        description: "Specialty grains suitable for gluten-free diets",
        specifications: "Gluten: <5ppm | Various varieties",
        origin: "India",
        packaging: "5kg, 10kg, 25kg bags",
      },
      {
        name: "Superfoods",
        image:
          "https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=800",
        description:
          "Nutrient-dense superfoods including chia, flax, and quinoa",
        specifications: "Purity: 99.9% | Various specifications",
        origin: "India",
        packaging: "5kg, 10kg bags",
      },
      {
        name: "Non-GMO Products",
        image:
          "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800",
        description: "Verified non-GMO agricultural products",
        specifications: "Certification: Non-GMO Project | Various products",
        origin: "India",
        packaging: "Various options",
      },
    ],
  },
];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products based on search term and active category
  const filteredProducts = categories.flatMap((category) => {
    return category.products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || category.id === activeCategory;
      return matchesSearch && matchesCategory;
    });
  });

  const handleRequestQuote = (product) => {
    setSelectedProduct(product);
    setShowQuoteForm(true);
    // Scroll to quote form
    setTimeout(() => {
      document
        .getElementById("quote-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Our Products
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              Product Catalog
            </h1>
            <p className="text-lg text-green-700/80 max-w-3xl mx-auto">
              Explore our comprehensive range of premium agricultural exports
            </p>
          </div>

          {/* Search and Download Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
            <a
              href="/documents/product_catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
                <Download className="mr-2 h-5 w-5" />
                Download Full Catalog (PDF)
              </Button>
            </a>
          </div>

          {/* Category Tabs */}
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full mb-8"
          >
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.name}-${index}`}
                    product={product}
                    onRequestQuote={handleRequestQuote}
                  />
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-green-700 text-lg">
                    No products found matching your search criteria.
                  </p>
                </div>
              )}
            </TabsContent>

            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.products
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                    )
                    .map((product, index) => (
                      <ProductCard
                        key={`${product.name}-${index}`}
                        product={product}
                        onRequestQuote={handleRequestQuote}
                      />
                    ))}
                </div>
                {category.products.filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()),
                ).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-green-700 text-lg">
                      No products found matching your search criteria.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {/* Quote Request Form */}
          {showQuoteForm && (
            <div id="quote-form" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
                Request a Quote for {selectedProduct?.name}
              </h2>
              <RequestQuoteForm
                productName={selectedProduct?.name}
                productCategory={
                  categories.find((category) =>
                    category.products.some(
                      (product) => product.name === selectedProduct?.name,
                    ),
                  )?.name
                }
              />
            </div>
          )}

          {/* Certifications Section */}
          <div className="mt-16 bg-green-50 p-8 rounded-xl border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
              Quality Certifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "ISO 22000:2018",
                "HACCP Certified",
                "Organic Certification",
                "GMP Certified",
              ].map((cert, index) => (
                <Card
                  key={index}
                  className="p-4 text-center border-green-200 hover:border-green-500 transition-all duration-300"
                >
                  <p className="font-medium text-green-800">{cert}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Order Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Need Custom Specifications?
            </h2>
            <p className="text-green-700/80 mb-6 max-w-2xl mx-auto">
              We can accommodate custom orders with specific requirements.
              Contact our team to discuss your needs.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg rounded-lg"
              onClick={() => {
                setSelectedProduct({ name: "Custom Order" });
                setShowQuoteForm(true);
                setTimeout(() => {
                  document.getElementById("quote-form")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
            >
              Request Custom Quote
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default ProductCatalog;
