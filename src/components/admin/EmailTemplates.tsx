import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Save, Mail, Send, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { supabase } from "../../lib/supabase";
import { useSupabaseRealtime } from "../../hooks/useSupabaseRealtime";

const EmailTemplates = () => {
  const { data: emailTemplates, loading } =
    useSupabaseRealtime("email_templates");
  const [templates, setTemplates] = useState({
    intro: {
      subject: "Introduction to Jovian Overseas - Premium Agricultural Exports",
      content: `<p>Dear [Client Name],</p>

<p>I hope this email finds you well. I am [Your Name], [Your Position] at Jovian Overseas, a leading exporter of premium agricultural products from India.</p>

<p>We specialize in high-quality exports of:</p>
<ul>
  <li>Pulses (Chickpeas, Lentils, Mung Beans)</li>
  <li>Grains (Basmati Rice, Wheat, Maize)</li>
  <li>Spices (Turmeric, Cumin, Coriander)</li>
  <li>Oil Seeds (Sesame, Groundnuts)</li>
  <li>Cotton</li>
</ul>

<p>With over 10 years of experience in international agricultural trade and exports to more than 25 countries, we pride ourselves on:</p>
<ul>
  <li>Rigorous quality control processes</li>
  <li>Competitive pricing</li>
  <li>Reliable logistics solutions</li>
  <li>Excellent customer service</li>
</ul>

<p>I have attached our latest product catalog for your review. We would be delighted to discuss how Jovian Overseas can meet your specific requirements.</p>

<p>Would you be available for a brief call next week to explore potential collaboration opportunities?</p>

<p>Best regards,</p>
<p>[Your Name]<br>
[Your Position]<br>
Jovian Overseas<br>
Phone: +91 123 456 7890<br>
Email: [your.email]@jovianoverseas.com<br>
Website: www.jovianoverseas.com</p>`,
    },
    contact: {
      subject: "Thank You for Contacting Jovian Overseas",
      content: `<p>Dear [Client Name],</p>

<p>Thank you for reaching out to Jovian Overseas. We have received your inquiry regarding [specific product/service mentioned in their inquiry].</p>

<p>We appreciate your interest in our products and services. Our team is reviewing your request, and a dedicated representative will contact you within the next 24 hours to discuss your requirements in detail.</p>

<p>In the meantime, you may find our product catalog helpful for an overview of our offerings. You can download it from our website or view the attached copy.</p>

<p>If you have any urgent questions or need immediate assistance, please contact us at:</p>
<p>Phone: +91 123 456 7890<br>
Email: contact@jovianoverseas.com</p>

<p>Thank you for considering Jovian Overseas for your agricultural product needs.</p>

<p>Best regards,</p>
<p>[Your Name]<br>
[Your Position]<br>
Jovian Overseas</p>`,
    },
    terms: {
      subject: "Jovian Overseas - Terms and Conditions",
      content: `<p>Dear [Client Name],</p>

<p>Thank you for your interest in establishing a business relationship with Jovian Overseas. As requested, I am pleased to share our standard terms and conditions for your review.</p>

<p>Attached to this email, you will find our comprehensive Terms and Conditions document that outlines our policies regarding:</p>
<ul>
  <li>Order processing and confirmation</li>
  <li>Payment terms and methods</li>
  <li>Shipping and delivery procedures</li>
  <li>Quality assurance and inspection protocols</li>
  <li>Return and refund policies</li>
  <li>Liability limitations</li>
</ul>

<p>Please review these terms carefully. If you have any questions or require clarification on any points, please contact me directly.</p>

<p>Once you have reviewed the terms, please sign and return the acknowledgment page to formalize our business arrangement.</p>

<p>We look forward to a successful and mutually beneficial business relationship.</p>

<p>Best regards,</p>
<p>[Your Name]<br>
[Your Position]<br>
Jovian Overseas<br>
Phone: +91 123 456 7890<br>
Email: [your.email]@jovianoverseas.com</p>`,
    },
    order: {
      subject: "Purchase Order Confirmation - Jovian Overseas",
      content: `<p>Dear [Client Name],</p>

<p>Thank you for your purchase order #[PO Number] dated [PO Date]. We are pleased to confirm that we have received your order for the following items:</p>

<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
  <tr style="background-color: #f2f2f2;">
    <th>Product</th>
    <th>Specification</th>
    <th>Quantity</th>
    <th>Unit Price</th>
    <th>Total</th>
  </tr>
  <tr>
    <td>[Product Name]</td>
    <td>[Specification]</td>
    <td>[Quantity]</td>
    <td>$[Unit Price]</td>
    <td>$[Total]</td>
  </tr>
  <!-- Additional rows as needed -->
  <tr>
    <td colspan="4" style="text-align: right;"><strong>Subtotal:</strong></td>
    <td>$[Subtotal]</td>
  </tr>
  <tr>
    <td colspan="4" style="text-align: right;"><strong>Shipping:</strong></td>
    <td>$[Shipping]</td>
  </tr>
  <tr>
    <td colspan="4" style="text-align: right;"><strong>Total:</strong></td>
    <td>$[Total Amount]</td>
  </tr>
</table>

<p>Order Details:</p>
<ul>
  <li><strong>Payment Terms:</strong> [Payment Terms]</li>
  <li><strong>Shipping Method:</strong> [Shipping Method]</li>
  <li><strong>Estimated Shipping Date:</strong> [Shipping Date]</li>
  <li><strong>Estimated Delivery Date:</strong> [Delivery Date]</li>
</ul>

<p>Please review the order details above and let us know if you notice any discrepancies. If everything is correct, no further action is required from your side at this time.</p>

<p>We will keep you updated on the status of your order as it progresses through our fulfillment process.</p>

<p>Thank you for choosing Jovian Overseas. We value your business and look forward to serving you.</p>

<p>Best regards,</p>
<p>[Your Name]<br>
[Your Position]<br>
Jovian Overseas<br>
Phone: +91 123 456 7890<br>
Email: [your.email]@jovianoverseas.com</p>`,
    },
  });

  // Load templates from Supabase
  useEffect(() => {
    if (emailTemplates && emailTemplates.length > 0) {
      const templatesObj = {};

      emailTemplates.forEach((template) => {
        templatesObj[template.template_type] = {
          subject: template.subject,
          content: template.content,
        };
      });

      setTemplates((prev) => ({ ...prev, ...templatesObj }));
    }
  }, [emailTemplates]);

  const [currentTemplate, setCurrentTemplate] = useState("intro");
  const [editMode, setEditMode] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState({
    subject: "",
    content: "",
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [testEmailData, setTestEmailData] = useState({
    recipient: "",
    subject: "",
  });

  const handleEditTemplate = () => {
    setEditedTemplate({
      subject: templates[currentTemplate].subject,
      content: templates[currentTemplate].content,
    });
    setEditMode(true);
  };

  const handleSaveTemplate = async () => {
    setSaveStatus("saving");

    try {
      // Check if template exists
      const { data: existingTemplates, error: fetchError } = await supabase
        .from("email_templates")
        .select("id")
        .eq("template_type", currentTemplate);

      if (fetchError) throw fetchError;

      let saveError;

      if (existingTemplates && existingTemplates.length > 0) {
        // Update existing template
        const { error } = await supabase
          .from("email_templates")
          .update({
            subject: editedTemplate.subject,
            content: editedTemplate.content,
            updated_at: new Date().toISOString(),
          })
          .eq("template_type", currentTemplate);

        saveError = error;
      } else {
        // Insert new template
        const { error } = await supabase.from("email_templates").insert([
          {
            template_type: currentTemplate,
            subject: editedTemplate.subject,
            content: editedTemplate.content,
          },
        ]);

        saveError = error;
      }

      if (saveError) throw saveError;

      // Update local state
      setTemplates({
        ...templates,
        [currentTemplate]: {
          subject: editedTemplate.subject,
          content: editedTemplate.content,
        },
      });

      setEditMode(false);
      setSaveStatus("saved");

      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Error saving template. Please try again.");
      setSaveStatus(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSendTestEmail = () => {
    console.log("Sending test email to:", testEmailData.recipient);
    // Here you would typically send the data to your backend

    // Reset form
    setTestEmailData({
      recipient: "",
      subject: "",
    });
  };

  const templateNames = {
    intro: "Introduction Email",
    contact: "Contact Response",
    terms: "Terms & Conditions",
    order: "Purchase Order",
  };

  if (loading) {
    return <div className="p-6 text-center">Loading email templates...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-6">
        Email Templates
      </h1>

      <Tabs
        value={currentTemplate}
        onValueChange={setCurrentTemplate}
        className="w-full"
      >
        <TabsList className="mb-6">
          {Object.keys(templates).map((key) => (
            <TabsTrigger key={key} value={key}>
              <Mail className="h-4 w-4 mr-2" /> {templateNames[key]}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(templates).map((key) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <Card className="p-6 border-green-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-green-700">
                  {templateNames[key]} Template
                </h2>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" /> Test Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Test Email</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="recipient" className="text-right">
                            Recipient
                          </Label>
                          <Input
                            id="recipient"
                            value={testEmailData.recipient}
                            onChange={(e) =>
                              setTestEmailData({
                                ...testEmailData,
                                recipient: e.target.value,
                              })
                            }
                            placeholder="client@example.com"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            value={
                              testEmailData.subject || templates[key].subject
                            }
                            onChange={(e) =>
                              setTestEmailData({
                                ...testEmailData,
                                subject: e.target.value,
                              })
                            }
                            placeholder="Email subject"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSendTestEmail}>
                          <Send className="h-4 w-4 mr-2" /> Send Test
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    onClick={handleEditTemplate}
                  >
                    <FileText className="h-4 w-4" /> Edit Template
                  </Button>
                </div>
              </div>

              {editMode && currentTemplate === key ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      value={editedTemplate.subject}
                      onChange={(e) =>
                        setEditedTemplate({
                          ...editedTemplate,
                          subject: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Email Content (HTML)</Label>
                    <textarea
                      id="content"
                      value={editedTemplate.content}
                      onChange={(e) =>
                        setEditedTemplate({
                          ...editedTemplate,
                          content: e.target.value,
                        })
                      }
                      className="w-full h-[400px] p-4 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                      onClick={handleSaveTemplate}
                      disabled={saveStatus === "saving"}
                    >
                      <Save className="h-4 w-4" />
                      {saveStatus === "saving"
                        ? "Saving..."
                        : saveStatus === "saved"
                          ? "Saved!"
                          : "Save Template"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-gray-700 mb-2">Subject:</h3>
                    <p className="text-gray-800">{templates[key].subject}</p>
                  </div>
                  <div className="border rounded-md">
                    <div className="p-4 bg-gray-50 border-b">
                      <h3 className="font-medium text-gray-700">Preview:</h3>
                    </div>
                    <div className="p-6 bg-white">
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: templates[key].content,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => {
                        // Create a Blob from the HTML content
                        const blob = new Blob([templates[key].content], {
                          type: "text/html",
                        });
                        // Create a download link
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${key}-template.html`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <Download className="h-4 w-4" /> Download HTML
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-6">
        <Card className="p-4 border-green-200 bg-green-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">
                Email Template Tips
              </h3>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>
                  • Use placeholders like [Client Name] that can be replaced
                  when sending
                </li>
                <li>• Keep emails concise and focused on a single purpose</li>
                <li>• Include clear call-to-action when appropriate</li>
                <li>
                  • Always provide contact information for follow-up questions
                </li>
                <li>• Test emails on different devices and email clients</li>
                <li>
                  • Use basic HTML for formatting (tables, lists, paragraphs)
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailTemplates;
