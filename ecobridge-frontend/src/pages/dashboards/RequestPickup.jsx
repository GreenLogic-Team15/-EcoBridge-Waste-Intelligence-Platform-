import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Camera,
  MapPin,
  Calendar,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/apiClient";
import { WASTE_CATEGORIES, WASTE_SOURCES } from "../../constants/wasteOptions";

const RequestPickup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = useAuth();

  // ✅ FIX 1: Pull wasteData AND wasteLogId from navigation state.
  // ConfirmationPage passes { wasteData } where wasteData is the full saved waste object.
  // The wasteLogId is wasteData._id — we extract it here.
  const { wasteData } = location.state || {};
  const wasteLogId = wasteData?._id || wasteData?.id || null;

  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    wasteCategory: "",
    quantity: "",
    source: "",
    dateTime: "",
    location: "",
    notes: "",
  });

  // ✅ FIX 2: Auto-fill the form from the logged waste data
  useEffect(() => {
    if (wasteData) {
      setFormData((prev) => ({
        ...prev,
        wasteCategory: wasteData.wasteCategory || wasteData.category || "",
        quantity: String(wasteData.quantity ?? ""),
        location: wasteData.pickupAddress || wasteData.location || "",
        // Pre-fill pickup date from available date if set
        dateTime: wasteData.availableDate
          ? `${wasteData.availableDate}T${wasteData.availableTime || "12:00"}`
          : "",
      }));
    }
  }, [wasteData]);

  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // ✅ FIX 3: THE MAIN FIX — actually call the backend instead of just showing the overlay
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Basic validation
    if (!formData.wasteCategory) {
      setSubmitError("Please select a waste category.");
      return;
    }
    if (!formData.location) {
      setSubmitError("Please enter a pickup location.");
      return;
    }

    setSubmitLoading(true);

    try {
      // Build the request body
      // We send wasteLogId so the backend can link this pickup to the waste log
      const body = {
        wasteCategory: formData.wasteCategory,
        quantity: Number(formData.quantity) || 0,
        source: formData.source,
        pickupAddress: formData.location,
        pickupDate: formData.dateTime || null,
        notes: formData.notes || "",
      };

      // ✅ FIX 4: Only add wasteLogId if we actually have it
      // This links the pickup request to the original waste log
      if (wasteLogId) {
        body.wasteLogId = wasteLogId;
      }

      // ✅ If image was added, use FormData instead of JSON
      if (imageFile) {
        const fd = new FormData();
        Object.entries(body).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== "")
            fd.append(k, String(v));
        });
        fd.append("image", imageFile);
        await api.post("/api/pickups", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/pickups", body);
      }

      // ✅ FIX 5: Now we show the success overlay ONLY after the API call succeeds
      setShowSuccessOverlay(true);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Unable to submit pickup request. Please try again.",
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleOk = () => {
    setShowSuccessOverlay(false);
    navigate("/pickup-requests");
  };

  // Success Overlay
  if (showSuccessOverlay) {
    return (
      <div className="flex min-h-screen bg-[#F5F7F6]">
        <Sidebar userType={userType || "business"} />
        <div className="flex-1 ml-56 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <div className="w-12 h-12 bg-[#7CB87C] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Request Submitted Successfully
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Your request has been saved. You can track its status on the
              Pickup Requests page.
            </p>
            <button
              onClick={handleOk}
              className="px-8 py-2 bg-[#4A7C59] text-white text-sm rounded hover:bg-[#3d6649] transition-colors"
            >
              View My Requests
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Form
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar userType={userType || "business"} />

      <div className="flex-1 ml-56 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Request a Pickup
          </h1>

          {/* ✅ FIX 6: Show a clear message if we have a linked waste log */}
          {wasteLogId ? (
            <p className="text-center text-xs text-green-600 mb-6">
              Linked to waste log — fields are pre-filled from your logged
              waste.
            </p>
          ) : (
            <p className="text-center text-xs text-gray-500 mb-6">
              Fill in the details below to request a pickup.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Waste Category */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Waste Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.wasteCategory}
                    onChange={(e) =>
                      handleChange("wasteCategory", e.target.value)
                    }
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    required
                  >
                    <option value="">Select category</option>
                    {WASTE_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Quantity (Kg)
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                />
              </div>

              {/* Source */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Source
                </label>
                <div className="relative">
                  <select
                    value={formData.source}
                    onChange={(e) => handleChange("source", e.target.value)}
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                  >
                    <option value="">Select source</option>
                    {(WASTE_SOURCES || []).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Upload Image */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Upload Image (optional)
                </label>
                <div
                  className="relative cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <div className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm text-gray-400 flex items-center justify-between">
                    <span>
                      {imageFile ? imageFile.name : "Click to add photo"}
                    </span>
                    <Camera className="w-4 h-4 text-[#2E5C47]" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-full h-24 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Pickup date & time */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Pickup date & time
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={(e) => handleChange("dateTime", e.target.value)}
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="Enter pickup address"
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    required
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E5C47]" />
                </div>
              </div>
            </div>

            {/* Notes (full width) */}
            <div>
              <label className="block text-xs text-gray-600 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Any special instructions for the pickup partner..."
                rows={2}
                className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20 resize-none"
              />
            </div>

            {/* Error message */}
            {submitError && (
              <p className="text-sm text-red-600 text-center" role="alert">
                {submitError}
              </p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={submitLoading}
                className="flex items-center gap-2 px-12 py-3 bg-[#6B9080] text-white text-sm font-medium rounded-lg hover:bg-[#5a7a6d] transition-colors disabled:opacity-60"
              >
                {submitLoading ? "Submitting…" : "Submit Request"}
                {!submitLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestPickup;
