import { useState } from "react";
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
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslation } from "../lib/translations";
import { supabase } from "../lib/supabase";
import { useContactInfo } from "../hooks/useContactInfo";

const ContactForm = () => {
  const { t } = useTranslation();
  const { contactInfo, loading: contactInfoLoading } = useContactInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      interest: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Call the Supabase Edge Function
      const { error: submitError } = await supabase.functions.invoke(
        "supabase-functions-submit-contact",
        {
          body: formData,
        },
      );

      if (submitError) throw new Error(submitError.message);

      // Success
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        interest: "",
        message: "",
      });

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(t("formSubmitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

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
              {t("letsConnect")}
            </div>
            <h2 className="text-4xl font-bold mb-4 text-green-800">
              {t("getInTouchTitle")}
            </h2>
            <p className="text-xl text-green-700/80">
              {t("getInTouchSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8 bg-white border-green-200 hover:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-semibold text-green-800 mb-6">
                  {t("contactInformation")}
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      text: contactInfo?.address || t("companyAddress"),
                    },
                    {
                      icon: Phone,
                      text: contactInfo?.phone || t("companyPhone"),
                    },
                    {
                      icon: Mail,
                      text: contactInfo?.email || t("companyEmail"),
                    },
                    {
                      icon: Clock,
                      text: contactInfo?.business_hours || t("businessHours"),
                    },
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
                  <h4 className="font-medium text-green-800 mb-4">
                    {t("resources")}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="/documents/company_profile.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50 justify-start w-full"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        {t("companyProfile")}
                      </Button>
                    </a>
                    <a
                      href="/documents/product_catalog.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50 justify-start w-full"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {t("productCatalog")}
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>

              {/* Global Logistics Section */}
              <Card className="p-6 bg-white border-green-200 shadow-md">
                <h4 className="font-medium text-green-800 mb-4">
                  {t("globalExcellence")}
                </h4>
                <p className="text-green-700/80 mb-4">
                  {t("globalLogisticsSubtitle")}
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    t("seaFreight"),
                    t("airFreight"),
                    t("inlandTransport"),
                    t("realTimeTracking"),
                  ].map((service, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-700">{service}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-white border-green-200 hover:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {t("thankYou")}
                  </h3>
                  <p className="text-green-700/80 max-w-md">
                    {t("messageReceived")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 p-4 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-700">
                        {t("yourName")}*
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("namePlaceholder")}
                        required
                        className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-700">
                        {t("yourEmail")}*
                      </label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        required
                        className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-700">
                        {t("company")}
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t("companyPlaceholder")}
                        className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-700">
                        {t("phone")}
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder={t("phonePlaceholder")}
                        className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      {t("interestedIn")}*
                    </label>
                    <Select
                      value={formData.interest}
                      onValueChange={handleSelectChange}
                      required
                    >
                      <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                        <SelectValue placeholder={t("selectCategory")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pulses">{t("pulses")}</SelectItem>
                        <SelectItem value="grains">{t("grains")}</SelectItem>
                        <SelectItem value="spices">{t("spices")}</SelectItem>
                        <SelectItem value="oilseeds">
                          {t("oilSeeds")}
                        </SelectItem>
                        <SelectItem value="cotton">{t("cotton")}</SelectItem>
                        <SelectItem value="other">
                          {t("otherProducts")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      {t("message")}*
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("messagePlaceholder")}
                      required
                      className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500 min-h-[150px]"
                    />
                  </div>

                  <div className="text-xs text-green-700/70">
                    {t("requiredFields")}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("sending")}
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t("sendInquiry")}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-green-700/60">
                    {t("formDisclaimer")}
                  </p>
                </form>
              )}
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
