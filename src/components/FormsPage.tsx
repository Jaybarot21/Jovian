import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ContactUsForm from "./ContactUsForm";
import JobApplicationForm from "./JobApplicationForm";
import ProductInquiryForm from "./ProductInquiryForm";
import PartnershipForm from "./PartnershipForm";
import Navigation from "./Navigation";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

const FormsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="container mx-auto px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Get in Touch
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              How Can We Help You?
            </h1>
            <p className="text-lg text-green-700/80 max-w-3xl mx-auto">
              Fill out the appropriate form below and our team will get back to
              you promptly
            </p>
          </div>

          <Tabs defaultValue="contact" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="product">Product Inquiry</TabsTrigger>
                <TabsTrigger value="job">Job Application</TabsTrigger>
                <TabsTrigger value="partnership">Partnership</TabsTrigger>
              </TabsList>
            </div>

            <div className="max-w-3xl mx-auto">
              <TabsContent value="contact">
                <ContactUsForm />
              </TabsContent>

              <TabsContent value="product">
                <ProductInquiryForm />
              </TabsContent>

              <TabsContent value="job">
                <JobApplicationForm />
              </TabsContent>

              <TabsContent value="partnership">
                <PartnershipForm />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>

      <Footer />
      <NavigationBar />
    </div>
  );
};

export default FormsPage;
