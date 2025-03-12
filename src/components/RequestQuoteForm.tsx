import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Package, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { supabase } from "../lib/supabase";

interface RequestQuoteFormProps {
  productName?: string;
  productCategory?: string;
}

const RequestQuoteForm = ({
  productName = "",
  productCategory = "",
}: RequestQuoteFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    productCategory: productCategory || "",
    specificProduct: productName || "",
    quantity: "",
    timeframe: "",
    requirements: "",
    newsletter: false,
    samples: false,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Call the Supabase Edge Function
      const { error: submitError } = await supabase.functions.invoke(
        "supabase-functions-submit-contact",
        {
          body: {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: "", // Not collected in this form
            interest: formData.productCategory,
            message: `Product: ${formData.specificProduct}\nQuantity: ${formData.quantity}\nTimeframe: ${formData.timeframe}\nRequirements: ${formData.requirements}\nRequest Samples: ${formData.samples ? "Yes" : "No"}`,
          },
        },
      );

      if (submitError) throw new Error(submitError.message);

      // Success
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          country: "",
          productCategory: productCategory || "",
          specificProduct: productName || "",
          quantity: "",
          timeframe: "",
          requirements: "",
          newsletter: false,
          samples: false,
        });
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            Quote Request Received!
          </h3>
          <p className="text-green-700/80 max-w-md">
            Thank you for your interest in our products. Our team will prepare a
            detailed quotation and get back to you within 24 hours.
          </p>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <Package className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-green-800">
              Request a Quote
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
              {error}
            </div>
          )}

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company*</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="productCategory">Product Category*</Label>
                <Select
                  value={formData.productCategory}
                  onValueChange={(value) =>
                    handleSelectChange("productCategory", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pulses">Pulses</SelectItem>
                    <SelectItem value="Grains">Grains</SelectItem>
                    <SelectItem value="Spices">Spices</SelectItem>
                    <SelectItem value="Oil Seeds">Oil Seeds</SelectItem>
                    <SelectItem value="Cotton">Cotton</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specificProduct">Specific Product*</Label>
                <Input
                  id="specificProduct"
                  name="specificProduct"
                  value={formData.specificProduct}
                  onChange={handleChange}
                  placeholder="e.g., Chickpeas 8mm"
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity">Estimated Quantity*</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 20 tons"
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Delivery Timeframe*</Label>
                <Select
                  value={formData.timeframe}
                  onValueChange={(value) =>
                    handleSelectChange("timeframe", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                    <SelectItem value="Within 1 month">
                      Within 1 month
                    </SelectItem>
                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                    <SelectItem value="3-6 months">3-6 months</SelectItem>
                    <SelectItem value="6+ months">6+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Please provide any specific requirements regarding quality, packaging, certifications, etc..."
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500 min-h-[150px]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="samples"
                  name="samples"
                  checked={formData.samples}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, samples: checked }));
                  }}
                />
                <label
                  htmlFor="samples"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-700"
                >
                  I would like to request product samples
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, newsletter: checked }));
                  }}
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-700"
                >
                  Subscribe to our newsletter for product updates and market
                  insights
                </label>
              </div>
            </div>

            <div className="text-xs text-green-700/70">
              Fields marked with * are required
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Request Quote"
              )}
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

export default RequestQuoteForm;
