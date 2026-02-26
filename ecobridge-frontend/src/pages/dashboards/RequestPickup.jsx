import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Calendar, ChevronDown, ArrowRight } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";

const RequestPickup = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [formData, setFormData] = useState({
    wasteCategory: "",
    quantity: "",
    source: "",
    dateTime: "",
    location: "",
  });

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessOverlay(true);
  };

  const handleOk = () => {
    setShowSuccessOverlay(false);
    //  const dashboardPath =
    //    userType === "partner"
    //      ? "/partner-homepage"
    //      : userType === "business"
    //        ? "/pickup-requests"
    //        : "/admin-dashboard";
    //  navigate(dashboardPath);
    navigate("/pickup-requests");
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Success Overlay
  if (showSuccessOverlay) {
    return (
      <div className="flex min-h-screen bg-[#F5F7F6]">
        <Sidebar userType={userType || "business"} />

        {/* Success Overlay */}
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
              Your request has been successfully submitted. To track status of
              request check the Pick-up Request Page.
            </p>
            <button
              onClick={handleOk}
              className="px-8 py-2 bg-[#4A7C59] text-white text-sm rounded hover:bg-[#3d6649] transition-colors"
            >
              OK
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

      {/* Main Content */}
      <div className="flex-1 ml-56 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Request a Pickup
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Waste Category */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Waste Category
                </label>
                <div className="relative">
                  <select
                    value={formData.wasteCategory}
                    onChange={(e) =>
                      handleChange("wasteCategory", e.target.value)
                    }
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                  >
                    <option value=""></option>
                    <option value="organic">Organic</option>
                    <option value="plastic">Plastic</option>
                    <option value="metal">Metal</option>
                    <option value="paper">Paper</option>
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
                    <option value=""></option>
                    <option value="restaurant">Restaurant</option>
                    <option value="hotel">Hotel</option>
                    <option value="office">Office</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Upload Image */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Upload Image
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    onClick={triggerFileInput}
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm focus:outline-none cursor-pointer"
                  />
                  <Camera className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E5C47]" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
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
                  Pickup Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E5C47]" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-12 py-3 bg-[#6B9080] text-white text-sm font-medium rounded-lg hover:bg-[#5a7a6d] transition-colors"
              >
                Submit Request
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestPickup;
