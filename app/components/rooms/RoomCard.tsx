import React, { useState, useRef, useEffect } from "react";
import {
  Bed,
  Users,
  Wifi,
  Tv,
  Wind,
  Coffee,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  Edit,
  Eye,
  Trash2,
  LogIn,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

// --- Type Definitions ---
export interface Room {
  id: string;
  number: string;
  type: "single" | "double" | "suite" | "family";
  status: "available" | "occupied" | "reserved" | "cleaning" | "maintenance";
  rate: number;
  amenities: string[];
  maxOccupancy: number;
  floor: number;
  needsCleaning?: boolean;
  cleaningNotes?: string;
  lastCleaned?: Date;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality?: string;
  preferences?: string[];
  bookingHistory: string[];
}

export interface Booking {
  id: string;
  guestId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
  package: "room-only" | "bed-breakfast" | "half-board" | "full-board";
  source:
    | "direct"
    | "booking.com"
    | "tripadvisor"
    | "expedia"
    | "phone"
    | "walk-in";
  totalAmount: number;
  notes?: string;
  createdAt: Date;
}

interface RoomCardProps {
  room: Room;
  onEdit?: (room: Room) => void;
  onStatusChange?: (roomId: string, status: Room["status"]) => void;
  onView?: (room: Room) => void;
  onDelete?: (room: Room) => void;
  onCheckIn?: (room: Room) => void;
  onCheckOut?: (room: Room) => void;
  guest?: Guest | null;
  booking?: Booking | null;
}

function RoomCard({
  room,
  onEdit,
  onStatusChange,
  onView,
  onDelete,
  onCheckIn,
  onCheckOut,
  guest,
  booking,
}: RoomCardProps): React.ReactElement {
  const getStatusConfig = (status: Room["status"]) => {
    switch (status) {
      case "available":
        return {
          color: "border-green-500 text-green-700",
          icon: CheckCircle,
          text: "Available",
          bg: "bg-green-50 border-green-200",
        };
      case "occupied":
        return {
          color: "border-red-500 text-red-700",
          icon: Users,
          text: "Occupied",
          bg: "bg-red-50 border-red-200",
        };
      case "reserved":
        return {
          color: "border-yellow-500 text-yellow-700",
          icon: Clock,
          text: "Reserved",
          bg: "bg-yellow-50 border-yellow-200",
        };
      case "cleaning":
        return {
          color: "border-yellow-500 text-yellow-700",
          icon: AlertTriangle,
          text: "Cleaning",
          bg: "bg-yellow-50 border-yellow-200",
        };
      case "maintenance":
        return {
          color: "border-blue-500 text-blue-700",
          icon: AlertTriangle,
          text: "Maintenance",
          bg: "bg-blue-50 border-blue-200",
        };
      default:
        return {
          color: "border-green-500 text-green-700",
          icon: CheckCircle,
          text: "Available",
          bg: "bg-green-50 border-green-200",
        };
    }
  };

  const getRoomTypeIcon = (type: Room["type"]) => {
    switch (type) {
      case "single":
        return <Bed className="h-5 w-5" />;
      case "double":
        return <Users className="h-5 w-5" />;
      case "suite":
        return <Bed className="h-5 w-5" />;
      case "family":
        return <Users className="h-5 w-5" />;
      default:
        return <Bed className="h-5 w-5" />;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-3 w-3" />;
      case "tv":
        return <Tv className="h-3 w-3" />;
      case "ac":
        return <Wind className="h-3 w-3" />;
      case "mini bar":
        return <Coffee className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig(room.status);
  const StatusIcon = statusConfig.icon;

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStatusChange = (newStatus: Room["status"]) => {
    setShowDropdown(false);
    onStatusChange?.(room.id, newStatus);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div
      className={`room-card ${statusConfig.bg} p-5 rounded-lg border shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gray-50 rounded-full flex items-center justify-center shadow-sm">
            {getRoomTypeIcon(room.type)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Room {room.number}
            </h3>
            <p className="text-sm text-gray-600 font-medium capitalize">
              {room.type} • Floor {room.floor}
            </p>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color} cursor-pointer`}
          >
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusConfig.text}
            <ChevronDown className="ml-1 h-3 w-3" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1 w-32 bg-white border rounded-lg shadow-md z-10">
              {[
                "available",
                "occupied",
                "reserved",
                "cleaning",
                "maintenance",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status as Room["status"])}
                  className="block w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Guest Information */}
      {guest && room.status === "occupied" && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <User className="h-4 w-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-900">
              Current Guest
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-0.5">
            <div className="font-medium">{guest.name}</div>
            <div className="text-xs px-1 py-0.5 bg-white rounded-full inline-block">
              {guest.email}
            </div>
            {booking && (
              <div className="text-xs mt-1">
                Check-in: {new Date(booking.checkIn).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Room Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-medium">Rate per night</span>
          <span className="font-bold text-gray-900">${room.rate}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-medium">Max occupancy</span>
          <span className="font-bold text-gray-900">
            {room.maxOccupancy} guests
          </span>
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-semibold">Amenities</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
            >
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {room.amenities.length > 3 && (
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              +{room.amenities.length - 3} more
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {room.status === "available" && onCheckIn && (
            <button
              onClick={() => onCheckIn(room)}
              title="Check In"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <LogIn className="h-5 w-5 text-green-600" />
            </button>
          )}
          {room.status === "occupied" && onCheckOut && (
            <button
              onClick={() => onCheckOut(room)}
              title="Check Out"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5 text-yellow-600" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onView && (
            <button
              onClick={() => onView(room)}
              title="View Room"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Eye className="h-5 w-5 text-gray-700" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(room)}
              title="Edit Room"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Edit className="h-5 w-5 text-blue-600" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(room)}
              title="Delete Room"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
