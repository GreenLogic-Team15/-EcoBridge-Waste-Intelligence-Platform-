import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/apiClient";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { token, role } = response.data || {};
      const userType = mapRoleToUserType(role);
      login(userType || "", token);

      const dashboardPath =
        userType === "partner"
          ? "/partner-homepage"
          : userType === "business"
            ? "/pickup-requests"
            : "/admin-dashboard";

      navigate(dashboardPath);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to sign in. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT SIDE - Background Image with Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <img
          src="/images/auth-bg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#2E5C47]/80"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
          {/* Top - Logo */}
          <div>
            <h1 className="text-5xl font-bold tracking-tight">EcoBridge</h1>
          </div>

          {/* Bottom - Tagline */}
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
          {/* Title */}
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
                className="w-full bg-[#F0F5F2] border-0 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                placeholder=""
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
                className="w-full bg-[#F0F5F2] border-0 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                placeholder=""
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#2E5C47] focus:ring-[#2E5C47]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white font-medium py-3 rounded-md transition-colors mt-2"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">Or</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                <svg
                  className="w-5 h-5 text-[#1877F2]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-1.932 0-2.643.738-2.643 2.632v1.34h3.837l-.532 3.667h-3.305v7.98H9.101z" />
                </svg>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/")}
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
