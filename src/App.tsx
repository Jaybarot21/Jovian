import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import TermsConditions from "./components/TermsConditions";
import PaymentTerms from "./components/PaymentTerms";
import Careers from "./components/Careers";
import News from "./components/News";
import FormsPage from "./components/FormsPage";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import MediaProducts from "./components/admin/MediaProducts";
import ContentPages from "./components/admin/ContentPages";
import Catalogs from "./components/admin/Catalogs";
import SocialLinks from "./components/admin/SocialLinks";
import EmailTemplates from "./components/admin/EmailTemplates";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-green-700 font-medium">Loading...</p>
        </div>
      }
    >
      <>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/payment-terms" element={<PaymentTerms />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/news" element={<News />} />
          <Route path="/forms" element={<FormsPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="media" element={<MediaProducts />} />
            <Route path="content" element={<ContentPages />} />
            <Route path="catalogs" element={<Catalogs />} />
            <Route path="social" element={<SocialLinks />} />
            <Route path="emails" element={<EmailTemplates />} />
          </Route>

          {/* Add a catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
