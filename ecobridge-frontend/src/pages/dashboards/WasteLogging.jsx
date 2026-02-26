import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Camera, Calendar, Clock, ChevronDown } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/apiClient";
import { WASTE_CATEGORIES } from "../../constants/wasteOptions";

const WasteLogging = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [showAIAlert, setShowAIAlert] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    wasteCategory: "",
    quantity: "50",
    unit: "KG",
    condition: "",
    pickupAddress: "123 Yale Street, Guzape, Abuja",
    availableDate: "2026-02-15",
    availableTime: "12:00",
    urgency: "Normal",
    mediaUpload: "public",
    price: "",
  });

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Trigger camera input click
  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setShowAIAlert(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryAgain = () => {
    setShowAIAlert(false);
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleConfirm = () => {
    setShowAIAlert(false);
    // Keep user on this page so they can submit with detected values.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    setAiAnalysis(null);
    setSubmitLoading(true);

    api
      .post("/api/waste", {
        wasteCategory: formData.wasteCategory,
        quantity: Number(formData.quantity || 0),
        pickupAddress: formData.pickupAddress,
        availableDate: formData.availableDate,
        availableTime: formData.availableTime,
        description: formData.description,
        wasteCondition: formData.condition
          ? formData.condition[0].toUpperCase() + formData.condition.slice(1)
          : undefined,
        urgency: formData.urgency,
        price: formData.price ? Number(formData.price) : undefined,
      })
      .then((res) => {
        const analysis = res.data?.aiAnalysis || null;
        setAiAnalysis(analysis);
      })
      .catch((err) => {
        setSubmitError(
          err.response?.data?.message ||
            "Unable to submit waste log. Please try again.",
        );
      })
      .finally(() => setSubmitLoading(false));
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // AI Alert Overlay
  if (showAIAlert) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar userType={userType || "business"} />

        {/* Main Content with AI Alert Overlay */}
        <div className="flex-1 ml-56 relative">
          <div className="absolute inset-0 bg-black/30 z-10"></div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4">
              <h3 className="text-blue-500 font-medium mb-4">AI Alert</h3>

              <div className="flex gap-4 mb-4">
                <img
                  src={uploadedImage}
                  alt="Detected waste"
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-500">⚠️</span>
                    <span className="text-xs text-gray-500">Detected</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Plastic
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">Confidence: 97%</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleTryAgain}
                      className="px-4 py-2 text-xs border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Try again
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="px-4 py-2 text-xs bg-[#4A7C59] text-white rounded hover:bg-[#3d6649]"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 opacity-50 pointer-events-none">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                  Login New Waste
                </h1>
                <p className="text-sm text-gray-500">
                  Enter waste details so partners can request pickup or purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Waste Logging Form
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar userType={userType || "business"} />

      {/* Main Content */}
      <div className="flex-1 ml-56 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Login New Waste
            </h1>
            <p className="text-sm text-gray-500">
              Enter waste details so partners can request pickup or purchase
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            15 February 2026
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Upload
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                {uploadedImage ? (
                  <div className="mb-4">
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="w-32 h-32 mx-auto rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-gray-400 mb-4">
                      Upload an image to auto-classify waste
                    </p>
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-gray-300" />
                    </div>
                  </>
                )}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="flex items-center gap-2 text-sm text-[#2E5C47] hover:underline"
                  >
                    <Upload className="w-4 h-4" />
                    Choose file
                  </button>
                  <button
                    type="button"
                    onClick={triggerCameraInput}
                    className="flex items-center gap-2 text-sm text-[#2E5C47] hover:underline"
                  >
                    <Camera className="w-4 h-4" />
                    Take a photo
                  </button>
                </div>
                {/* Hidden file inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-[#4A7C59] text-white text-sm rounded hover:bg-[#3d6649]"
                >
                  <Upload className="w-4 h-4" />
                  Upload image
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe waste...&#10;e.g. leftover rice, vegetable peels"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
              />
              <div className="text-right text-xs text-gray-400 mt-1">0/200</div>
            </div>

            {/* Waste Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Waste Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1.5">
                    Waste Category
                  </label>
                  <div className="relative">
                    <select
                      value={formData.wasteCategory}
                      onChange={(e) =>
                        handleChange("wasteCategory", e.target.value)
                      }
                      className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    >
                      <option value="">Select Category</option>
                      {WASTE_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1.5">
                    Quantity
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                      className="w-24 bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) => handleChange("unit", e.target.value)}
                      className="w-20 bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    >
                      <option>KG</option>
                      <option>L</option>
                      <option>units</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Waste condition
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="wasteCondition"
                        checked={formData.condition === "fresh"}
                        onChange={() => handleChange("condition", "fresh")}
                        className="w-4 h-4 rounded border-gray-300 text-[#2E5C47] focus:ring-[#2E5C47]"
                      />
                      <span className="text-sm text-gray-600">Fresh</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="wasteCondition"
                        checked={formData.condition === "stored"}
                        onChange={() => handleChange("condition", "stored")}
                        className="w-4 h-4 rounded border-gray-300 text-[#2E5C47] focus:ring-[#2E5C47]"
                      />
                      <span className="text-sm text-gray-600">stored</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Location */}
          <div className="w-80">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Location
              </h3>

              {/* Pickup address */}
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1.5">
                  Pickup address
                </label>
                <div className="relative">
                  <select
                    value={formData.pickupAddress}
                    onChange={(e) =>
                      handleChange("pickupAddress", e.target.value)
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                  >
                    <option>123 Yale Street, Guzape, Abuja</option>
                    <option>456 Main Road, Wuse, Abuja</option>
                    <option>789 Central Ave, Garki, Abuja</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Availability and Timing */}
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-3">
                  Availability and Timing
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">
                      Available from
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.availableDate}
                        onChange={(e) =>
                          handleChange("availableDate", e.target.value)
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">
                      Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={formData.availableTime}
                        onChange={(e) =>
                          handleChange("availableTime", e.target.value)
                        }
                        className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Urgency radio buttons */}
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      checked={formData.urgency === "Normal"}
                      onChange={() => handleChange("urgency", "Normal")}
                      className="w-4 h-4 text-[#2E5C47] focus:ring-[#2E5C47]"
                    />
                    <span className="text-sm text-gray-600">Normal</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      checked={formData.urgency === "Urgent"}
                      onChange={() => handleChange("urgency", "Urgent")}
                      className="w-4 h-4 text-[#2E5C47] focus:ring-[#2E5C47]"
                    />
                    <span className="text-sm text-gray-600">Urgent</span>
                  </label>
                </div>
              </div>

              {/* Media upload */}
              <div className="mb-6">
                <label className="block text-xs text-gray-600 mb-2">
                  Media upload
                </label>
                <div className="space-y-2 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mediaUpload"
                      checked={formData.mediaUpload === "public"}
                      onChange={() => handleChange("mediaUpload", "public")}
                      className="w-4 h-4 text-[#2E5C47] focus:ring-[#2E5C47]"
                    />
                    <span className="text-sm text-gray-600">
                      Public to all partners
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mediaUpload"
                      checked={formData.mediaUpload === "verified"}
                      onChange={() => handleChange("mediaUpload", "verified")}
                      className="w-4 h-4 text-[#2E5C47] focus:ring-[#2E5C47]"
                    />
                    <span className="text-sm text-gray-600">
                      Only to verified users
                    </span>
                  </label>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <label className="block text-xs text-gray-600 mb-1.5">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    ₦
                  </span>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="Enter price or leave blank if negotiable"
                    className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons - Fixed spacing */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={submitLoading}
                className="flex-1 px-4 py-2.5 bg-[#4A7C59] text-white text-sm rounded-lg hover:bg-[#3d6649]"
              >
                {submitLoading ? "Submitting…" : "Submit waste log"}
              </button>
            </div>

            {submitError && (
              <p className="text-sm text-red-600 mt-3" role="alert">
                {submitError}
              </p>
            )}

            {aiAnalysis && (
              <div className="mt-4 bg-[#E8F5E9] rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  AI Analysis
                </p>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Category:</span>{" "}
                    {aiAnalysis.classification || aiAnalysis.category || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Contamination risk:</span>{" "}
                    {aiAnalysis.contaminationRisk || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Recommendation:</span>{" "}
                    {aiAnalysis.recommendation ||
                      aiAnalysis.recoveryRecommendation ||
                      "-"}
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => navigate("/confirmation")}
                    className="px-4 py-2 bg-[#4A7C59] text-white text-sm rounded hover:bg-[#3d6649]"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WasteLogging;
