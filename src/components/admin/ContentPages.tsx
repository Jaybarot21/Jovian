import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Save, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useSupabaseRealtime } from "../../hooks/useSupabaseRealtime";

const ContentPages = () => {
  const { data: contentPages, loading } = useSupabaseRealtime("content_pages");
  const [paymentTerms, setPaymentTerms] = useState(`# Payment Terms

## 1. Standard Payment Methods

- **Letter of Credit**: Irrevocable Letter of Credit at sight, confirmed by a prime bank
- **Wire Transfer**: Direct bank transfer to our designated account
- **Documentary Collection**: Documents against payment (D/P) or acceptance (D/A)
- **Trade Credit Insurance**: Available for established customers with approved credit

## 2. Payment Terms by Customer Category

| Customer Category | Standard Terms | Required Documentation |
|------------------|----------------|------------------------|
| New Customers | 100% advance payment or irrevocable L/C at sight | Company registration, trade references |
| Established Customers (1-2 years) | 30% advance, 70% against shipping documents | Trade history, bank references |
| Long-term Partners (3+ years) | Net 30-60 days from B/L date | Annual financial statements |
| Strategic Partners | Customized terms as per agreement | Signed partnership agreement |

## 3. Currency and Banking Details

All payments are to be made in US Dollars (USD) unless otherwise specified in the sales contract. Banking details will be provided on the commercial invoice. All bank charges outside India are to be borne by the buyer.

## 4. Credit Approval Process

1. **Application Submission**: Complete credit application form with required documentation
2. **Financial Review**: Assessment of financial statements and payment history
3. **Trade Reference Check**: Verification with existing suppliers and partners
4. **Credit Decision**: Determination of credit limit and payment terms
5. **Annual Review**: Yearly reassessment of credit terms and limits

## 5. Late Payment Policy

Overdue payments are subject to interest charges of 1.5% per month or the maximum rate permitted by law, whichever is lower, calculated from the due date until payment is received.

## 6. Disputes and Resolutions

Any payment disputes must be raised in writing within 5 business days of invoice receipt, clearly stating the nature of the dispute. Undisputed portions of invoices must be paid according to the agreed terms while the disputed amount is resolved.`);

  const [termsConditions, setTermsConditions] = useState(`# Terms and Conditions

These Terms and Conditions ("Terms") govern your relationship with Jovian Overseas ("Company", "we", "us", or "our") when you purchase products, engage our services, or otherwise interact with our business operations.

## 1. Acceptance of Terms

By engaging in business with Jovian Overseas, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please refrain from purchasing our products or services.

## 2. Product Information

2.1 **Product Descriptions**: We strive to provide accurate descriptions of our agricultural products. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, current, or error-free.

2.2 **Product Samples**: Product samples are provided for reference only. Actual delivered products may vary slightly in appearance while maintaining the specified quality parameters.

2.3 **Quality Standards**: All products are subject to our quality control processes and comply with international food safety standards as specified in our product documentation.

## 3. Orders and Contracts

3.1 **Purchase Orders**: All purchase orders must be in writing and are subject to acceptance by Jovian Overseas.

3.2 **Contract Formation**: A binding contract is formed only when we provide written confirmation of your order.

3.3 **Minimum Order Quantities**: Minimum order quantities apply and vary by product category. Please refer to our product catalog for specific requirements.

## 4. Pricing and Payment

4.1 **Pricing**: All prices are quoted in USD unless otherwise specified and are exclusive of taxes, duties, and shipping costs.

4.2 **Price Validity**: Price quotations are valid for 30 days unless otherwise specified in writing.

4.3 **Payment Terms**: Standard payment terms are detailed in our Payment Terms document. We reserve the right to require advance payment or letters of credit for new customers.

## 5. Shipping and Delivery

5.1 **Delivery Terms**: Unless otherwise agreed, all shipments are made FOB (Free On Board) from our designated shipping points.

5.2 **Delivery Timeframes**: Delivery dates are estimates only and not guaranteed. We shall not be liable for any delays in delivery.

5.3 **Risk Transfer**: Risk of loss or damage passes to the buyer when products are delivered to the carrier.

## 6. Inspection and Returns

6.1 **Inspection Period**: Buyer must inspect products within 5 business days of receipt and notify us in writing of any claims for shortages, defects, or non-conformity.

6.2 **Return Authorization**: No products may be returned without our prior written authorization.

6.3 **Quality Claims**: All quality claims must be supported by independent third-party inspection reports from recognized authorities.

## 7. Limitation of Liability

7.1 **Liability Cap**: Our maximum liability shall not exceed the purchase price of the products that are the subject of the claim.

7.2 **Exclusions**: We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

## 8. Force Majeure

We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to natural disasters, acts of government, labor disputes, or supply chain disruptions.

## 9. Governing Law

These Terms shall be governed by and construed in accordance with the laws of India, without giving effect to any principles of conflicts of law.

## 10. Amendments

We reserve the right to update or modify these Terms at any time without prior notice. The most current version will be posted on our website.`);

  const [saveStatus, setSaveStatus] = useState({
    payment: null,
    terms: null,
  });

  // Update content when data changes from Supabase
  useEffect(() => {
    if (contentPages && contentPages.length > 0) {
      // Set payment terms content
      const paymentTermsPage = contentPages.find(
        (page) => page.page_type === "payment_terms",
      );
      if (paymentTermsPage) {
        setPaymentTerms(paymentTermsPage.content);
      }

      // Set terms and conditions content
      const termsConditionsPage = contentPages.find(
        (page) => page.page_type === "terms_conditions",
      );
      if (termsConditionsPage) {
        setTermsConditions(termsConditionsPage.content);
      }
    }
  }, [contentPages]);

  const handleSave = async (type) => {
    setSaveStatus({ ...saveStatus, [type]: "saving" });

    try {
      const content = type === "payment" ? paymentTerms : termsConditions;
      const pageType =
        type === "payment" ? "payment_terms" : "terms_conditions";

      // Check if the page exists
      const { data: existingPages, error: fetchError } = await supabase
        .from("content_pages")
        .select("id")
        .eq("page_type", pageType);

      if (fetchError) throw fetchError;

      let saveError;

      if (existingPages && existingPages.length > 0) {
        // Update existing page
        const { error } = await supabase
          .from("content_pages")
          .update({ content, updated_at: new Date().toISOString() })
          .eq("page_type", pageType);

        saveError = error;
      } else {
        // Insert new page
        const { error } = await supabase
          .from("content_pages")
          .insert([{ page_type: pageType, content }]);

        saveError = error;
      }

      if (saveError) throw saveError;

      // Force a refresh of the content in the database
      await supabase
        .from("content_pages")
        .select("*")
        .eq("page_type", pageType);

      setSaveStatus({ ...saveStatus, [type]: "saved" });

      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus({ ...saveStatus, [type]: null });
      }, 3000);
    } catch (error) {
      console.error(`Error saving ${type} content:`, error);
      alert(`Error saving content. Please try again.`);
      setSaveStatus({ ...saveStatus, [type]: null });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading content pages...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-6">
        Content Pages Management
      </h1>

      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="payment">
            <FileText className="h-4 w-4 mr-2" /> Payment Terms
          </TabsTrigger>
          <TabsTrigger value="terms">
            <FileText className="h-4 w-4 mr-2" /> Terms & Conditions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-6">
          <Card className="p-6 border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">
                Edit Payment Terms
              </h2>
              <Button
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={() => handleSave("payment")}
                disabled={saveStatus.payment === "saving"}
              >
                <Save className="h-4 w-4" />
                {saveStatus.payment === "saving"
                  ? "Saving..."
                  : saveStatus.payment === "saved"
                    ? "Saved!"
                    : "Save Changes"}
              </Button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Use Markdown format to edit the payment terms. Changes will be
                reflected on the website after saving.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <textarea
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full h-[600px] p-4 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </motion.div>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <Card className="p-6 border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">
                Edit Terms & Conditions
              </h2>
              <Button
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={() => handleSave("terms")}
                disabled={saveStatus.terms === "saving"}
              >
                <Save className="h-4 w-4" />
                {saveStatus.terms === "saving"
                  ? "Saving..."
                  : saveStatus.terms === "saved"
                    ? "Saved!"
                    : "Save Changes"}
              </Button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Use Markdown format to edit the terms and conditions. Changes
                will be reflected on the website after saving.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <textarea
                value={termsConditions}
                onChange={(e) => setTermsConditions(e.target.value)}
                className="w-full h-[600px] p-4 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </motion.div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Card className="p-4 border-green-200 bg-green-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Markdown Tips</h3>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• Use # for headings (# H1, ## H2, ### H3)</li>
                <li>• Use * or - for bullet points</li>
                <li>• Use 1. 2. 3. for numbered lists</li>
                <li>• Use **text** for bold text</li>
                <li>• Use *text* for italic text</li>
                <li>• Use [link text](URL) for links</li>
                <li>• Use | for tables with header row and separator row</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentPages;
