"use client";
import React from "react";
import { Save, Database } from "lucide-react";

export default function SystemTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          System Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <input
            type="text"
            defaultValue="Grand Hotel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            defaultValue="123 Main Street, City, State"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="tel"
            defaultValue="+1-555-0123"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="email"
            defaultValue="info@grandhotel.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-6">
          <button className="btn btn-primary justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group">
            <Save className="h-4 w-4 mr-2" /> Save Settings
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Data Management
        </h3>
        {["Export Data", "Backup Database"].map((label) => (
          <div
            key={label}
            className="flex items-center justify-between p-4 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900">{label}</h4>
              <p className="text-sm text-gray-500">
                Perform {label.toLowerCase()} operation
              </p>
            </div>
            <button className="btn btn-primary justify-center flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition group">
              <Database className="h-4 w-4 mr-2" /> {label.split(" ")[0]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
