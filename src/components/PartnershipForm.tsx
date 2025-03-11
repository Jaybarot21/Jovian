import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Handshake, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PartnershipForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    partnershipType: "",
    businessType: "",
    annualRevenue: "",
    message: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Partnership inquiry submitted:", formData);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        title: "",
        companyName: "",
        email: "",
        phone: "",
        country: "",
        partnershipType: "",
        businessType: "",
        annualRevenue: "",
        message: "",
        agreeTerms: false,
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
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Partnership Request Received!
          </h3>
          <p className="text-green-700/80 max-w-md">
            Thank you for your interest in partnering with Jovian Overseas. Our
            business development team will review your information and contact
            you to discuss potential collaboration opportunities.
          </p>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <Handshake className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-green-800">
              Partnership Inquiry
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title*</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name*</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone*</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country">Country*</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnershipType">Partnership Type*</Label>
                <Select
                  value={formData.partnershipType}
                  onValueChange={(value) =>
                    handleSelectChange("partnershipType", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder="Select partnership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Distributor">Distributor</SelectItem>
                    <SelectItem value="Retailer">Retailer</SelectItem>
                    <SelectItem value="Wholesaler">Wholesaler</SelectItem>
                    <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="Agent">Agent/Representative</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type*</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) =>
                    handleSelectChange("businessType", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food Processing">
                      Food Processing
                    </SelectItem>
                    <SelectItem value="Retail Chain">Retail Chain</SelectItem>
                    <SelectItem value="Trading Company">
                      Trading Company
                    </SelectItem>
                    <SelectItem value="Supermarket">Supermarket</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualRevenue">Annual Revenue*</Label>
                <Select
                  value={formData.annualRevenue}
                  onValueChange={(value) =>
                    handleSelectChange("annualRevenue", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder="Select annual revenue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Less than $1M">Less than $1M</SelectItem>
                    <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                    <SelectItem value="$5M - $20M">$5M - $20M</SelectItem>
                    <SelectItem value="$20M - $50M">$20M - $50M</SelectItem>
                    <SelectItem value="$50M - $100M">$50M - $100M</SelectItem>
                    <SelectItem value="$100M+">$100M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Partnership Objectives*</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your business, target markets, and what you hope to achieve through this partnership..."
                required
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500 min-h-[150px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => {
                  setFormData((prev) => ({ ...prev, agreeTerms: checked }));
                }}
                required
              />
              <label
                htmlFor="agreeTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-700"
              >
                I agree to the processing of my data for partnership evaluation
                purposes*
              </label>
            </div>

            <div className="text-xs text-green-700/70">
              Fields marked with * are required
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl"
            >
              Submit Partnership Request
            </Button>

            <p className="text-xs text-center text-green-700/60">
              By submitting this form, you agree to our privacy policy and terms
              of service. We will process your personal data in accordance with
              our privacy policy.
            </p>
          </form>
        </>
      )}
    </Card>
  );
};

export default PartnershipForm;
