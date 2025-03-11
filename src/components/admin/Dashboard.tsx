import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import {
  Image,
  FileText,
  FileUp,
  Link as LinkIcon,
  Mail,
  Users,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    products: 6,
    inquiries: 12,
    visitors: 245,
    orders: 8,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  const statCards = [
    {
      icon: Image,
      label: "Products",
      value: stats.products,
      color: "bg-blue-500",
    },
    {
      icon: Users,
      label: "Inquiries",
      value: stats.inquiries,
      color: "bg-green-500",
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      value: stats.orders,
      color: "bg-purple-500",
    },
    {
      icon: Users,
      label: "Visitors Today",
      value: stats.visitors,
      color: "bg-amber-500",
    },
  ];

  const quickLinks = [
    {
      icon: Image,
      label: "Manage Products",
      path: "/admin/media",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FileText,
      label: "Edit Terms",
      path: "/admin/content",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FileUp,
      label: "Upload Catalog",
      path: "/admin/catalogs",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: LinkIcon,
      label: "Social Links",
      path: "/admin/social",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: Mail,
      label: "Email Templates",
      path: "/admin/emails",
      color: "bg-pink-100 text-pink-600",
    },
  ];

  const recentActivities = [
    {
      action: "Product Updated",
      item: "Premium Chickpeas",
      time: "2 hours ago",
    },
    {
      action: "New Inquiry",
      item: "Product Inquiry from Global Foods Inc.",
      time: "5 hours ago",
    },
    {
      action: "Catalog Updated",
      item: "Q2 2024 Product Catalog",
      time: "Yesterday",
    },
    { action: "Terms Updated", item: "Payment Terms", time: "3 days ago" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-green-800">Admin Dashboard</h1>
          <p className="text-green-600">{formatDate(currentTime)}</p>
        </div>
        <div className="mt-4 md:mt-0 bg-white p-3 rounded-lg shadow-sm border border-green-200 flex items-center">
          <Calendar className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-800 font-medium">
            Last login:{" "}
            {new Date(
              localStorage.getItem("adminLoginTime") || new Date(),
            ).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 border-none shadow-md bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mr-4`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <Card className="p-6 border-green-200 col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.path}
                className="flex items-center p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center mr-3`}
                >
                  <link.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-gray-700">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-start p-3 rounded-lg hover:bg-gray-50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
