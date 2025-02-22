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
      className="py-20 bg-gradient-to-b from-[#001B3B] to-slate-950 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
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
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text">
              Get in Touch
            </h2>
            <p className="text-xl text-blue-100/80">
              Let's discuss how we can help your business grow
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8 bg-slate-900/50 backdrop-blur border-white/10 hover:border-blue-500/50 transition-all duration-300">
                <h3 className="text-2xl font-semibold text-white mb-6">
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
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <p className="text-slate-300">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-slate-900/50 backdrop-blur border-white/10 hover:border-blue-500/50 transition-all duration-300">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Your Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Subject
                  </label>
                  <Input
                    placeholder="How can we help?"
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message..."
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 min-h-[150px]"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl">
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
