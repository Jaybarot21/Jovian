import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Clock,
  GraduationCap,
  Users,
  Building,
  Globe,
} from "lucide-react";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import CareerForm from "./CareerForm";
import { useState } from "react";
import { useTranslation } from "../lib/translations";
import JobCard from "./JobCard";

const jobOpenings = [
  {
    title: "International Sales Manager",
    department: "Sales",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Lead our international sales efforts for agricultural exports across key global markets.",
    responsibilities: [
      "Develop and execute sales strategies for international markets",
      "Build and maintain relationships with key global clients",
      "Negotiate contracts and ensure timely delivery of products",
      "Analyze market trends and identify new business opportunities",
      "Collaborate with logistics and quality teams to ensure customer satisfaction",
    ],
    requirements: [
      "Bachelor's degree in Business, Agriculture, or related field",
      "5+ years experience in international agricultural trade",
      "Strong negotiation and relationship management skills",
      "Excellent communication skills in English (additional languages preferred)",
      "Willingness to travel internationally up to 30% of the time",
    ],
  },
  {
    title: "Quality Assurance Specialist",
    department: "Quality Control",
    location: "Gujarat, India",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Ensure all agricultural products meet international quality standards and specifications.",
    responsibilities: [
      "Conduct quality inspections of agricultural products",
      "Implement and maintain quality management systems",
      "Prepare detailed quality reports and documentation",
      "Coordinate with suppliers to address quality issues",
      "Stay updated on international food safety regulations",
    ],
    requirements: [
      "Bachelor's degree in Food Science, Agriculture, or related field",
      "3+ years experience in food quality assurance",
      "Knowledge of HACCP, ISO 22000, and other quality standards",
      "Strong analytical and problem-solving skills",
      "Experience with quality control documentation and reporting",
    ],
  },
  {
    title: "Logistics Coordinator",
    department: "Supply Chain",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Coordinate international shipping and logistics for agricultural exports worldwide.",
    responsibilities: [
      "Arrange international shipments via sea and air freight",
      "Prepare and review shipping documentation",
      "Track shipments and resolve any logistics issues",
      "Coordinate with customs brokers and freight forwarders",
      "Optimize shipping routes and costs",
    ],
    requirements: [
      "Bachelor's degree in Supply Chain, Logistics, or related field",
      "2+ years experience in international logistics",
      "Knowledge of international shipping terms and documentation",
      "Experience with logistics software and tracking systems",
      "Strong organizational and multitasking abilities",
    ],
  },
  {
    title: "Agricultural Procurement Specialist",
    department: "Procurement",
    location: "Punjab, India",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Source high-quality agricultural products from farmers and suppliers across India.",
    responsibilities: [
      "Develop and maintain relationships with farmers and suppliers",
      "Negotiate pricing and terms with agricultural producers",
      "Ensure quality standards are met at the source",
      "Coordinate with quality control team for product inspections",
      "Analyze market trends to optimize procurement strategies",
    ],
    requirements: [
      "Bachelor's degree in Agriculture, Supply Chain, or related field",
      "4+ years experience in agricultural procurement",
      "Strong knowledge of Indian agricultural products and regions",
      "Excellent negotiation and relationship management skills",
      "Willingness to travel to rural farming regions",
    ],
  },
];

const Careers = () => {
  const { t } = useTranslation();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    // Scroll to application form
    setTimeout(() => {
      document
        .getElementById("application-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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
              Join Our Team
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              Careers at Jovian Overseas
            </h1>
            <p className="text-lg text-green-700/80 max-w-3xl mx-auto">
              Build your career with a leader in agricultural exports and make a
              global impact
            </p>
          </div>

          {/* Why Join Us Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
              Why Join Jovian Overseas?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: Globe,
                  title: "Global Impact",
                  description:
                    "Connect Indian agriculture with international markets and make a difference in global food supply chains.",
                },
                {
                  icon: Users,
                  title: "Collaborative Culture",
                  description:
                    "Work with a diverse team of professionals who are passionate about excellence in agricultural trade.",
                },
                {
                  icon: GraduationCap,
                  title: "Growth Opportunities",
                  description:
                    "Continuous learning and development with clear career advancement paths in a growing industry.",
                },
                {
                  icon: Building,
                  title: "Industry Leadership",
                  description:
                    "Be part of a respected organization with over 10 years of excellence in agricultural exports.",
                },
                {
                  icon: Briefcase,
                  title: "Competitive Benefits",
                  description:
                    "Attractive compensation packages, health benefits, and performance incentives.",
                },
                {
                  icon: Clock,
                  title: "Work-Life Balance",
                  description:
                    "We value our employees' wellbeing with flexible work arrangements and supportive policies.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-6 border-green-200 hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-green-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-green-700/80">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Current Openings Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
              Current Openings
            </h2>

            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Departments</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="quality">Quality Control</TabsTrigger>
                  <TabsTrigger value="supply">Supply Chain</TabsTrigger>
                  <TabsTrigger value="procurement">Procurement</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-6">
                {jobOpenings.map((job, index) => (
                  <JobCard
                    key={index}
                    job={job}
                    index={index}
                    onApply={() => handleApply(job)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                {jobOpenings
                  .filter((job) => job.department === "Sales")
                  .map((job, index) => (
                    <JobCard
                      key={index}
                      job={job}
                      index={index}
                      onApply={() => handleApply(job)}
                    />
                  ))}
              </TabsContent>

              <TabsContent value="quality" className="space-y-6">
                {jobOpenings
                  .filter((job) => job.department === "Quality Control")
                  .map((job, index) => (
                    <JobCard
                      key={index}
                      job={job}
                      index={index}
                      onApply={() => handleApply(job)}
                    />
                  ))}
              </TabsContent>

              <TabsContent value="supply" className="space-y-6">
                {jobOpenings
                  .filter((job) => job.department === "Supply Chain")
                  .map((job, index) => (
                    <JobCard
                      key={index}
                      job={job}
                      index={index}
                      onApply={() => handleApply(job)}
                    />
                  ))}
              </TabsContent>

              <TabsContent value="procurement" className="space-y-6">
                {jobOpenings
                  .filter((job) => job.department === "Procurement")
                  .map((job, index) => (
                    <JobCard
                      key={index}
                      job={job}
                      index={index}
                      onApply={() => handleApply(job)}
                    />
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Application Form */}
          {showApplicationForm && (
            <div id="application-form" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
                Apply for {selectedJob?.title}
              </h2>
              <CareerForm jobTitle={selectedJob?.title} />
            </div>
          )}

          {/* Our Hiring Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
              Our Hiring Process
            </h2>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 transform -translate-x-1/2"></div>

              {[
                {
                  title: "Application Review",
                  description:
                    "Our HR team carefully reviews all applications to identify candidates whose skills and experience match our requirements.",
                },
                {
                  title: "Initial Interview",
                  description:
                    "Selected candidates are invited for an initial interview to discuss their background, experience, and fit for the role.",
                },
                {
                  title: "Technical Assessment",
                  description:
                    "Depending on the role, candidates may be asked to complete a technical assessment or case study to demonstrate their expertise.",
                },
                {
                  title: "Final Interview",
                  description:
                    "Successful candidates meet with senior team members and potential colleagues to ensure mutual fit and alignment with our values.",
                },
                {
                  title: "Offer & Onboarding",
                  description:
                    "We extend offers to the best candidates and provide comprehensive onboarding to set them up for success.",
                },
              ].map((step, index) => (
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
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <Card className="p-6 border-green-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-green-700/80">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-green-50 p-8 rounded-xl border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Don't See a Perfect Match?
            </h2>
            <p className="text-green-700/80 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team.
              Send us your resume and we'll keep it on file for future
              opportunities.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg rounded-lg"
              onClick={() => {
                setSelectedJob({ title: "General Application" });
                setShowApplicationForm(true);
                setTimeout(() => {
                  document.getElementById("application-form")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
            >
              Submit General Application
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

export default Careers;
