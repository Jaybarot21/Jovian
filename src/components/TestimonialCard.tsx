import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name?: string;
  role?: string;
  company?: string;
  testimonial?: string;
  rating?: number;
  avatarUrl?: string;
}

const TestimonialCard = ({
  name = "John Smith",
  role = "Procurement Manager",
  company = "Global Foods Inc.",
  testimonial = "Working with Jovian Overseas has been an exceptional experience. Their commitment to quality and timely delivery has made them our preferred partner for agricultural exports.",
  rating = 5,
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: TestimonialCardProps) => {
  return (
    <Card className="w-[400px] p-6 bg-white border-green-200 hover:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-4">
        <Avatar className="h-12 w-12 border-2 border-green-500">
          <img src={avatarUrl} alt={name} className="object-cover" />
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-green-800">{name}</h3>
          <p className="text-sm text-green-700">{role}</p>
          <p className="text-sm text-green-600">{company}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex space-x-1 mb-2">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-green-700/80">
          {testimonial}
        </p>
      </div>
    </Card>
  );
};

export default TestimonialCard;
