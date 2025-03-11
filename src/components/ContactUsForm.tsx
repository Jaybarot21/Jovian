import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Send, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ContactUsForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      interest: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        interest: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <Card className="p-6 md:p-8 bg-white border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-700/80 max-w-md">
            Your message has been received. Our team will get back to you
            shortly.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Your Name*
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Your Email*
              </label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="john@company.com"
                required
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Company
              </label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Phone
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-green-700">
              Interested In*
            </label>
            <Select
              value={formData.interest}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                <SelectValue placeholder="Select product category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pulses">Pulses</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="spices">Spices</SelectItem>
                <SelectItem value="oilseeds">Oil Seeds</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="other">Other Products</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-green-700">
              Message*
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please provide details about your requirements..."
              required
              className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500 min-h-[150px]"
            />
          </div>

          <div className="text-xs text-green-700/70">
            Fields marked with * are required
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Inquiry
          </Button>

          <p className="text-xs text-center text-green-700/60">
            By submitting this form, you agree to our privacy policy and terms
            of service.
          </p>
        </form>
      )}
    </Card>
  );
};

export default ContactUsForm;
