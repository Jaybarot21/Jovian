-- Fix the email templates content by properly escaping single quotes
UPDATE email_templates 
SET content = '<p>Dear [Client Name],</p>

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
Website: www.jovianoverseas.com</p>'
WHERE template_type = 'intro';
