-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  specifications TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media_library table
CREATE TABLE IF NOT EXISTS media_library (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create catalogs table
CREATE TABLE IF NOT EXISTS catalogs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  file_size TEXT,
  file_type TEXT,
  download_url TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content_pages table
CREATE TABLE IF NOT EXISTS content_pages (
  id SERIAL PRIMARY KEY,
  page_type TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id SERIAL PRIMARY KEY,
  template_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for all tables
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table media_library;
alter publication supabase_realtime add table catalogs;
alter publication supabase_realtime add table social_links;
alter publication supabase_realtime add table content_pages;
alter publication supabase_realtime add table email_templates;

-- Insert initial data for content pages
INSERT INTO content_pages (page_type, content) VALUES
('payment_terms', '# Payment Terms

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

Any payment disputes must be raised in writing within 5 business days of invoice receipt, clearly stating the nature of the dispute. Undisputed portions of invoices must be paid according to the agreed terms while the disputed amount is resolved.'),
('terms_conditions', '# Terms and Conditions

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

We reserve the right to update or modify these Terms at any time without prior notice. The most current version will be posted on our website.');

-- Insert initial email templates
INSERT INTO email_templates (template_type, subject, content) VALUES
('intro', 'Introduction to Jovian Overseas - Premium Agricultural Exports', '<p>Dear [Client Name],</p>

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
Website: www.jovianoverseas.com</p>'),
('contact', 'Thank You for Contacting Jovian Overseas', '<p>Dear [Client Name],</p>

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
Jovian Overseas</p>'),
('terms', 'Jovian Overseas - Terms and Conditions', '<p>Dear [Client Name],</p>

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
Email: [your.email]@jovianoverseas.com</p>'),
('order', 'Purchase Order Confirmation - Jovian Overseas', '<p>Dear [Client Name],</p>

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
Email: [your.email]@jovianoverseas.com</p>');

-- Insert initial social links
INSERT INTO social_links (platform, url, is_active) VALUES
('facebook', 'https://facebook.com/jovianoverseas', true),
('twitter', 'https://twitter.com/jovianoverseas', true),
('instagram', 'https://instagram.com/jovianoverseas', true),
('linkedin', 'https://linkedin.com/company/jovianoverseas', true),
('youtube', '', false);

-- Insert initial products
INSERT INTO products (name, description, specifications, category, image_url) VALUES
('Premium Chickpeas', 'Superior quality chickpeas with exceptional protein content', '8mm, 9mm, 10mm sizes available', 'Pulses', 'https://images.unsplash.com/photo-1632731354898-c3c8b796e41b?q=80&w=1200'),
('Exotic Rice Varieties', 'Finest basmati and specialty rice varieties', 'Premium Long & Medium grain', 'Grains', 'https://images.unsplash.com/photo-1626016570496-9b10c86cd975?q=80&w=1200'),
('Premium Wheat', 'High-grade wheat for premium flour production', 'Protein content: 12-13%', 'Grains', 'https://images.unsplash.com/photo-1631209121750-a9f625f98944?q=80&w=1200'),
('Selected Groundnuts', 'Hand-picked, premium grade groundnuts', 'Bold 40/50, Java 45/50', 'Oil Seeds', 'https://images.unsplash.com/photo-1567204912523-924c85323be4?q=80&w=1200'),
('Golden Sesame Seeds', 'Pure, natural sesame seeds', '99.95% purity, 45-50% oil content', 'Oil Seeds', 'https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=1200'),
('Premium Red Chilli', 'Vibrant, aromatic red chillis', 'S4, S5, S6 grades available', 'Spices', 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=1200');

-- Insert initial media library
INSERT INTO media_library (name, url) VALUES
('chickpeas.jpg', 'https://images.unsplash.com/photo-1632731354898-c3c8b796e41b?q=80&w=1200'),
('rice.jpg', 'https://images.unsplash.com/photo-1626016570496-9b10c86cd975?q=80&w=1200'),
('wheat.jpg', 'https://images.unsplash.com/photo-1631209121750-a9f625f98944?q=80&w=1200'),
('groundnuts.jpg', 'https://images.unsplash.com/photo-1567204912523-924c85323be4?q=80&w=1200'),
('sesame.jpg', 'https://images.unsplash.com/photo-1612204103590-b961c83a6cbb?q=80&w=1200'),
('chilli.jpg', 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=1200'),
('pulses.jpg', 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800'),
('grains.jpg', 'https://images.unsplash.com/photo-1530272532890-11ad2b5877e7?q=80&w=800');

-- Insert initial catalogs
INSERT INTO catalogs (name, description, file_size, file_type, download_url, is_public, upload_date) VALUES
('Product Catalog 2024', 'Complete product catalog with specifications and pricing', '4.2 MB', 'PDF', '#', true, '2024-01-15'),
('Pulses Catalog Q2 2024', 'Specialized catalog for pulses with detailed specifications', '2.8 MB', 'PDF', '#', true, '2024-04-05'),
('Spices Brochure 2024', 'Premium spices brochure with high-quality images', '5.1 MB', 'PDF', '#', true, '2024-03-20'),
('Price List - Wholesale', 'Confidential wholesale price list for distributors', '1.5 MB', 'XLSX', '#', false, '2024-05-01');