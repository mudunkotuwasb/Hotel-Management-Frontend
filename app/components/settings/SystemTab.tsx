"use client";
import React, { useState } from "react";
import { Save, Database } from "lucide-react";
import { toast } from "react-toastify";

export default function SystemTab() {
  const [systemInfo, setSystemInfo] = useState({
    name: "Grand Hotel",
    address: "123 Main Street, City, State",
    phone: "+1-555-0123",
    email: "info@grandhotel.com",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  // ✅ Validate Form
  const validate = () => {
    const newErrors: any = {};
    if (!systemInfo.name.trim()) newErrors.name = "Hotel name is required";
    if (!systemInfo.address.trim()) newErrors.address = "Address is required";
    if (!systemInfo.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?\d[\d\s-]+$/.test(systemInfo.phone))
      newErrors.phone = "Invalid phone number";
    if (!systemInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(systemInfo.email))
      newErrors.email = "Invalid email format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      toast.success("✅ System information saved successfully!");
    } else {
      toast.error("❌ Please fix the errors before saving.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setSystemInfo({ ...systemInfo, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" }); // clear error on change
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          System Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <input
              type="text"
              value={systemInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Hotel Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              value={systemInfo.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              value={systemInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              value={systemInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="btn btn-primary justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group"
          >
            <Save className="h-4 w-4 mr-2" /> Save Settings
          </button>
        </div>
      </form>

      {/* Data Management */}
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
