import React from "react";
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
} from "lucide-react";

// --- Type Definitions (self-contained) ---
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

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onEdit,
  onStatusChange,
  onView,
  onDelete,
  onCheckIn,
  onCheckOut,
  guest,
  booking,
}) => {
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
        return <Bed className="h-4 w-4" />;
      case "double":
        return <Users className="h-4 w-4" />;
      case "suite":
        return <Bed className="h-4 w-4" />;
      case "family":
        return <Users className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
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

  return (
    <div className={`room-card ${statusConfig.bg} group p-4 rounded-lg border`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white rounded-xl shadow">
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
        <div
          className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}
        >
          <StatusIcon className="h-3 w-3 mr-1" />
          {statusConfig.text}
        </div>
      </div>

      {/* Guest Information */}
      {guest && room.status === "occupied" && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <User className="h-4 w-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-900">
              Current Guest
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">{guest.name}</div>
            <div className="text-xs">{guest.email}</div>
            {booking && (
              <div className="text-xs mt-1">
                Check-in: {new Date(booking.checkIn).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cleaning Information */}
      {room.needsCleaning && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-900">
              Needs Cleaning
            </span>
          </div>
          {room.cleaningNotes && (
            <div className="text-sm text-yellow-700 mb-1">
              {room.cleaningNotes}
            </div>
          )}
          {room.lastCleaned && (
            <div className="text-xs text-yellow-600">
              Last cleaned: {new Date(room.lastCleaned).toLocaleDateString()}
            </div>
          )}
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
              className="flex items-center space-x-1 text-xs text-gray-600 bg-white px-2 py-1 rounded-lg border border-gray-200"
            >
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {room.amenities.length > 3 && (
            <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-200">
              +{room.amenities.length - 3} more
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {/* Primary Actions */}
        <div className="flex space-x-2">
          {room.status === "available" && onCheckIn && (
            <button
              onClick={() => onCheckIn(room)}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
            >
              <LogIn className="h-4 w-4 mr-1 inline" />
              Check In
            </button>
          )}
          {room.status === "occupied" && onCheckOut && (
            <button
              onClick={() => onCheckOut(room)}
              className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-md text-sm hover:bg-yellow-600"
            >
              <LogOut className="h-4 w-4 mr-1 inline" />
              Check Out
            </button>
          )}
          {room.status === "cleaning" && onStatusChange && (
            <button
              onClick={() => onStatusChange(room.id, "available")}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-1 inline" />
              Mark Clean
            </button>
          )}
          {room.status === "available" && onStatusChange && (
            <button
              onClick={() => onStatusChange(room.id, "cleaning")}
              className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-md text-sm hover:bg-yellow-600"
            >
              <AlertTriangle className="h-4 w-4 mr-1 inline" />
              Needs Cleaning
            </button>
          )}
        </div>

        {/* Secondary Actions */}
        <div className="flex space-x-2">
          {onView && (
            <button
              onClick={() => onView(room)}
              className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-300"
            >
              <Eye className="h-4 w-4 mr-1 inline" />
              View
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(room)}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              <Edit className="h-4 w-4 mr-1 inline" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(room)}
              className="bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 inline" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
