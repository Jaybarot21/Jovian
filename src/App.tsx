import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import TermsConditions from "./components/TermsConditions";
import PaymentTerms from "./components/PaymentTerms";
import Careers from "./components/Careers";
import News from "./components/News";
import FormsPage from "./components/FormsPage";
import ProductCatalog from "./components/ProductCatalog";
import AboutUsPage from "./components/AboutUsPage";
import AdminPanel from "./components/admin/AdminPanel";
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/payment-terms" element={<PaymentTerms />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/news" element={<News />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
