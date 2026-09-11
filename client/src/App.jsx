import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { usePrefetchLocations } from "./services/api";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Certifications from "./pages/Certifications";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy";
import ProductDetail from "./pages/ProductDetail";
import CityPage from "./pages/CityPage";
import CityProductPage from "./pages/CityProductPage";
import Sitemap from "./pages/Sitemap";
import NotFound from "./components/common/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import QuoteModal from "./components/common/QuoteModal";

// Admin
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AdminQuotes, AdminContacts } from "./pages/admin/AdminSubmissions";
import AdminLocations from "./pages/admin/AdminLocations";

// Layout wrapper for public pages (includes Navbar + Footer)
const PublicLayout = ({ children }) => (
  <div className="min-h-screen bg-white font-sans flex flex-col relative">
    <Navbar />
    <div className="flex-grow flex flex-col">{children}</div>
    <Footer />
    <QuoteModal />
  </div>
);

function App() {
  const prefetchLocations = usePrefetchLocations();

  useEffect(() => {
    // Non-blocking background warmup for 0ms loads everywhere
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => prefetchLocations());
    } else {
      setTimeout(() => prefetchLocations(), 300);
    }
  }, [prefetchLocations]);

  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public Static Pages ── */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/sitemap"
            element={
              <PublicLayout>
                <Sitemap />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutUs />
              </PublicLayout>
            }
          />
          <Route
            path="/certifications"
            element={
              <PublicLayout>
                <Certifications />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactUs />
              </PublicLayout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PublicLayout>
                <PrivacyPolicy />
              </PublicLayout>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <PublicLayout>
                <TermsConditions />
              </PublicLayout>
            }
          />
          <Route
            path="/shipping-policy"
            element={
              <PublicLayout>
                <ShippingPolicy />
              </PublicLayout>
            }
          />
          <Route
            path="/products/:slug"
            element={
              <PublicLayout>
                <ProductDetail />
              </PublicLayout>
            }
          />

          {/* ── Dynamic Programmatic City + Product Route ── */}
          <Route
            path="/:locationSlug/:productSlug"
            element={
              <PublicLayout>
                <CityProductPage />
              </PublicLayout>
            }
          />

          {/* ── Dynamic Programmatic City Route ── */}
          <Route
            path="/:locationSlug"
            element={
              <PublicLayout>
                <CityPage />
              </PublicLayout>
            }
          />

          {/* ── Admin Routes ── */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/locations"
            element={
              <AdminProtectedRoute>
                <AdminLocations />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/quotes"
            element={
              <AdminProtectedRoute>
                <AdminQuotes />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <AdminProtectedRoute>
                <AdminContacts />
              </AdminProtectedRoute>
            }
          />

          {/* ── 404 Catch-All ── */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <NotFound />
              </PublicLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;
