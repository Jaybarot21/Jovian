import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: {
    name: string;
    image: string;
    description: string;
    specifications: string;
    origin: string;
    packaging: string;
  };
  onRequestQuote: (product: any) => void;
}

const ProductCard = ({ product, onRequestQuote }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden border-green-200 hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          {product.name}
        </h3>
        <p className="text-green-700/80 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <span className="text-sm font-medium text-green-800 w-24">
              Specs:
            </span>
            <span className="text-sm text-green-700/80">
              {product.specifications}
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-sm font-medium text-green-800 w-24">
              Origin:
            </span>
            <span className="text-sm text-green-700/80">{product.origin}</span>
          </div>
          <div className="flex items-start">
            <span className="text-sm font-medium text-green-800 w-24">
              Packaging:
            </span>
            <span className="text-sm text-green-700/80">
              {product.packaging}
            </span>
          </div>
        </div>

        <Button
          className="mt-auto w-full bg-green-600 text-white hover:bg-green-700"
          onClick={() => onRequestQuote(product)}
        >
          Request Quote
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
