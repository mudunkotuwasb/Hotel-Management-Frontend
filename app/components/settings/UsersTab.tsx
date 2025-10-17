"use client";
import React, { useState } from "react";
import { Edit, Trash2, User } from "lucide-react";
import AddUserForm from "@/app/components/settings/AddUserForm";

export default function UsersTab() {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [users, setUsers] = useState([
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
  ]);

  // 🟢 Handle Add
  const handleAddUser = (newUser: {
    name: string;
    email: string;
    role: string;
    status: string;
  }) => {
    const userWithId = { id: Date.now().toString(), ...newUser };
    setUsers([...users, userWithId]);
  };

  // 🟡 Handle Update
  const handleUpdateUser = (updatedUser: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  }) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditUser(null);
  };

  // 🔴 Handle Delete
  const handleDeleteUser = (id: string) => {
    const userToDelete = users.find((u) => u.id === id);
    if (!userToDelete) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${userToDelete.name}?`
    );
    if (confirmed) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          User Management
        </h3>
        <button
          onClick={() => {
            setEditUser(null);
            setShowForm(!showForm);
          }}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group"
        >
          <User className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <AddUserForm
          key={editUser ? editUser.id : "new"} // re-render on edit
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onCancel={() => {
            setEditUser(null);
            setShowForm(false);
          }}
          existingUser={editUser}
        />
      )}

      {/* Users Table */}
      <div className="card bg-white rounded-lg shadow-lg p-6 mb-6">
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
            {users.map((user) => (
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
                  <button
                    onClick={() => {
                      setEditUser(user);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No users available. Add a new user to get started.
          </p>
        )}
      </div>
    </div>
  );
}
