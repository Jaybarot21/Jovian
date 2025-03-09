import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import LogisticsSection from "./LogisticsSection";
import QualitySection from "./QualitySection";
import AboutUs from "./AboutUs";
import ProductShowcase from "./ProductShowcase";
import GlobalLogistics from "./GlobalLogistics";
import PartnersMap from "./PartnersMap";
import TestimonialCard from "./TestimonialCard";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import ProductGrid from "./ProductGrid";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <HeroSection />
      <LogisticsSection />
      <AboutUs />
      <ProductShowcase />
      <ProductGrid />
      <GlobalLogistics />
      <QualitySection />
      <PartnersMap />

      <section id="testimonials" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Client Testimonials
            </div>
            <h2 className="text-4xl font-bold mb-4 text-green-800">
              What Our Clients Say
            </h2>
            <p className="text-xl text-green-700/80">
              Testimonials from our valued partners
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Import Manager"
              company="European Foods Ltd"
              testimonial="Exceptional quality and reliable service. Their agricultural products consistently meet our high standards."
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Procurement Director"
              company="Pacific Trade Co."
              testimonial="Outstanding commitment to quality and timely deliveries. Their spices and grains are among the best we've sourced."
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
            />
            <TestimonialCard
              name="Elena Rodriguez"
              role="Supply Chain Manager"
              company="Global Distributors Inc."
              testimonial="Their logistics expertise and attention to documentation make international trade seamless. A trusted partner for our business."
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
            />
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
