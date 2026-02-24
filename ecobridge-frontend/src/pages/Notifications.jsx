import React from "react";
import { Bell, CheckCircle } from "lucide-react";
import { NOTIFICATIONS } from "../data/mockData";

const Notifications = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-500">
          Stay updated with your waste management activities.
        </p>
      </div>

      <div className="space-y-4">
        {NOTIFICATIONS.map((note) => (
          <div
            key={note.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start hover:border-[#2E5C47]/30 transition-colors cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                note.type === "info"
                  ? "bg-blue-50 text-blue-600"
                  : note.type === "warning"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-green-50 text-green-600"
              }`}
            >
              {note.type === "info" && <Bell className="w-6 h-6" />}
              {note.type === "warning" && <CheckCircle className="w-6 h-6" />}
              {note.type === "success" && <CheckCircle className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{note.title}</h3>
                <span className="text-xs text-gray-400">{note.time}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{note.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
