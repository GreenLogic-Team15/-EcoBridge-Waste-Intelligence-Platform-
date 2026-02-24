import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";

// Auth Pages
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import SignupAdmin from "./pages/SignupAdmin";
import SignupPartner from "./pages/SignupPartner";
import SignupBusiness from "./pages/SignupBusiness";

// Dashboard Pages
import PartnerDashboard from "./pages/PartnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import WasteLogging from "./pages/WasteLogging";
import ConfirmationPage from "./pages/ConfirmationPage";
import PickupRequests from "./pages/PickupRequests";
import Notifications from "./pages/Notifications";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("partner");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogin = (type) => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleWasteSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationContinue = () => {
    setShowConfirmation(false);
    setActiveTab("dashboard");
  };

  // Show confirmation page
  if (showConfirmation) {
    return <ConfirmationPage onContinue={handleConfirmationContinue} />;
  }

  // Not authenticated - show auth flow without sidebar
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup-admin"
          element={<SignupAdmin onLogin={() => handleLogin("admin")} />}
        />
        <Route
          path="/signup-partner"
          element={<SignupPartner onLogin={() => handleLogin("partner")} />}
        />
        <Route
          path="/signup-business"
          element={<SignupBusiness onLogin={() => handleLogin("business")} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // Authenticated - show dashboard with sidebar
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userType={userType}
      />

      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
          <span className="font-bold text-[#2E5C47]">EcoBridge</span>
        </div>

        {activeTab === "dashboard" &&
          (userType === "admin" ? <AdminDashboard /> : <PartnerDashboard />)}
        {activeTab === "log_waste" && (
          <WasteLogging onSubmit={handleWasteSubmit} />
        )}
        {activeTab === "pickup_req" && <PickupRequests />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "history" && (
          <div className="p-8">
            <h1>History Page</h1>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="p-8">
            <h1>Settings Page</h1>
          </div>
        )}
      </main>
    </div>
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
