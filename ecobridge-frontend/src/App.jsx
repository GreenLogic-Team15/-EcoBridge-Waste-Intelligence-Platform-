import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const Onboarding = lazy(() => import("./pages/auth/Onboarding"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignupAdmin = lazy(() => import("./pages/auth/SignupAdmin"));
const SignupPartner = lazy(() => import("./pages/auth/SignupPartner"));
const SignupBusiness = lazy(() => import("./pages/auth/SignupBusiness"));

const PartnerHomepage = lazy(() => import("./pages/dashboards/PartnerHomepage"));
const AdminDashboard = lazy(() => import("./pages/dashboards/AdminDashboard"));
const Notifications = lazy(() => import("./pages/dashboards/Notifications"));
const WasteLogging = lazy(() => import("./pages/dashboards/WasteLogging"));
const ConfirmationPage = lazy(
  () => import("./pages/dashboards/ConfirmationPage"),
);
const PickupRequests = lazy(() => import("./pages/dashboards/PickupRequests"));
const RequestPickup = lazy(() => import("./pages/dashboards/RequestPickup"));
const History = lazy(() => import("./pages/History"));
const Settings = lazy(() => import("./pages/Setting"));
const Messages = lazy(() => import("./pages/messages/Messages"));

function AppFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-sm text-gray-600">Loading…</div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

function AppContent() {
  return (
    <Suspense fallback={<AppFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-admin" element={<SignupAdmin />} />
        <Route path="/signup-partner" element={<SignupPartner />} />
        <Route path="/signup-business" element={<SignupBusiness />} />

        {/* Protected Routes */}
        <Route
          path="/partner-homepage"
          element={
            <ProtectedRoute>
              <PartnerHomepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waste-logging"
          element={
            <ProtectedRoute>
              <WasteLogging />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <ConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pickup-requests"
          element={
            <ProtectedRoute>
              <PickupRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-pickup"
          element={
            <ProtectedRoute>
              <RequestPickup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages/*"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return <AppContent />;
}

export default App;
