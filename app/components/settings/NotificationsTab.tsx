"use client";
import React from "react";

export default function NotificationsTab() {
  const settings = [
    {
      label: "Email Notifications",
      desc: "Receive notifications via email",
      checked: true,
    },
    {
      label: "SMS Notifications",
      desc: "Receive notifications via SMS",
      checked: false,
    },
    {
      label: "Low Stock Alerts",
      desc: "Get notified when inventory is low",
      checked: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Notification Preferences
      </h3>
      {settings.map((item) => (
        <div key={item.label} className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={item.checked}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-full" />
          </label>
        </div>
      ))}
    </div>
  );
}
