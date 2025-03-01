import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

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
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-white border-green-200 hover:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      Your Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">
                    Subject
                  </label>
                  <Input
                    placeholder="How can we help?"
                    className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message..."
                    className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500 min-h-[150px]"
                  />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
