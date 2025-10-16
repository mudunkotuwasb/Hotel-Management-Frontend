"use client";

import React, { useState } from "react";
import { User, Shield, Bell, Database, Save, Edit, Trash2 } from "lucide-react";
import AdminReceptionistLayout from "@/app/components/layout/AdminReceptionistLayout";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "users", name: "User Management", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "system", name: "System", icon: Database },
  ];

  const mockUsers = [
    {
      id: "1",
      name: "John Admin",
      email: "admin@hotel.com",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Receptionist",
      email: "sarah@hotel.com",
      role: "receptionist",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Housekeeping",
      email: "mike@hotel.com",
      role: "housekeeping",
      status: "active",
    },
    {
      id: "4",
      name: "Lisa Kitchen",
      email: "lisa@hotel.com",
      role: "kitchen",
      status: "inactive",
    },
  ];

  // --- Profile Tab ---
  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@hotel.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+1-555-0123"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="admin">Administrator</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn btn-primary justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Change Password
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-6">
          <button className="btn btn-primary justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group">
            <Save className="h-4 w-4 mr-2" />
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  // --- User Management Tab ---
  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          <User className="h-4 w-4 mr-2" /> Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["User", "Role", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- Notifications Tab ---
  const renderNotificationsTab = () => (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Notification Preferences
      </h3>
      {[
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
      ].map((item) => (
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

  // --- System Tab ---
  const renderSystemTab = () => (
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
            className="flex items-center justify-between p-4 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "users":
        return renderUsersTab();
      case "notifications":
        return renderNotificationsTab();
      case "system":
        return renderSystemTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <AdminReceptionistLayout role="admin">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your account and system preferences
            </p>
          </div>
        </div>

        {/* Tabs */}
        <nav className="border-b border-gray-200 flex space-x-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>

        {renderTabContent()}
      </div>
    </AdminReceptionistLayout>
  );
}
