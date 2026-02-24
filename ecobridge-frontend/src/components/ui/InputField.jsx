import React from "react";

const InputField = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  className = "",
}) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 ${Icon ? "pl-10" : "pl-4"} pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20 focus:border-[#2E5C47] transition-all`}
      />
    </div>
  </div>
);

export default InputField;
