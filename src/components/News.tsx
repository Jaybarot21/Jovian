import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowRight, Calendar, User, Tag, ExternalLink } from "lucide-react";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

const newsArticles = [
  {
    title: "Jovian Overseas Expands Export Operations to South America",
    category: "Company News",
    date: "June 10, 2024",
    author: "Marketing Team",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800",
    summary:
      "Jovian Overseas announces expansion of agricultural export operations to Brazil, Argentina, and Chile, strengthening our global presence in the South American market.",
    content:
      "Jovian Overseas is proud to announce the expansion of our agricultural export operations to key South American markets including Brazil, Argentina, and Chile. This strategic move strengthens our global presence and opens new opportunities for Indian agricultural products in the rapidly growing South American economies. The expansion includes new partnerships with major food manufacturers and distributors across the region, focusing initially on pulses, spices, and specialty rice varieties. 'South America represents a significant opportunity for premium Indian agricultural products,' said Rajiv Sharma, CEO of Jovian Overseas. 'We've seen increasing demand for our high-quality offerings and are excited to establish a stronger presence in this dynamic market.' The company has appointed regional representatives in São Paulo, Buenos Aires, and Santiago to facilitate trade relationships and ensure seamless logistics operations. The first shipments to the new markets are scheduled to begin next month.",
    tags: ["Expansion", "South America", "Global Trade"],
  },
  {
    title: "Jovian Overseas Achieves ISO 22000:2018 Certification",
    category: "Quality & Compliance",
    date: "May 15, 2024",
    author: "Quality Assurance Department",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    summary:
      "We are pleased to announce that Jovian Overseas has successfully obtained ISO 22000:2018 certification for our food safety management systems.",
    content:
      "Jovian Overseas is proud to announce the successful completion of ISO 22000:2018 certification for our food safety management systems. This internationally recognized standard validates our commitment to maintaining the highest levels of food safety throughout our supply chain. The certification process involved a comprehensive audit of our facilities, processes, and documentation by an independent certification body. The audit confirmed that our food safety management systems meet the rigorous requirements of the ISO 22000:2018 standard. 'This certification reflects our unwavering commitment to food safety and quality,' said Priya Patel, Head of Quality Assurance at Jovian Overseas. 'It provides our global customers with additional assurance that our products meet the highest international standards.' The ISO 22000:2018 certification complements our existing quality certifications and strengthens our position as a trusted supplier of premium agricultural products to markets worldwide.",
    tags: ["Certification", "Food Safety", "Quality Assurance"],
  },
  {
    title: "Jovian Overseas Launches Sustainable Sourcing Initiative",
    category: "Sustainability",
    date: "April 22, 2024",
    author: "Sustainability Team",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
    summary:
      "On Earth Day, Jovian Overseas announces a new sustainable sourcing initiative to support environmentally responsible farming practices across our supply chain.",
    content:
      "In celebration of Earth Day, Jovian Overseas is proud to announce the launch of our Sustainable Sourcing Initiative, a comprehensive program designed to promote environmentally responsible farming practices across our supply chain. The initiative includes partnerships with farmers who implement sustainable agricultural methods, reduced water usage, and minimal chemical inputs. As part of this program, we are introducing a new line of certified organic products, starting with organic pulses and spices. These products are grown without synthetic pesticides or fertilizers and meet strict international organic standards. 'Sustainability is no longer optional in global agriculture,' said Amit Verma, Sustainability Director at Jovian Overseas. 'Our new initiative reflects our commitment to environmental stewardship while meeting the growing consumer demand for responsibly sourced products.' The company has also committed to reducing its carbon footprint by optimizing logistics operations and implementing energy-efficient practices at its processing facilities. A portion of proceeds from the new organic product line will support farmer education programs focused on sustainable farming techniques.",
    tags: ["Sustainability", "Organic", "Earth Day"],
  },
  {
    title: "Jovian Overseas Reports 30% Growth in Export Volume for FY 2023-24",
    category: "Financial News",
    date: "April 5, 2024",
    author: "Finance Department",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    summary:
      "Jovian Overseas announces strong financial results for the fiscal year 2023-24, with export volumes increasing by 30% compared to the previous year.",
    content:
      "Jovian Overseas is pleased to report strong financial results for the fiscal year 2023-24, with export volumes increasing by 30% compared to the previous year. This growth was driven by expanded market presence in Europe and Southeast Asia, as well as the introduction of new product categories. The company's revenue reached a record high of $75 million, representing a 25% increase year-over-year. Particularly strong performance was seen in the premium rice and spice segments, which grew by 40% and 35% respectively. 'These results reflect the success of our market diversification strategy and our focus on premium quality products,' said Sanjay Kapoor, Chief Financial Officer at Jovian Overseas. 'We've made significant investments in quality control and logistics infrastructure, which have enabled us to meet increasing global demand efficiently.' The company also reported improved profit margins due to operational efficiencies and strategic sourcing initiatives. Looking ahead, Jovian Overseas plans to further expand its product portfolio and enter new markets in Africa and North America in the coming fiscal year.",
    tags: ["Financial Results", "Growth", "Export Volume"],
  },
  {
    title: "Jovian Overseas Wins 'Best Agricultural Exporter' Award",
    category: "Awards & Recognition",
    date: "March 12, 2024",
    author: "Corporate Communications",
    image:
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800",
    summary:
      "Jovian Overseas has been recognized as the 'Best Agricultural Exporter' at the prestigious International Trade Excellence Awards 2024.",
    content:
      "Jovian Overseas is honored to announce that it has been recognized as the 'Best Agricultural Exporter' at the prestigious International Trade Excellence Awards 2024. The award ceremony, held in Dubai last week, celebrates outstanding achievements in global trade and export excellence. The company was selected from a competitive field of international agricultural exporters based on criteria including export volume, quality standards, market reach, and innovation in trade practices. The judging panel particularly noted Jovian Overseas' commitment to quality assurance and its successful expansion into new international markets. 'This award is a testament to the hard work and dedication of our entire team,' said Rajiv Sharma, CEO of Jovian Overseas, who accepted the award at the ceremony. 'We remain committed to connecting Indian farmers with global markets and delivering premium agricultural products to customers worldwide.' This recognition follows several other accolades received by the company in recent years, including certifications for quality management and food safety systems.",
    tags: ["Award", "Recognition", "Export Excellence"],
  },
  {
    title: "Jovian Overseas Hosts International Buyers Meet in Mumbai",
    category: "Events",
    date: "February 20, 2024",
    author: "Events Team",
    image:
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=800",
    summary:
      "Over 100 international buyers from 25 countries attended Jovian Overseas' annual Buyers Meet in Mumbai to explore new trade opportunities and product offerings.",
    content:
      "Jovian Overseas successfully hosted its annual International Buyers Meet in Mumbai last week, bringing together over 100 buyers from 25 countries to explore new trade opportunities and product offerings. The three-day event featured product showcases, quality testing demonstrations, and networking sessions designed to strengthen existing relationships and forge new business connections. Attendees included representatives from major food processing companies, retail chains, and distribution networks from across Europe, Middle East, Southeast Asia, and North America. The event highlighted Jovian Overseas' expanded product range, including newly introduced organic and specialty products. 'This annual gathering has become an essential platform for us to connect directly with our global customers,' said Meera Singh, Director of International Sales at Jovian Overseas. 'The face-to-face interactions help us better understand market needs and tailor our offerings accordingly.' The event also included field visits to farming regions and processing facilities, giving buyers firsthand insight into the company's quality control processes and supply chain management. Several new contracts and memorandums of understanding were signed during the event, with projected business value exceeding $20 million.",
    tags: ["Event", "Buyers Meet", "Networking"],
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4">
              Latest Updates
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              News & Announcements
            </h1>
            <p className="text-lg text-green-700/80 max-w-3xl mx-auto">
              Stay updated with the latest developments, achievements, and
              initiatives at Jovian Overseas
            </p>
          </div>

          {/* Featured News */}
          <div className="mb-16">
            <Card className="overflow-hidden border-green-200 shadow-md">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-3">
                      {newsArticles[0].category}
                    </Badge>
                    <h2 className="text-2xl font-bold text-green-800 mb-4">
                      {newsArticles[0].title}
                    </h2>
                    <p className="text-green-700/80 mb-4">
                      {newsArticles[0].summary}
                    </p>
                    <div className="flex items-center text-green-600 text-sm mb-6">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{newsArticles[0].date}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{newsArticles[0].author}</span>
                    </div>
                  </div>
                  <Button className="self-start bg-green-600 hover:bg-green-700 text-white">
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* News Categories */}
          <div className="mb-12">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto pb-2">
                <TabsList>
                  <TabsTrigger value="all">All News</TabsTrigger>
                  <TabsTrigger value="company">Company News</TabsTrigger>
                  <TabsTrigger value="quality">
                    Quality & Compliance
                  </TabsTrigger>
                  <TabsTrigger value="sustainability">
                    Sustainability
                  </TabsTrigger>
                  <TabsTrigger value="financial">Financial News</TabsTrigger>
                  <TabsTrigger value="awards">Awards & Events</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="all"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {newsArticles.slice(1).map((article, index) => (
                  <NewsCard key={index} article={article} index={index} />
                ))}
              </TabsContent>

              <TabsContent
                value="company"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {newsArticles
                  .filter((article) => article.category === "Company News")
                  .map((article, index) => (
                    <NewsCard key={index} article={article} index={index} />
                  ))}
              </TabsContent>

              <TabsContent
                value="quality"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {newsArticles
                  .filter(
                    (article) => article.category === "Quality & Compliance",
                  )
                  .map((article, index) => (
                    <NewsCard key={index} article={article} index={index} />
                  ))}
              </TabsContent>

              <TabsContent
                value="sustainability"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {newsArticles
                  .filter((article) => article.category === "Sustainability")
                  .map((article, index) => (
                    <NewsCard key={index} article={article} index={index} />
                  ))}
              </TabsContent>

              <TabsContent
                value="financial"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {newsArticles
                  .filter((article) => article.category === "Financial News")
                  .map((article, index) => (
                    <NewsCard key={index} article={article} index={index} />
                  ))}
              </TabsContent>

              <TabsContent
                value="awards"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {newsArticles
                  .filter(
                    (article) =>
                      article.category === "Awards & Recognition" ||
                      article.category === "Events",
                  )
                  .map((article, index) => (
                    <NewsCard key={index} article={article} index={index} />
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Press Releases */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-800 mb-8">
              Press Releases
            </h2>

            <div className="space-y-4">
              {[
                {
                  title:
                    "Jovian Overseas Announces Strategic Partnership with European Retail Chain",
                  date: "May 30, 2024",
                  link: "#",
                },
                {
                  title:
                    "Jovian Overseas Completes Facility Expansion to Increase Processing Capacity",
                  date: "April 15, 2024",
                  link: "#",
                },
                {
                  title:
                    "Jovian Overseas Launches New Digital Platform for International Buyers",
                  date: "March 5, 2024",
                  link: "#",
                },
                {
                  title:
                    "Jovian Overseas Participates in Gulf Food 2024 Exhibition in Dubai",
                  date: "February 12, 2024",
                  link: "#",
                },
              ].map((release, index) => (
                <Card
                  key={index}
                  className="p-4 border-green-200 hover:border-green-500 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-green-800">
                        {release.title}
                      </h3>
                      <p className="text-sm text-green-600">{release.date}</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-green-700 hover:text-green-800 hover:bg-green-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50"
              >
                View All Press Releases
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Media Contact */}
          <div className="bg-green-50 p-8 rounded-xl border border-green-200 text-center">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Media Contact
            </h2>
            <p className="text-green-700/80 mb-2">
              For press inquiries, please contact our Corporate Communications
              team:
            </p>
            <p className="font-medium text-green-800 mb-6">
              media@jovianoverseas.com | +91 123 456 7890
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Download Media Kit
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
      <NavigationBar />
    </div>
  );
};

const NewsCard = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden border-green-200 hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              {article.category}
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-green-800 mb-3 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-green-700/80 mb-4 line-clamp-3 flex-grow">
            {article.summary}
          </p>
          <div className="flex items-center text-green-600 text-sm mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{article.date}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, i) => (
              <div key={i} className="flex items-center text-xs text-green-600">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </div>
            ))}
          </div>
          <Button
            variant="link"
            className="p-0 text-green-600 hover:text-green-700 self-start"
          >
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default News;
