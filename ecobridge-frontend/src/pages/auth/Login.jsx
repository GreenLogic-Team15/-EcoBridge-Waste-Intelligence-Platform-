import React, { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/apiClient";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

// Lazy load the background image component for faster initial render
const BackgroundImage = lazy(() => import("./BackgroundImage"));

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginStep, setLoginStep] = useState(""); //  Show specific step

  const mapRoleToUserType = (role) => {
    if (!role) return null;
    const r = role.toLowerCase();
    if (r === "partner") return "partner";
    if (r === "sme" || r === "business") return "business";
    if (r === "admin") return "admin";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setLoginStep("Connecting to server...");

    try {
      setLoginStep("Authenticating...");
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data || {};
      if (!token) throw new Error("No token received");

      setLoginStep("Processing user data...");

      // Decode token to get user info
      let userData = {};
      try {
        userData = jwtDecode(token);
      } catch (e) {
        console.error("Failed to decode token", e);
      }

      const role = userData.role || userData.user?.role;
      const userType = mapRoleToUserType(role);

      setLoginStep("Setting up your dashboard...");

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userType || "");
      localStorage.setItem(
        "userName",
        userData.fullName ||
          userData.user?.fullName ||
          userData.businessName ||
          userData.user?.businessName ||
          email,
      );
      localStorage.setItem(
        "userEmail",
        userData.email || userData.user?.email || email,
      );

      // Store user ID for waste logging
      localStorage.setItem(
        "userId",
        userData.id || userData.user?.id || userData._id || userData.user?._id,
      );

      login(userType || "", token);

      const dashboardPath =
        userType === "partner"
          ? "/partner-homepage"
          : userType === "business"
            ? "/pickup-requests"
            : "/admin-dashboard";

      navigate(dashboardPath);
    } catch (err) {
      let errorMsg = "Unable to sign in. Please check your credentials.";
      if (err.code === "ECONNABORTED") {
        errorMsg = "Server is taking too long to respond. Please try again.";
      } else if (err.response?.status === 401) {
        errorMsg = "Invalid email or password.";
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
      setLoginStep("");
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT SIDE - Lazy loaded background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#2E5C47]">
        <Suspense fallback={<div className="w-full h-full bg-[#2E5C47]" />}>
          <BackgroundImage />
        </Suspense>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">EcoBridge</h1>
          </div>
          <div>
            <p className="text-lg font-medium mb-1">Track. Sort. Sustain.</p>
            <p className="text-base opacity-90">
              Smart waste logging for responsible organizations.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Hi, Welcome back!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-[#F0F5F2] border-0 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20 disabled:opacity-50"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-[#F0F5F2] border-0 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20 disabled:opacity-50"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4 rounded border-gray-300 text-[#2E5C47] focus:ring-[#2E5C47]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                disabled={loading}
                className="text-sm text-gray-500 hover:text-[#2E5C47] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 mt-2" role="alert">
                {error}
              </p>
            )}

            {/* 🆕 Better loading indicator */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white font-medium py-3 rounded-md transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{loginStep || "Signing in..."}</span>
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={loading}
                className="text-[#2E5C47] font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
