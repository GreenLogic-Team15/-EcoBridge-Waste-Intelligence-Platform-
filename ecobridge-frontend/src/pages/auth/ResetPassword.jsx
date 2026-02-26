import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/apiClient";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const [email, setEmail] = useState(state.email || "");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/reset-password", {
        email,
        resetCode,
        newPassword,
      });
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password. Please check your code and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Reset password
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter the reset code sent to your email and choose a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#F0F5F2] border-0 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Reset code
            </label>
            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
              className="w-full bg-[#F0F5F2] border-0 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full bg-[#F0F5F2] border-0 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white font-medium py-3 rounded-md transition-colors"
          >
            {loading ? "Resetting…" : "Reset password"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-2 text-sm text-gray-600 hover:text-[#2E5C47] hover:underline"
          >
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

