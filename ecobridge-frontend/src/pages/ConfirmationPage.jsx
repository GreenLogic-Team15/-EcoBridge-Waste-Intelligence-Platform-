import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";

const ConfirmationPage = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Waste Logged Successfully!
        </h1>
        <p className="text-gray-500 mb-8">
          Your waste log has been recorded successfully. Here is a summary of
          the information and recommendations for proper disposal.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl text-left mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Waste Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Waste Type:</span>
              <span className="font-medium text-gray-900">Organic Waste</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Quantity:</span>
              <span className="font-medium text-gray-900">50 kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Condition:</span>
              <span className="font-medium text-gray-900">Fresh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pickup Address:</span>
              <span className="font-medium text-gray-900">123 Yola Street</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F0FDF4] p-6 rounded-xl text-left mb-8">
          <h3 className="font-semibold text-[#166534] mb-2">
            AI Analysis Result
          </h3>
          <p className="text-sm text-[#15803d] mb-2">
            <strong>Waste Classification:</strong> Low-Protein Organics Suitable
            for Composting or Animal Feed
          </p>
          <p className="text-sm text-[#15803d]">
            ✓ Odour: Negligible
            <br />✓ Calorific Value: Low
          </p>
        </div>

        <Button onClick={onContinue} className="w-full">
          Continue to Dashboard <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
