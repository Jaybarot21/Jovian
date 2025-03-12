import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";

interface NewsCardProps {
  article: {
    title: string;
    category: string;
    date: string;
    author: string;
    image: string;
    summary: string;
    tags: string[];
  };
  index: number;
}

const NewsCard = ({ article, index }: NewsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden border-green-200 hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              {article.category}
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-green-800 mb-3 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-green-700/80 mb-4 line-clamp-3 flex-grow">
            {article.summary}
          </p>
          <div className="flex items-center text-green-600 text-sm mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{article.date}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, i) => (
              <div key={i} className="flex items-center text-xs text-green-600">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </div>
            ))}
          </div>
          <Button
            variant="link"
            className="p-0 text-green-600 hover:text-green-700 self-start"
          >
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
