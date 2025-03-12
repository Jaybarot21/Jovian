import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ContactInfoEditor from "./ContactInfoEditor";
import NavigationEditor from "./NavigationEditor";
import Navigation from "../Navigation";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
            Admin Panel
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
            Website Management
          </h1>
          <p className="text-lg text-green-700/80 max-w-3xl mx-auto">
            Update website content and manage settings
          </p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="contact">Contact Information</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="contact">
            <ContactInfoEditor />
          </TabsContent>

          <TabsContent value="navigation">
            <NavigationEditor />
          </TabsContent>

          <TabsContent value="products">
            <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
              <p className="text-green-700">Product management coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
              <p className="text-green-700">Settings management coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default AdminPanel;
