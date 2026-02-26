import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/apiClient";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/api/auth/forgot-password", { email });
      setSuccess(
        "If an account exists for this email, a reset code has been sent.",
      );
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to start password reset. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Forgot password
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter your email to receive a reset code.
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

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-700" role="status">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white font-medium py-3 rounded-md transition-colors"
          >
            {loading ? "Sending…" : "Send reset code"}
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

export default ForgotPassword;

