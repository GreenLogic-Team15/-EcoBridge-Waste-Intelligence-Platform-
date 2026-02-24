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
import PartnerHomepage from "./pages/dashboards/PartnerHomepage";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import Notifications from "./pages/dashboards/Notifications";
import WasteLogging from "./pages/dashboards/WasteLogging";
import ConfirmationPage from "./pages/dashboards/ConfirmationPage";
import PickupRequests from "./pages/dashboards/PickupRequests";

function AppContent() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");

  const handleAuthSuccess = (type) => {
    setUserType(type);
    setIsAuthenticated(true);

    switch (type) {
      case "partner":
        navigate("/partner-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "business":
        navigate("/waste-logging");
        break;
      default:
        navigate("/");
    }
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

      {/* Protected Routes */}
      <Route
        path="/partner-dashboard"
        element={isAuthenticated ? <PartnerHomepage /> : <Navigate to="/" />}
      />
      <Route
        path="/admin-dashboard"
        element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/notifications"
        element={isAuthenticated ? <Notifications /> : <Navigate to="/" />}
      />
      <Route
        path="/waste-logging"
        element={isAuthenticated ? <WasteLogging /> : <Navigate to="/" />}
      />
      <Route
        path="/confirmation"
        element={isAuthenticated ? <ConfirmationPage /> : <Navigate to="/" />}
      />
      <Route
        path="/pickup-requests"
        element={isAuthenticated ? <PickupRequests /> : <Navigate to="/" />}
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
