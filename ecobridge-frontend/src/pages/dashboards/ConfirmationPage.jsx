import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  History,
  Truck,
  CheckCircle,
  Check,
} from "lucide-react";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "log_waste", label: "Log waste", icon: LogOut },
    { id: "pickup_requests", label: "Pickup requests", icon: Truck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogAnother = () => {
    navigate("/waste-logging");
  };

  const handleRequestPickup = () => {
    navigate("/request-pickup");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-56 bg-[#E8F5E9] flex flex-col fixed left-0 top-0 h-screen">
        <nav className="flex-1 px-3 py-6 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-gray-600 hover:bg-[#D1E7DD] transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Sarah Anthony"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
              Sarah Anthony
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-56 p-8">
        {/* Success Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Waste Logged Successfully!
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-11">
            Your waste log has been recorded successfully. Here is a summary of
            the information and recommendation for proper disposal
          </p>
        </div>

        {/* Waste Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Waste Summary
          </h3>

          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h4 className="font-semibold text-gray-900 mb-1">Organic Waste</h4>
            <p className="text-xs text-gray-500 mb-4">Orange peels</p>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Quantity</p>
                <p className="text-sm font-semibold text-gray-900">50 Kg</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Condition</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-gray-900">Fresh</p>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Pickup Address</p>
                <p className="text-sm font-semibold text-gray-900">
                  123 Yale Street, Guzape, Abuja
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Result */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            AI Analysis Result
          </h3>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Waste Classification</p>
            <p className="text-sm text-gray-700 mb-3">
              Low-Protein Organics Suitable for Composting or Animal Feed
            </p>

            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">Cleanly Seperated</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">
              No contaminants detected, the waste can be easily composted or
              used as animal feed
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            Recommendations
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            This waste is best suited for the following
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-lg p-4 flex gap-3">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=60&h=60"
                alt="Composting"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Composting for soil enrichment
                </h4>
                <p className="text-[10px] text-gray-500">
                  Can request pickup from partners like EcoFarms and Balon gims
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-4 flex gap-3">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=60&h=60"
                alt="Animal feed"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Animal feed usage
                </h4>
                <p className="text-[10px] text-gray-500">
                  Can request pickup from partners like EcoFarms and Balon gims
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleLogAnother}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
          >
            Log Another Waste
          </button>
          <button
            onClick={handleRequestPickup}
            className="px-6 py-2.5 bg-[#4A7C59] text-white text-sm rounded-lg hover:bg-[#3d6649]"
          >
            Request Waste Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
