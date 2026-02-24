import React from "react";
import { MapPin, Camera } from "lucide-react";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";

const WasteLogging = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Log New Waste</h1>
        <p className="text-gray-500">
          Enter waste details so partners can request pickup or purchase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Waste Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Waste Category"
                  placeholder="Select category"
                />
                <InputField
                  label="Sub-category"
                  placeholder="Select sub-category"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Quantity (kg)"
                  type="number"
                  placeholder="0"
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Unit
                  </label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="radio"
                        name="unit"
                        className="text-[#2E5C47]"
                        defaultChecked
                      />{" "}
                      kg
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="radio"
                        name="unit"
                        className="text-[#2E5C47]"
                      />{" "}
                      Liters
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20 focus:border-[#2E5C47] transition-all min-h-[100px]"
                  placeholder="Describe the waste material..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">
              Location & Availability
            </h3>
            <div className="space-y-4">
              <InputField
                label="Pickup Address"
                placeholder="123 Main Street, Garki, Abuja"
                icon={MapPin}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Available From" type="date" />
                <InputField label="Available Until" type="date" />
              </div>
              <div className="flex gap-4 pt-2">
                <Button variant="secondary" className="flex-1">
                  Save Draft
                </Button>
                <Button className="flex-1">Submit Waste Log</Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Alert / Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">AI Detection</h3>
                <p className="text-xs text-gray-500">Confidence: 97%</p>
              </div>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=600"
                alt="Detected Waste"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                Plastic
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Our AI has detected <strong>Plastic Bottles</strong> in your
              uploaded image.
            </p>
            <Button variant="secondary" className="w-full text-sm">
              Retake Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteLogging;
