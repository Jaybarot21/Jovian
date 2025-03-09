import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  FileText,
  Download,
  CheckCircle2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ContactForm = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-amber-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #65a30d 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Let's Connect
            </div>
            <h2 className="text-4xl font-bold mb-4 text-green-800">
              Get in Touch
            </h2>
            <p className="text-xl text-green-700/80">
              Let's discuss how we can help your business grow
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8 bg-white border-green-200 hover:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-semibold text-green-800 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      text: "123 Business Avenue, Mumbai, India",
                    },
                    { icon: Phone, text: "+91 123 456 7890" },
                    { icon: Mail, text: "contact@jovianoverseas.com" },
                    { icon: Clock, text: "Mon-Fri: 9:00 AM - 6:00 PM IST" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-green-700" />
                      </div>
                      <p className="text-green-700">{item.text}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-green-100">
                  <h4 className="font-medium text-green-800 mb-4">Resources</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50 justify-start"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Company Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50 justify-start"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Product Catalog
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Certifications */}
              <Card className="p-6 bg-white border-green-200 shadow-md">
                <h4 className="font-medium text-green-800 mb-4">
                  Our Certifications
                </h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    "ISO 22000:2018",
                    "HACCP Certified",
                    "Organic Certification",
                    "GMP Certified",
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-white border-green-200 hover:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      Your Name*
                    </label>
                    <Input
                      placeholder="John Doe"
                      className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      Your Email*
                    </label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      Company
                    </label>
                    <Input
                      placeholder="Your Company"
                      className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      Phone
                    </label>
                    <Input
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
                  <Select>
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
                    placeholder="Please provide details about your requirements..."
                    className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500 min-h-[150px]"
                  />
                </div>

                <div className="text-xs text-green-700/70">
                  Fields marked with * are required
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl">
                  <Send className="w-5 h-5 mr-2" />
                  Send Inquiry
                </Button>

                <p className="text-xs text-center text-green-700/60">
                  By submitting this form, you agree to our privacy policy and
                  terms of service.
                </p>
              </form>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
