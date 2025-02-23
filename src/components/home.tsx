import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import AboutUs from "./AboutUs";
import ProductShowcase from "./ProductShowcase";
import PartnersMap from "./PartnersMap";
import TestimonialCard from "./TestimonialCard";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-950 via-[#001B3B] to-slate-950">
      <Navigation />
      <HeroSection />
      <AboutUs />
      <ProductShowcase />
      <PartnersMap />

      <section
        id="testimonials"
        className="py-20 bg-gradient-to-b from-[#001B3B] to-slate-950"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text">
              What Our Clients Say
            </h2>
            <p className="text-xl text-blue-100/80">
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
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
