"use client";

import { X, Save } from "lucide-react";

type RoomStatus =
  | "available"
  | "occupied"
  | "reserved"
  | "cleaning"
  | "maintenance";

type RoomType = "single" | "double" | "suite" | "family";

interface Room {
  id: string; // Add this
  number: string;
  type: RoomType;
  status: RoomStatus;
  rate: number;
  amenities: string[];
  maxOccupancy: number;
  floor: number;
}

interface RoomFormProps {
  newRoom: Room;
  setNewRoom: (room: Room) => void;
  errors: { [key: string]: string };
  setErrors: (errors: { [key: string]: string }) => void;
  editingRoom: Room | null;
  onClose: () => void;
  onSave: () => void;
}

const amenitiesList = [
  "WiFi",
  "TV",
  "AC",
  "Mini Bar",
  "Balcony",
  "Jacuzzi",
  "Kitchenette",
  "Safe",
];

export default function RoomForm({
  newRoom,
  setNewRoom,
  errors,
  setErrors,
  editingRoom,
  onClose,
  onSave,
}: RoomFormProps) {
  

  const handleSave = async () => {
    // Validate form before proceeding
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      // Add API endpoints
      const endpoint = editingRoom 
        ? "/api/rooms/update"  // Add endpoint for updating
        : "/api/rooms/add";    // Add endpoint for adding

      // Replace with your actual API call
      const response = await fetch(endpoint, {
        method: editingRoom ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newRoom,
          rate: Number(newRoom.rate),
          floor: Number(newRoom.floor),
          maxOccupancy: Number(newRoom.maxOccupancy),
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      // Handle successful response
      const result = await response.json();
      console.log("Room saved successfully:", result);

      // Call the existing onSave prop to handle UI state updates
      onSave();

    } catch (error) {
      // Handle API error (show toast, alert, etc.)
      console.error("Failed to save room:", error);
      alert("Failed to save room. Please try again.");
    }
  };

  return (
    <div className="card bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {editingRoom ? "Edit Room" : "Add New Room"}
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Room Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Number *
          </label>
          <input
            type="text"
            value={newRoom.number || ""}
            onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 101, 201A"
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number}</p>
          )}
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Type *
          </label>
          <select
            value={newRoom.type || "single"}
            onChange={(e) =>
              setNewRoom({ ...newRoom, type: e.target.value as RoomType })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="family">Family</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={newRoom.status || "available"}
            onChange={(e) =>
              setNewRoom({ ...newRoom, status: e.target.value as RoomStatus })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rate per Night *
          </label>
          <input
            type="number"
            value={newRoom.rate || ""}
            onChange={(e) =>
              setNewRoom({ ...newRoom, rate: parseFloat(e.target.value) || 0 })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={0}
            step={0.01}
          />
          {errors.rate && (
            <p className="text-red-500 text-sm mt-1">{errors.rate}</p>
          )}
        </div>

        {/* Floor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Floor
          </label>
          <input
            type="number"
            value={newRoom.floor || ""}
            onChange={(e) =>
              setNewRoom({ ...newRoom, floor: parseInt(e.target.value) || 1 })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={1}
          />
          {errors.floor && (
            <p className="text-red-500 text-sm mt-1">{errors.floor}</p>
          )}
        </div>

        {/* Max Occupancy */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Occupancy
          </label>
          <input
            type="number"
            value={newRoom.maxOccupancy || ""}
            onChange={(e) =>
              setNewRoom({
                ...newRoom,
                maxOccupancy: parseInt(e.target.value) || 1,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={1}
          />
          {errors.maxOccupancy && (
            <p className="text-red-500 text-sm mt-1">{errors.maxOccupancy}</p>
          )}
        </div>

        {/* Amenities */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={newRoom.amenities?.includes(amenity) || false}
                  onChange={(e) => {
                    const amenities = newRoom.amenities || [];
                    if (e.target.checked) {
                      setNewRoom({
                        ...newRoom,
                        amenities: [...amenities, amenity],
                      });
                    } else {
                      setNewRoom({
                        ...newRoom,
                        amenities: amenities.filter((a) => a !== amenity),
                      });
                    }
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-black">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Add/Update Button */}
        <div className="flex items-end">
          <button
            onClick={handleSave}
            disabled={!!Object.keys(errors).length}
            className={`btn btn-primary w-full justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group ${
              Object.keys(errors).length ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            {editingRoom ? "Update Room" : "Add Room"}
          </button>
        </div>
      </div>
    </div>
  );
}