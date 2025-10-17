"use client";
import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

interface AddUserFormProps {
  onAddUser: (user: {
    name: string;
    email: string;
    role: string;
    status: string;
  }) => void;
  onUpdateUser: (user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  }) => void;
  onCancel: () => void;
  existingUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  } | null;
}

export default function AddUserForm({
  onAddUser,
  onUpdateUser,
  onCancel,
  existingUser,
}: AddUserFormProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    status: "active",
  });

  useEffect(() => {
    if (existingUser) {
      setFormData(existingUser);
    }
  }, [existingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill all required fields");
      return;
    }

    if (existingUser) {
      onUpdateUser(formData);
    } else {
      onAddUser(formData);
    }
  };

  return (
    <div className="card bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {existingUser ? "Edit User" : "Add New User"}
        </h3>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="receptionist">Receptionist</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group"
          >
            <Save className="h-4 w-4 mr-2" />
            {existingUser ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}
