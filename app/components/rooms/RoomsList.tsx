import React from "react";
import RoomCard from "./RoomCard";

type RoomStatus =
  | "available"
  | "occupied"
  | "reserved"
  | "cleaning"
  | "maintenance";

export type RoomType = "single" | "double" | "suite" | "family";

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  rate: number;
  amenities: string[];
  maxOccupancy: number;
  floor: number;
}

interface RoomsListProps {
  rooms: Room[];
  viewMode: "grid" | "list";
  onEdit: (room: Room) => void;
  onView: (room: Room) => void;
  onStatusChange: (roomId: string, status: RoomStatus) => void;
  onCheckIn: (room: Room) => void;
  onCheckOut: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export default function RoomsList({
  rooms,
  viewMode,
  onEdit,
  onView,
  onStatusChange,
  onCheckIn,
  onCheckOut,
  onDelete,
}: RoomsListProps): React.ReactElement {
  

  // handleStatusChange Function
  const handleStatusChange = async (roomId: string, status: RoomStatus) => {
    try {
      // Add API endpoint
      const endpoint = "Add API endpoint here";
      
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Room status updated successfully:", result);

      onStatusChange(roomId, status);

    } catch (error) {
      // Handle API error (show toast, alert)
      console.error("Failed to update room status:", error);
      alert("Failed to update room status. Please try again.");
    }
  };

  // handleCheckIn Function
  const handleCheckIn = async (room: Room) => {
    try {
      // Add API endpoint
      const endpoint = "Add API endpoint here";
      

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: room.id,
          roomNumber: room.number,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Check-in successful:", result);

      onCheckIn(room);

    } catch (error) {
      // Handle API error (show toast, alert)
      console.error("Failed to check in:", error);
      alert("Failed to check in. Please try again.");
    }
  };

  // handleCheckOut Function
  const handleCheckOut = async (room: Room) => {
    try {
      // Add API endpoint
      const endpoint = "Add API endpoint here";
      

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: room.id,
          roomNumber: room.number,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Check-out successful:", result);

      onCheckOut(room);

    } catch (error) {
      // Handle API error (show toast, alert)
      console.error("Failed to check out:", error);
      alert("Failed to check out. Please try again.");
    }
  };

  // handleDelete Function
  const handleDelete = async (room: Room) => {
    if (!confirm(`Are you sure you want to delete Room ${room.number}?`)) {
      return;
    }

    try {
      // Add API endpoint
      const endpoint = `Add API endpoint here${room.id}`;
      
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Room deleted successfully:", result);

      onDelete(room);

    } catch (error) {
      // Handle API error (show toast, alert)
      console.error("Failed to delete room:", error);
      alert("Failed to delete room. Please try again.");
    }
  };

  if (rooms.length === 0)
    return (
      <div className="text-center py-12 text-gray-600">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No rooms found
        </h3>
        Try adjusting your filters to see more results.
      </div>
    );

  if (viewMode === "grid")
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onEdit={onEdit}
            onView={onView}
            onStatusChange={handleStatusChange}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );

  // List / Table View
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Room", "Type", "Status", "Rate", "Floor", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                Room {room.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap capitalize text-gray-900">
                {room.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    room.status === "available"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : room.status === "occupied"
                      ? "bg-red-100 text-red-800 border-red-200"
                      : room.status === "reserved"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : room.status === "cleaning"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }`}
                >
                  {room.status === "available"
                    ? "Available"
                    : room.status === "occupied"
                    ? "Occupied"
                    : room.status === "reserved"
                    ? "Reserved"
                    : room.status === "cleaning"
                    ? "Needs Cleaning"
                    : "Maintenance"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${room.rate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {room.floor}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(room)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onView(room)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  View
                </button>
                {room.status === "cleaning" && (
                  <button
                    onClick={() => handleStatusChange(room.id, "available")}
                    className="text-green-600 hover:text-green-800"
                  >
                    Mark Clean
                  </button>
                )}
                <button
                  onClick={() => handleDelete(room)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}