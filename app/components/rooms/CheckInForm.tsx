"use client";

import { X, LogIn } from "lucide-react";
import React from "react";

interface CheckInFormProps {
  room: {
    id: string;
    number: string;
  };
  guest: { name: string; email: string; phone: string };
  setGuest: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; phone: string }>
  >;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onClose: () => void;
  onCheckIn: () => void;
}

const CheckInForm: React.FC<CheckInFormProps> = ({
  room,
  guest,
  setGuest,
  errors,
  setErrors,
  onClose,
  onCheckIn,
}) => {
  return (
    <div className="card bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Check-in Guest - Room {room.number}
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Guest Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guest Name *
          </label>
          <input
            type="text"
            value={guest.name}
            onChange={(e) => setGuest({ ...guest, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter guest name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={guest.email}
            onChange={(e) => setGuest({ ...guest, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            value={guest.phone}
            onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="flex items-end">
          <button
            onClick={onCheckIn}
            className="btn btn-primary w-full justify-center flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Check In Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInForm;
