import { motion } from "framer-motion";
import { Card } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Legal Information
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              Terms and Conditions
            </h1>
            <p className="text-lg text-green-700/80">
              Please read these terms carefully before engaging in business with
              Jovian Overseas
            </p>
          </div>

          <Card className="p-6 md:p-8 border-green-200 mb-8">
            <p className="text-green-800 mb-6">Last Updated: June 15, 2024</p>

            <div className="prose prose-green max-w-none text-green-700">
              <p>
                These Terms and Conditions ("Terms") govern your relationship
                with Jovian Overseas ("Company", "we", "us", or "our") when you
                purchase products, engage our services, or otherwise interact
                with our business operations.
              </p>

              <Accordion type="single" collapsible className="mt-8">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    1. Acceptance of Terms
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      By engaging in business with Jovian Overseas, you
                      acknowledge that you have read, understood, and agree to
                      be bound by these Terms. If you do not agree to these
                      Terms, please refrain from purchasing our products or
                      services.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    2. Product Information
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      2.1 <strong>Product Descriptions:</strong> We strive to
                      provide accurate descriptions of our agricultural
                      products. However, we do not warrant that product
                      descriptions or other content are accurate, complete,
                      reliable, current, or error-free.
                    </p>
                    <p className="mt-2">
                      2.2 <strong>Product Samples:</strong> Product samples are
                      provided for reference only. Actual delivered products may
                      vary slightly in appearance while maintaining the
                      specified quality parameters.
                    </p>
                    <p className="mt-2">
                      2.3 <strong>Quality Standards:</strong> All products are
                      subject to our quality control processes and comply with
                      international food safety standards as specified in our
                      product documentation.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    3. Orders and Contracts
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      3.1 <strong>Purchase Orders:</strong> All purchase orders
                      must be in writing and are subject to acceptance by Jovian
                      Overseas.
                    </p>
                    <p className="mt-2">
                      3.2 <strong>Contract Formation:</strong> A binding
                      contract is formed only when we provide written
                      confirmation of your order.
                    </p>
                    <p className="mt-2">
                      3.3 <strong>Minimum Order Quantities:</strong> Minimum
                      order quantities apply and vary by product category.
                      Please refer to our product catalog for specific
                      requirements.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    4. Pricing and Payment
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      4.1 <strong>Pricing:</strong> All prices are quoted in USD
                      unless otherwise specified and are exclusive of taxes,
                      duties, and shipping costs.
                    </p>
                    <p className="mt-2">
                      4.2 <strong>Price Validity:</strong> Price quotations are
                      valid for 30 days unless otherwise specified in writing.
                    </p>
                    <p className="mt-2">
                      4.3 <strong>Payment Terms:</strong> Standard payment terms
                      are detailed in our Payment Terms document. We reserve the
                      right to require advance payment or letters of credit for
                      new customers.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    5. Shipping and Delivery
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      5.1 <strong>Delivery Terms:</strong> Unless otherwise
                      agreed, all shipments are made FOB (Free On Board) from
                      our designated shipping points.
                    </p>
                    <p className="mt-2">
                      5.2 <strong>Delivery Timeframes:</strong> Delivery dates
                      are estimates only and not guaranteed. We shall not be
                      liable for any delays in delivery.
                    </p>
                    <p className="mt-2">
                      5.3 <strong>Risk Transfer:</strong> Risk of loss or damage
                      passes to the buyer when products are delivered to the
                      carrier.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    6. Inspection and Returns
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      6.1 <strong>Inspection Period:</strong> Buyer must inspect
                      products within 5 business days of receipt and notify us
                      in writing of any claims for shortages, defects, or
                      non-conformity.
                    </p>
                    <p className="mt-2">
                      6.2 <strong>Return Authorization:</strong> No products may
                      be returned without our prior written authorization.
                    </p>
                    <p className="mt-2">
                      6.3 <strong>Quality Claims:</strong> All quality claims
                      must be supported by independent third-party inspection
                      reports from recognized authorities.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    7. Limitation of Liability
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      7.1 <strong>Liability Cap:</strong> Our maximum liability
                      shall not exceed the purchase price of the products that
                      are the subject of the claim.
                    </p>
                    <p className="mt-2">
                      7.2 <strong>Exclusions:</strong> We shall not be liable
                      for any indirect, incidental, special, consequential, or
                      punitive damages.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    8. Force Majeure
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      We shall not be liable for any failure or delay in
                      performance due to circumstances beyond our reasonable
                      control, including but not limited to natural disasters,
                      acts of government, labor disputes, or supply chain
                      disruptions.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    9. Governing Law
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      These Terms shall be governed by and construed in
                      accordance with the laws of India, without giving effect
                      to any principles of conflicts of law.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-lg font-semibold text-green-800">
                    10. Amendments
                  </AccordionTrigger>
                  <AccordionContent className="text-green-700">
                    <p>
                      We reserve the right to update or modify these Terms at
                      any time without prior notice. The most current version
                      will be posted on our website.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Card>

          <div className="text-center mt-12">
            <p className="text-green-700">
              For any questions regarding our Terms and Conditions, please
              contact our legal department at:
            </p>
            <p className="font-medium text-green-800 mt-2">
              legal@jovianoverseas.com
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default TermsConditions;
