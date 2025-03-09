import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import TermsConditions from "./components/TermsConditions";
import PaymentTerms from "./components/PaymentTerms";
import Careers from "./components/Careers";
import News from "./components/News";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/payment-terms" element={<PaymentTerms />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/news" element={<News />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
