import React from "react";

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active ? "bg-[#2E5C47] text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

export default SidebarItem;
