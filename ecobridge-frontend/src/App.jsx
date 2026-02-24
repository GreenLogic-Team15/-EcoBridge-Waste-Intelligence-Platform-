import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// Auth Pages
import Onboarding from "./pages/auth/Onboarding";
import Login from "./pages/auth/Login";
import SignupAdmin from "./pages/auth/SignupAdmin";
import SignupPartner from "./pages/auth/SignupPartner";
import SignupBusiness from "./pages/auth/SignupBusiness";

// Dashboard Pages
import PartnerHomepage from "./pages/dashboards/PartnerHomepage.jsx";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import WasteLogging from "./pages/dashboards/WasteLogging";
import ConfirmationPage from "./pages/dashboards/ConfirmationPage";
import PickupRequests from "./pages/PickupRequests";
import Notifications from "./pages/Notifications";

function AppContent() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("partner");

  // Handle login/signup success
  const handleAuthSuccess = (type) => {
    setUserType(type);
    setIsAuthenticated(true);

    // Redirect based on user type
    if (type === "partner") {
      navigate("/partner-dashboard");
    } else if (type === "admin") {
      navigate("/admin-dashboard");
    } else if (type === "business") {
      navigate("/business-dashboard");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType("");
    navigate("/");
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Onboarding />} />
      <Route
        path="/login"
        element={<Login onLogin={() => handleAuthSuccess("partner")} />}
      />
      <Route
        path="/signup-admin"
        element={<SignupAdmin onLogin={() => handleAuthSuccess("admin")} />}
      />
      <Route
        path="/signup-partner"
        element={<SignupPartner onLogin={() => handleAuthSuccess("partner")} />}
      />
      <Route
        path="/signup-business"
        element={
          <SignupBusiness onLogin={() => handleAuthSuccess("business")} />
        }
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/partner-dashboard"
        element={
          isAuthenticated && userType === "partner" ? (
            <PartnerHomepage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          isAuthenticated && userType === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
