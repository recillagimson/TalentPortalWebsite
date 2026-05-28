import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./routes/Home";
import Features from "./routes/Features";
import Pricing from "./routes/Pricing";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
