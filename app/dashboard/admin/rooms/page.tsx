"use client";

import { useState } from "react";
import AdminReceptionistLayout from "../../../components/layout/AdminReceptionistLayout";
import {
  Users,
  DollarSign,
  Calendar,
  Grid,
  List,
  Plus,
  Search,
  Filter,
  X,
  Save,
  LogIn,
} from "lucide-react";

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

// Sample rooms data (replace with actual backend data later)
const initialRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "single",
    status: "available",
    rate: 50,
    amenities: ["WiFi"],
    maxOccupancy: 1,
    floor: 1,
  },
  {
    id: "2",
    number: "102",
    type: "double",
    status: "occupied",
    rate: 80,
    amenities: ["WiFi", "TV"],
    maxOccupancy: 2,
    floor: 1,
  },
  {
    id: "3",
    number: "201",
    type: "suite",
    status: "cleaning",
    rate: 120,
    amenities: ["WiFi", "AC"],
    maxOccupancy: 3,
    floor: 2,
  },
];

export default function Rooms() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // New check-in form state
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [checkInRoom, setCheckInRoom] = useState<Room | null>(null);
  const [checkInGuest, setCheckInGuest] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [checkInErrors, setCheckInErrors] = useState<{ [key: string]: string }>(
    {}
  );

  // Rooms state
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const handleCheckIn = (room: Room) => {
    setCheckInRoom(room);
    setShowCheckInForm(true);
  };

  const handleCheckOut = (room: Room) => {
    // Implement checkout logic (e.g., update room status)
    console.log("Check Out:", room);
  };

  const handleViewRoom = (room: Room) => {
    // Implement view logic
    console.log("View Room:", room);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setNewRoom(room);
    setShowAddForm(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setRooms(rooms.filter((r) => r.id !== room.id));
  };

  // Status counts (dummy data)
  const statusCounts = {
    total: 5,
    available: 2,
    occupied: 1,
    cleaning: 0,
    maintenance: 1,
  };

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [floorFilter, setFloorFilter] = useState("all");

  // New room state
  const [newRoom, setNewRoom] = useState<Room>({
    id: "", // Add this
    number: "",
    type: "single",
    status: "available",
    rate: 0,
    amenities: [],
    maxOccupancy: 1,
    floor: 1,
  });

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "available", label: "Available" },
    { value: "occupied", label: "Occupied" },
    { value: "reserved", label: "Reserved" },
    { value: "cleaning", label: "Needs Cleaning" },
    { value: "maintenance", label: "Maintenance" },
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" },
    { value: "family", label: "Family" },
  ];

  const floorOptions = [
    { value: "all", label: "All Floors" },
    { value: "1", label: "Floor 1" },
    { value: "2", label: "Floor 2" },
    { value: "3", label: "Floor 3" },
  ];

  // Filtered rooms
  const filteredRooms = rooms.filter((room) => {
    return (
      (statusFilter === "all" || room.status === statusFilter) &&
      (typeFilter === "all" || room.type === typeFilter) &&
      (floorFilter === "all" || room.floor.toString() === floorFilter) &&
      room.number.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Add/Edit Room handler with validation
  const handleAddRoom = () => {
    const newErrors: { [key: string]: string } = {};

    if (!newRoom.number.trim()) newErrors.number = "Room number is required";
    if (!newRoom.type) newErrors.type = "Room type is required";
    if (!newRoom.rate || newRoom.rate <= 0)
      newErrors.rate = "Rate must be greater than 0";
    if (!newRoom.floor || newRoom.floor < 1)
      newErrors.floor = "Floor must be at least 1";
    if (!newRoom.maxOccupancy || newRoom.maxOccupancy < 1)
      newErrors.maxOccupancy = "Max occupancy must be at least 1";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If editing
    if (editingRoom) {
      console.log("Update Room:", newRoom);
    } else {
      console.log("Add Room:", newRoom);
    }

    // Reset form
    setShowAddForm(false);
    setEditingRoom(null);
    setNewRoom({
      id: "", // Add this
      number: "",
      type: "single",
      status: "available",
      rate: 0,
      amenities: [],
      maxOccupancy: 1,
      floor: 1,
    });
    setErrors({});
  };

  // Check-in handler with validation
  const handleProcessCheckIn = () => {
    const newErrors: { [key: string]: string } = {};
    if (!checkInGuest.name.trim()) newErrors.name = "Guest name is required";
    if (!checkInGuest.email.trim()) newErrors.email = "Email is required";
    if (!checkInGuest.phone.trim())
      newErrors.phone = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setCheckInErrors(newErrors);
      return;
    }

    console.log("Check-in Guest:", checkInGuest, "to room:", checkInRoom);

    // Reset form
    setShowCheckInForm(false);
    setCheckInRoom(null);
    setCheckInGuest({ name: "", email: "", phone: "" });
    setCheckInErrors({});
  };

  return (
    <AdminReceptionistLayout role="admin">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Room Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage {statusCounts.total} rooms across the hotel
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* View mode toggle */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-soft text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white shadow-soft text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Add Room button */}
            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
              Add Room
            </button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-white border-gray-100">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {statusCounts.total}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Rooms</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-green-50 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {statusCounts.available}
            </div>
            <div className="text-sm text-green-700 font-medium">Available</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-red-50 border-red-200">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {statusCounts.occupied}
            </div>
            <div className="text-sm text-red-700 font-medium">Occupied</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-yellow-50 border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {statusCounts.cleaning}
            </div>
            <div className="text-sm text-yellow-700 font-medium">
              Needs Cleaning
            </div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-gray-50 border-gray-200">
            <div className="text-3xl font-bold text-gray-600 mb-1">
              {statusCounts.maintenance}
            </div>
            <div className="text-sm text-gray-700 font-medium">Maintenance</div>
          </div>
        </div>

        {/* Room Filters (inlined) */}
        <div className="card mb-6 p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Room number..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Floor Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor
              </label>
              <select
                value={floorFilter}
                onChange={(e) => setFloorFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {floorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                  setFloorFilter("all");
                }}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Room Form */}
        {showAddForm && (
          <div className="card bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingRoom ? "Edit Room" : "Add New Room"}
              </h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingRoom(null);
                  setNewRoom({
                    id: "",
                    number: "",
                    type: "single",
                    status: "available",
                    rate: 0,
                    amenities: [],
                    maxOccupancy: 1,
                    floor: 1,
                  });
                  setErrors({});
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
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
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, number: e.target.value })
                  }
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
                    setNewRoom({
                      ...newRoom,
                      status: e.target.value as RoomStatus,
                    })
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
                    setNewRoom({
                      ...newRoom,
                      rate: parseFloat(e.target.value) || 0,
                    })
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
                    setNewRoom({
                      ...newRoom,
                      floor: parseInt(e.target.value) || 1,
                    })
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.maxOccupancy}
                  </p>
                )}
              </div>

              {/* Amenities */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    "WiFi",
                    "TV",
                    "AC",
                    "Mini Bar",
                    "Balcony",
                    "Jacuzzi",
                    "Kitchenette",
                    "Safe",
                  ].map((amenity) => (
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
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Add/Update Button */}
              <div className="flex items-end">
                <button
                  onClick={handleAddRoom}
                  disabled={!!Object.keys(errors).length}
                  className={`btn btn-primary w-full justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group ${
                    Object.keys(errors).length
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingRoom ? "Update Room" : "Add Room"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Check-in Form --- */}
        {showCheckInForm && checkInRoom && (
          <div className="card bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Check-in Guest - Room {checkInRoom.number}
              </h3>
              <button
                onClick={() => {
                  setShowCheckInForm(false);
                  setCheckInRoom(null);
                  setCheckInGuest({ name: "", email: "", phone: "" });
                  setCheckInErrors({});
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
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
                  value={checkInGuest.name}
                  onChange={(e) =>
                    setCheckInGuest({ ...checkInGuest, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter guest name"
                />
                {checkInErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {checkInErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={checkInGuest.email}
                  onChange={(e) =>
                    setCheckInGuest({ ...checkInGuest, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
                {checkInErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {checkInErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={checkInGuest.phone}
                  onChange={(e) =>
                    setCheckInGuest({ ...checkInGuest, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
                {checkInErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {checkInErrors.phone}
                  </p>
                )}
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleProcessCheckIn}
                  className="btn btn-primary w-full justify-center flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Check In Guest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Results Section --- */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-navy-600 font-medium">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </p>
          <div className="flex items-center space-x-2 text-sm text-navy-500">
            <Filter className="h-4 w-4" />
            <span>
              Filtered by:{" "}
              {statusFilter !== "all" && `Status: ${statusFilter} `}
              {typeFilter !== "all" && `Type: ${typeFilter} `}
              {floorFilter !== "all" && `Floor: ${floorFilter}`}
              {statusFilter === "all" &&
              typeFilter === "all" &&
              floorFilter === "all"
                ? "All"
                : ""}
            </span>
          </div>
        </div>

        {/* --- Room Grid/List Section --- */}
        <div className="mt-6">
          {filteredRooms.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => {
                  const getStatusConfig = (status: Room["status"]) => {
                    switch (status) {
                      case "available":
                        return {
                          color: "text-green-700",
                          text: "Available",
                          bg: "bg-green-100 border-green-300",
                        };
                      case "occupied":
                        return {
                          color: "text-red-700",
                          text: "Occupied",
                          bg: "bg-red-100 border-red-300",
                        };
                      case "reserved":
                        return {
                          color: "text-yellow-700",
                          text: "Reserved",
                          bg: "bg-yellow-100 border-yellow-300",
                        };
                      case "cleaning":
                        return {
                          color: "text-yellow-700",
                          text: "Cleaning",
                          bg: "bg-yellow-100 border-yellow-300",
                        };
                      case "maintenance":
                        return {
                          color: "text-blue-700",
                          text: "Maintenance",
                          bg: "bg-blue-100 border-blue-300",
                        };
                      default:
                        return {
                          color: "text-green-700",
                          text: "Available",
                          bg: "bg-green-100 border-green-300",
                        };
                    }
                  };
                  const statusConfig = getStatusConfig(room.status);

                  return (
                    <div
                      key={room.id}
                      className={`p-4 rounded-lg border ${statusConfig.bg}`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Room {room.number}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium capitalize">
                            {room.type} • Floor {room.floor}
                          </p>
                        </div>
                        <div
                          className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}
                        >
                          {statusConfig.text}
                        </div>
                      </div>

                      {/* Room Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="font-medium">Rate per night</span>
                          <span className="font-bold text-gray-900">
                            ${room.rate}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="font-medium">Max occupancy</span>
                          <span className="font-bold text-gray-900">
                            {room.maxOccupancy} guests
                          </span>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-gray-600 bg-white px-2 py-1 rounded-lg border border-gray-300"
                          >
                            {amenity}
                          </span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-300">
                            +{room.amenities.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        {room.status === "available" && (
                          <button
                            onClick={() => handleCheckIn(room)}
                            className="btn btn-success btn-sm"
                          >
                            Check In
                          </button>
                        )}
                        {room.status === "occupied" && (
                          <button
                            onClick={() => handleCheckOut(room)}
                            className="btn btn-warning btn-sm"
                          >
                            Check Out
                          </button>
                        )}
                        <button
                          onClick={() => handleViewRoom(room)}
                          className="btn btn-secondary btn-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditRoom(room)}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg bg-white">
                  <thead className="bg-gray-100 text-gray-700 text-left">
                    <tr>
                      <th className="px-4 py-2 border-b">Room Number</th>
                      <th className="px-4 py-2 border-b">Type</th>
                      <th className="px-4 py-2 border-b">Status</th>
                      <th className="px-4 py-2 border-b">Floor</th>
                      <th className="px-4 py-2 border-b">Rate</th>
                      <th className="px-4 py-2 border-b">Max Occupancy</th>
                      <th className="px-4 py-2 border-b">Amenities</th>
                      <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map((room) => (
                      <tr key={room.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 border-b">{room.number}</td>
                        <td className="px-4 py-2 border-b">{room.type}</td>
                        <td className="px-4 py-2 border-b">{room.status}</td>
                        <td className="px-4 py-2 border-b">{room.floor}</td>
                        <td className="px-4 py-2 border-b">${room.rate}</td>
                        <td className="px-4 py-2 border-b">
                          {room.maxOccupancy}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {room.amenities.join(", ")}
                        </td>
                        <td className="px-4 py-2 border-b flex gap-1">
                          <button
                            onClick={() => handleViewRoom(room)}
                            className="btn btn-secondary btn-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditRoom(room)}
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <p className="text-center text-gray-500 mt-6">No rooms found.</p>
          )}
        </div>

        {/* --- Empty State for No Rooms --- */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No rooms found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </AdminReceptionistLayout>
  );
}
