import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Certifications from "./pages/Certifications";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import QuoteModal from "./components/common/QuoteModal";

// Admin
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AdminQuotes, AdminContacts } from "./pages/admin/AdminSubmissions";

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
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          {/* ── Public routes ── */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
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

          {/* ── Admin routes ── */}
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
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
