"use client";
import React, { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "react-toastify";

export default function ProfileTab() {
  // Profile Info State
  const [profile, setProfile] = useState({
    fullName: "Admin User",
    email: "admin@hotel.com",
    phone: "+1-555-0123",
    role: "admin",
  });
  const [profileErrors, setProfileErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Password State
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });

  // ✅ Validate Profile Fields
  const validateProfile = () => {
    const errors: any = {};
    if (!profile.fullName.trim()) errors.fullName = "Full name is required";
    if (!profile.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))
      errors.email = "Invalid email format";
    if (!profile.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?\d[\d\s-]+$/.test(profile.phone))
      errors.phone = "Invalid phone number";
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ✅ Validate Password Fields
  const validatePasswords = () => {
    const errors: any = {};
    if (!passwords.current.trim())
      errors.current = "Current password is required";
    if (!passwords.newPass.trim()) errors.newPass = "New password is required";
    else if (passwords.newPass.length < 6)
      errors.newPass = "Password must be at least 6 characters";
    if (!passwords.confirmPass.trim())
      errors.confirmPass = "Please confirm your new password";
    else if (passwords.newPass !== passwords.confirmPass)
      errors.confirmPass = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ✅ Handle Profile Submit
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateProfile()) {
      toast.success("✅ Profile updated successfully!");
    } else {
      toast.error("❌ Please fix the errors before saving.");
    }
  };

  // ✅ Handle Password Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswords()) {
      toast.success("🔒 Password updated successfully!");
      setPasswords({ current: "", newPass: "", confirmPass: "" });
    } else {
      toast.error("❌ Please fix the errors before updating.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <form
        onSubmit={handleProfileSubmit}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Profile Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              className={`w-full border ${
                profileErrors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                profileErrors.fullName
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {profileErrors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {profileErrors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className={`w-full border ${
                profileErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                profileErrors.email
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {profileErrors.email && (
              <p className="text-red-500 text-xs mt-1">{profileErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className={`w-full border ${
                profileErrors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                profileErrors.phone
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {profileErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{profileErrors.phone}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={profile.role}
              disabled
              className="w-full border border-gray-300 bg-gray-100 cursor-not-allowed rounded-lg px-3 py-2 text-gray-700"
            >
              <option value="admin">Administrator</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="btn btn-primary justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>

      {/* Change Password */}
      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Change Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Current Password */}
          <div>
            <input
              type="password"
              placeholder="Current Password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              className={`w-full border ${
                passwordErrors.current ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                passwordErrors.current
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {passwordErrors.current && (
              <p className="text-red-500 text-xs mt-1">
                {passwordErrors.current}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={passwords.newPass}
              onChange={(e) =>
                setPasswords({ ...passwords, newPass: e.target.value })
              }
              className={`w-full border ${
                passwordErrors.newPass ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                passwordErrors.newPass
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {passwordErrors.newPass && (
              <p className="text-red-500 text-xs mt-1">
                {passwordErrors.newPass}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirmPass}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPass: e.target.value })
              }
              className={`w-full border ${
                passwordErrors.confirmPass
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                passwordErrors.confirmPass
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {passwordErrors.confirmPass && (
              <p className="text-red-500 text-xs mt-1">
                {passwordErrors.confirmPass}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="btn btn-primary justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group"
          >
            <Save className="h-4 w-4 mr-2" />
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
