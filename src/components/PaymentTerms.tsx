import { motion } from "framer-motion";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { FileText, CreditCard, Building2, Clock, Shield } from "lucide-react";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

const PaymentTerms = () => {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Financial Information
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              Payment Terms
            </h1>
            <p className="text-lg text-green-700/80">
              Standard payment policies for business transactions with Jovian
              Overseas
            </p>
          </div>

          <Card className="p-6 md:p-8 border-green-200 mb-8">
            <p className="text-green-800 mb-6">Last Updated: June 15, 2024</p>

            <div className="prose prose-green max-w-none text-green-700">
              <p>
                This document outlines the standard payment terms and conditions
                for all business transactions with Jovian Overseas. These terms
                apply to all orders unless specifically modified in writing by
                an authorized representative of Jovian Overseas.
              </p>

              <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">
                1. Standard Payment Methods
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {[
                  {
                    icon: CreditCard,
                    title: "Letter of Credit",
                    description:
                      "Irrevocable Letter of Credit at sight, confirmed by a prime bank",
                  },
                  {
                    icon: Building2,
                    title: "Wire Transfer",
                    description:
                      "Direct bank transfer to our designated account",
                  },
                  {
                    icon: FileText,
                    title: "Documentary Collection",
                    description:
                      "Documents against payment (D/P) or acceptance (D/A)",
                  },
                  {
                    icon: Shield,
                    title: "Trade Credit Insurance",
                    description:
                      "Available for established customers with approved credit",
                  },
                ].map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-green-50 rounded-lg"
                  >
                    <div className="mr-4 mt-1 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <method.icon className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">
                        {method.title}
                      </h3>
                      <p className="text-sm text-green-700/70">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">
                2. Payment Terms by Customer Category
              </h2>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      Customer Category
                    </TableHead>
                    <TableHead>Standard Terms</TableHead>
                    <TableHead className="text-right">
                      Required Documentation
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">New Customers</TableCell>
                    <TableCell>
                      100% advance payment or irrevocable L/C at sight
                    </TableCell>
                    <TableCell className="text-right">
                      Company registration, trade references
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Established Customers (1-2 years)
                    </TableCell>
                    <TableCell>
                      30% advance, 70% against shipping documents
                    </TableCell>
                    <TableCell className="text-right">
                      Trade history, bank references
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Long-term Partners (3+ years)
                    </TableCell>
                    <TableCell>Net 30-60 days from B/L date</TableCell>
                    <TableCell className="text-right">
                      Annual financial statements
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Strategic Partners
                    </TableCell>
                    <TableCell>Customized terms as per agreement</TableCell>
                    <TableCell className="text-right">
                      Signed partnership agreement
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">
                3. Currency and Banking Details
              </h2>
              <p>
                All payments are to be made in US Dollars (USD) unless otherwise
                specified in the sales contract. Banking details will be
                provided on the commercial invoice. All bank charges outside
                India are to be borne by the buyer.
              </p>

              <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">
                4. Credit Approval Process
              </h2>
              <div className="relative pl-8 mt-6 space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-green-200">
                {[
                  {
                    title: "Application Submission",
                    description:
                      "Complete credit application form with required documentation",
                  },
                  {
                    title: "Financial Review",
                    description:
                      "Assessment of financial statements and payment history",
                  },
                  {
                    title: "Trade Reference Check",
                    description:
                      "Verification with existing suppliers and partners",
                  },
                  {
                    title: "Credit Decision",
                    description:
                      "Determination of credit limit and payment terms",
                  },
                  {
                    title: "Annual Review",
                    description:
                      "Yearly reassessment of credit terms and limits",
                  },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-medium text-green-800">{step.title}</h3>
                    <p className="text-green-700/70">{step.description}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">
                5. Late Payment Policy
              </h2>
              <div className="flex items-start p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <Clock className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 font-medium">
                    Late Payment Interest
                  </p>
                  <p className="text-amber-700/80">
                    Overdue payments are subject to interest charges of 1.5% per
                    month or the maximum rate permitted by law, whichever is
                    lower, calculated from the due date until payment is
                    received.
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">
                6. Disputes and Resolutions
              </h2>
              <p>
                Any payment disputes must be raised in writing within 5 business
                days of invoice receipt, clearly stating the nature of the
                dispute. Undisputed portions of invoices must be paid according
                to the agreed terms while the disputed amount is resolved.
              </p>
            </div>
          </Card>

          <div className="text-center mt-12">
            <p className="text-green-700">
              For any questions regarding our Payment Terms, please contact our
              finance department at:
            </p>
            <p className="font-medium text-green-800 mt-2">
              finance@jovianoverseas.com
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default PaymentTerms;
