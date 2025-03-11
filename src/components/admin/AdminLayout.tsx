import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  Image,
  FileText,
  FileUp,
  Link,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if admin is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminLoginTime");
    navigate("/admin");
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: Image,
      label: "Media & Products",
      path: "/admin/media",
    },
    {
      icon: FileText,
      label: "Content Pages",
      path: "/admin/content",
    },
    {
      icon: FileUp,
      label: "Catalogs",
      path: "/admin/catalogs",
    },
    {
      icon: Link,
      label: "Social Links",
      path: "/admin/social",
    },
    {
      icon: Mail,
      label: "Email Templates",
      path: "/admin/emails",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-green-800 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-lg">Jovian Admin</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-800 text-white">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-white hover:bg-green-700"
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-green-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-green-800 text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="font-bold text-lg">Jovian Admin</div>
          ) : (
            <div className="font-bold text-lg mx-auto">JO</div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:text-green-300"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
            />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-white hover:bg-green-700 ${!isSidebarOpen ? "px-2" : ""}`}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon
                      className={`h-5 w-5 ${isSidebarOpen ? "mr-2" : "mx-auto"}`}
                    />
                    {isSidebarOpen && item.label}
                  </Button>
                </TooltipTrigger>
                {!isSidebarOpen && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        <div className="p-4 border-t border-green-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-green-700 ${!isSidebarOpen ? "px-2" : ""}`}
              >
                <LogOut
                  className={`h-5 w-5 ${isSidebarOpen ? "mr-2" : "mx-auto"}`}
                />
                {isSidebarOpen && "Logout"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleLogout}>
                Confirm Logout
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open("/", "_blank")}>
                View Website
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
