import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Truck, ShieldCheck } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("business");

  const roles = [
    {
      id: "business",
      title: "Business owner",
      description: "Hotels, Restaurants, Catering business etc",
      details:
        "If you own a small business and are looking for the best way to manage your waste, you have found the best solution!",
      icon: Building2,
      path: "/signup-business",
    },
    {
      id: "partner",
      title: "Partner",
      description: "Collectors, Recyclers, Composters",
      details:
        "If you collect, process, or repurpose waste materials, this option helps you discover available waste, connect with businesses, and manage pickup requests efficiently.",
      icon: Truck,
      path: "/signup-partner",
    },
    {
      id: "admin",
      title: "Admin",
      description: "Platform administrator access",
      details:
        "For authorized personnel managing system operations, user activity, waste records, and platform performance to ensure smooth and secure ecosystem functionality.",
      icon: ShieldCheck,
      path: "/signup-admin",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome to Ecobridge!
        </h1>
        <p className="text-base text-gray-600">
          Track, Segregate, Recover. Turn your waste into value
        </p>
      </div>

      {/* Subheading */}
      <p className="text-sm text-gray-700 mb-8">
        Please choose what best describes you to get started!
      </p>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-8">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`
                relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "border-[#2E5C47] bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
              `}
            >
              {/* Radio Button - Top Right */}
              <div className="absolute top-4 right-4">
                <div
                  className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? "border-[#2E5C47]" : "border-gray-300"}
                `}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2E5C47]" />
                  )}
                </div>
              </div>

              {/* Icon and Title */}
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  className={`w-5 h-5 ${isSelected ? "text-[#2E5C47]" : "text-gray-500"}`}
                />
                <h3 className="font-semibold text-gray-900 text-sm">
                  {role.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mb-3">{role.description}</p>

              {/* Details */}
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                {role.details}
              </p>

              {/* Sign Up Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(role.path);
                }}
                className="w-full py-2.5 rounded-md text-sm font-medium bg-[#2E5C47] text-white hover:bg-[#234a38] transition-colors"
              >
                Sign Up
              </button>
            </div>
          );
        })}
      </div>

      {/* Sign In Link */}
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-[#2E5C47] font-medium hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default Onboarding;
