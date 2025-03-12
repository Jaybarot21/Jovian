import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import QualitySection from "./QualitySection";
import ProductShowcase from "./ProductShowcase";
import PartnersMap from "./PartnersMap";
import TestimonialCard from "./TestimonialCard";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import ProductGrid from "./ProductGrid";
import NavigationBar from "./NavigationBar";
import { motion } from "framer-motion";
import { useTranslation } from "../lib/translations";

function Home() {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <HeroSection />
      <ProductShowcase />
      <ProductGrid />
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
              {t("clientTestimonials")}
            </div>
            <h2 className="text-4xl font-bold mb-4 text-green-800">
              {t("whatClientsSay")}
            </h2>
            <p className="text-xl text-green-700/80">
              {t("testimonialSubtitle")}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <TestimonialCard
              name={t("testimonialName1")}
              role={t("testimonialRole1")}
              company={t("testimonialCompany1")}
              testimonial={t("testimonialText1")}
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            />
            <TestimonialCard
              name={t("testimonialName2")}
              role={t("testimonialRole2")}
              company={t("testimonialCompany2")}
              testimonial={t("testimonialText2")}
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
            />
            <TestimonialCard
              name={t("testimonialName3")}
              role={t("testimonialRole3")}
              company={t("testimonialCompany3")}
              testimonial={t("testimonialText3")}
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
            />
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
      <NavigationBar />
    </div>
  );
}

export default Home;
