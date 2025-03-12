import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Award,
  Globe2,
  Shield,
  TrendingUp,
  Users,
  History,
  Target,
  Leaf,
  ArrowRight,
} from "lucide-react";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

const AboutUsPage = () => {
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
              Our Story
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              About Jovian Overseas
            </h1>
            <p className="text-lg text-green-700/80 max-w-3xl mx-auto">
              Connecting Indian agriculture with global markets through
              excellence and reliability
            </p>
          </div>

          {/* Company Overview Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Our Journey
              </h2>
              <p className="text-green-700/80 mb-4">
                Founded in 2014, Jovian Overseas has grown from a small trading
                company to become one of India's leading agricultural exporters.
                Our journey began with a simple mission: to showcase the finest
                Indian agricultural products to the world while supporting local
                farming communities.
              </p>
              <p className="text-green-700/80 mb-4">
                Over the past decade, we have established strong relationships
                with farmers, processors, and international buyers, creating a
                reliable supply chain that delivers premium quality products to
                markets across 25+ countries.
              </p>
              <p className="text-green-700/80">
                Today, Jovian Overseas stands as a trusted name in global
                agricultural trade, known for our commitment to quality,
                reliability, and customer satisfaction.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200"
                alt="Agricultural Fields"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
            </div>
          </div>

          {/* Mission, Vision, Values Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="mission" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="mission">Our Mission</TabsTrigger>
                  <TabsTrigger value="vision">Our Vision</TabsTrigger>
                  <TabsTrigger value="values">Our Values</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="mission">
                <Card className="p-8 border-green-200">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-12 h-12 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-4">
                        Our Mission
                      </h3>
                      <p className="text-green-700/80 mb-4">
                        To connect Indian farmers with global markets by
                        providing high-quality agricultural products that meet
                        international standards while ensuring fair practices
                        and sustainable development.
                      </p>
                      <p className="text-green-700/80">
                        We strive to be the bridge between Indian agriculture
                        and the world, creating value for farmers, customers,
                        and communities through reliable trade relationships and
                        exceptional service.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="vision">
                <Card className="p-8 border-green-200">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Globe2 className="w-12 h-12 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-4">
                        Our Vision
                      </h3>
                      <p className="text-green-700/80 mb-4">
                        To be the most trusted global partner for premium
                        agricultural exports from India, recognized for our
                        quality, reliability, and commitment to sustainable
                        practices.
                      </p>
                      <p className="text-green-700/80">
                        We envision a future where Indian agricultural products
                        are synonymous with excellence worldwide, and where our
                        business activities contribute positively to farming
                        communities, the environment, and the global food supply
                        chain.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="values">
                <Card className="p-8 border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-6 text-center">
                    Our Core Values
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      {
                        icon: Shield,
                        title: "Quality Excellence",
                        description:
                          "Unwavering commitment to the highest quality standards in every product we export.",
                      },
                      {
                        icon: Users,
                        title: "Customer Focus",
                        description:
                          "Building lasting relationships through exceptional service and understanding customer needs.",
                      },
                      {
                        icon: Leaf,
                        title: "Sustainability",
                        description:
                          "Promoting environmentally responsible practices throughout our supply chain.",
                      },
                      {
                        icon: Award,
                        title: "Integrity",
                        description:
                          "Conducting business with honesty, transparency, and ethical standards.",
                      },
                    ].map((value, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-green-50 rounded-lg"
                      >
                        <div className="mr-4 mt-1 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <value.icon className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800 mb-1">
                            {value.title}
                          </h4>
                          <p className="text-sm text-green-700/70">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Our Team Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
              Our Leadership Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Rajiv Sharma",
                  position: "Founder & CEO",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajiv&backgroundColor=4ade80",
                  description:
                    "With over 20 years of experience in agricultural trade, Rajiv founded Jovian Overseas with a vision to connect Indian farmers with global markets.",
                },
                {
                  name: "Priya Patel",
                  position: "Chief Operations Officer",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=4ade80",
                  description:
                    "Priya oversees all operational aspects of our business, ensuring efficient processes and timely delivery of products to our global customers.",
                },
                {
                  name: "Amit Verma",
                  position: "Quality Assurance Director",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=4ade80",
                  description:
                    "Amit leads our quality control team, implementing rigorous standards to ensure every product meets international specifications.",
                },
                {
                  name: "Meera Singh",
                  position: "International Sales Director",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera&backgroundColor=4ade80",
                  description:
                    "Meera manages our global sales network, developing strategic partnerships with buyers across 25+ countries.",
                },
              ].map((member, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-green-200 hover:border-green-500 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="p-6 bg-green-50 flex justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-green-800 mb-1 text-center">
                      {member.name}
                    </h3>
                    <p className="text-green-600 mb-4 text-center">
                      {member.position}
                    </p>
                    <p className="text-green-700/80 text-sm">
                      {member.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Milestones Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
              Our Journey: Key Milestones
            </h2>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 transform -translate-x-1/2"></div>

              {[
                {
                  year: "2014",
                  title: "Company Founded",
                  description:
                    "Jovian Overseas established with a focus on pulses and rice exports.",
                },
                {
                  year: "2016",
                  title: "First International Office",
                  description:
                    "Opened representative office in Dubai to serve Middle Eastern markets.",
                },
                {
                  year: "2018",
                  title: "Product Range Expansion",
                  description:
                    "Added spices, oil seeds, and cotton to our export portfolio.",
                },
                {
                  year: "2020",
                  title: "ISO 22000:2018 Certification",
                  description:
                    "Achieved international food safety management certification.",
                },
                {
                  year: "2022",
                  title: "Sustainability Initiative",
                  description:
                    "Launched program to support sustainable farming practices.",
                },
                {
                  year: "2024",
                  title: "25+ Countries Milestone",
                  description:
                    "Expanded export operations to over 25 countries worldwide.",
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative mb-12 ${index % 2 === 0 ? "pr-8 md:pr-0 md:mr-auto md:ml-0 md:text-right md:pl-8" : "pl-8 md:pl-0 md:ml-auto md:mr-0 md:text-left md:pr-8"} md:w-[calc(50%-20px)]`}
                >
                  <div
                    className={`absolute top-0 ${index % 2 === 0 ? "right-0 md:left-full" : "left-0 md:right-full"} w-8 h-8 bg-green-600 rounded-full flex items-center justify-center transform md:translate-x-[-50%] z-10`}
                  >
                    <History className="h-4 w-4 text-white" />
                  </div>
                  <Card className="p-6 border-green-200 shadow-sm">
                    <div className="text-green-600 font-bold mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-green-700/80">{milestone.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Global Presence Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
              Our Global Presence
            </h2>

            <div className="relative h-[400px] bg-amber-50 rounded-lg overflow-hidden border border-green-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=1200"
                alt="World Map"
                className="w-full h-full object-cover opacity-60"
              />
              {[
                { name: "USA", x: "20%", y: "30%", region: "North America" },
                { name: "UK", x: "45%", y: "25%", region: "Europe" },
                { name: "UAE", x: "58%", y: "40%", region: "Middle East" },
                { name: "India", x: "65%", y: "45%", region: "South Asia" },
                { name: "China", x: "75%", y: "35%", region: "East Asia" },
                { name: "Australia", x: "85%", y: "70%", region: "Oceania" },
              ].map((location, index) => (
                <div
                  key={location.name}
                  className="absolute w-4 h-4 bg-green-600 rounded-full"
                  style={{ left: location.x, top: location.y }}
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-2 rounded-lg border border-green-200 shadow-md">
                    <p className="text-sm font-medium text-green-800">
                      {location.name}
                    </p>
                    <p className="text-xs text-green-600">{location.region}</p>
                  </div>
                  <div className="absolute w-12 h-12 -inset-4 bg-green-500/20 rounded-full animate-ping" />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-green-700/80 mb-6">
                With headquarters in Mumbai, India, and representative offices
                in key markets, we serve customers across 25+ countries spanning
                North America, Europe, Middle East, Asia, and Australia.
              </p>
            </div>
          </div>

          {/* CSR Section */}
          <div className="mb-16 bg-green-50 p-8 rounded-xl border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
              Corporate Social Responsibility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Farmer Support Programs",
                  description:
                    "We provide training and resources to help farmers implement sustainable agricultural practices and improve crop yields.",
                },
                {
                  title: "Environmental Initiatives",
                  description:
                    "Our commitment to environmental stewardship includes water conservation projects and promoting organic farming methods.",
                },
                {
                  title: "Community Development",
                  description:
                    "We invest in education and healthcare initiatives in the rural communities where our farmers live and work.",
                },
              ].map((initiative, index) => (
                <Card
                  key={index}
                  className="p-6 border-green-200 bg-white h-full"
                >
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-green-700/80">{initiative.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Partner With Us
            </h2>
            <p className="text-green-700/80 mb-6 max-w-2xl mx-auto">
              Join our global network of partners and experience the quality and
              reliability that defines Jovian Overseas.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg rounded-lg">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default AboutUsPage;
