// app/dashboard/customer/ExploreRooms/page.tsx
"use client";

import { useState, useEffect } from "react";
import CustomerLayout from "../../../components/layout/CustomerLayout";
import NewBookingModal from "../NewBooking/NewBookingModal";

// Define the room interface to match your Rooms() component
interface Room {
  id: string;
  number: string;
  type: "single" | "double" | "suite" | "family";
  status: "available" | "occupied" | "reserved" | "cleaning" | "maintenance";
  rate: number;
  amenities: string[];
  maxOccupancy: number;
  floor: number;
}

// Sample rooms data that matches the structure from Rooms() component
const sampleRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "single",
    status: "available",
    rate: 50,
    amenities: ["WiFi", "TV"],
    maxOccupancy: 1,
    floor: 1,
  },
  {
    id: "2",
    number: "102",
    type: "double",
    status: "available",
    rate: 80,
    amenities: ["WiFi", "TV", "AC", "Mini Bar"],
    maxOccupancy: 2,
    floor: 1,
  },
  {
    id: "3",
    number: "201",
    type: "suite",
    status: "available",
    rate: 120,
    amenities: ["WiFi", "AC", "Balcony", "Ocean View"],
    maxOccupancy: 3,
    floor: 2,
  },
  {
    id: "4",
    number: "202",
    type: "family",
    status: "available",
    rate: 150,
    amenities: ["WiFi", "TV", "AC", "Kitchenette", "Balcony"],
    maxOccupancy: 4,
    floor: 2,
  },
  {
    id: "5",
    number: "301",
    type: "suite",
    status: "occupied",
    rate: 200,
    amenities: ["WiFi", "TV", "AC", "Jacuzzi", "Ocean View", "Balcony"],
    maxOccupancy: 2,
    floor: 3,
  },
];

export default function ExploreRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    roomType: "all",
    maxPrice: 500,
    minOccupancy: 1,
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        // Add API endpoint
        // const response = await fetch('/api/rooms');
        // const data = await response.json();

        // use sample data and simulate API delay
        setTimeout(() => {
          setRooms(sampleRooms);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms(sampleRooms);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on user preferences
  const filteredRooms = rooms.filter((room) => {
    const matchesType =
      filters.roomType === "all" || room.type === filters.roomType;
    const matchesPrice = room.rate <= filters.maxPrice;
    const matchesOccupancy = room.maxOccupancy >= filters.minOccupancy;
    const isAvailable = room.status === "available";

    return matchesType && matchesPrice && matchesOccupancy && isAvailable;
  });

  // Format room type for display
  const formatRoomType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Get display status
  const getDisplayStatus = (status: Room["status"]) => {
    switch (status) {
      case "available":
        return "Available";
      case "occupied":
        return "Occupied";
      case "reserved":
        return "Reserved";
      case "cleaning":
        return "Cleaning";
      case "maintenance":
        return "Maintenance";
      default:
        return "Unknown";
    }
  };

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = () => {
    setIsBookingModalOpen(false);
    setSelectedRoom(null);
  };

  if (loading) {
    return (
      <CustomerLayout>
        <div className="p-4 sm:p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Explore Our Rooms
            </h1>
            <p className="text-base text-gray-600">
              Discover our luxurious accommodations
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Explore Our Rooms
          </h1>
          <p className="text-base text-gray-600">
            Discover our luxurious accommodations
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Filter Rooms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Room Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                value={filters.roomType}
                onChange={(e) =>
                  setFilters({ ...filters, roomType: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
                <option value="family">Family</option>
              </select>
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ${filters.maxPrice}
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>

            {/* Min Occupancy Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Occupancy
              </label>
              <select
                value={filters.minOccupancy}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minOccupancy: parseInt(e.target.value),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredRooms.length} of{" "}
            {rooms.filter((room) => room.status === "available").length}{" "}
            available rooms
          </p>
          <div className="text-sm text-gray-500">
            {filters.roomType !== "all" &&
              `Type: ${formatRoomType(filters.roomType)} • `}
            Max: ${filters.maxPrice} • Min: {filters.minOccupancy} guest
            {filters.minOccupancy > 1 ? "s" : ""}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Room Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800">
                    Room {room.number}
                  </div>
                  <div className="text-sm text-blue-600 mt-1">
                    Floor {room.floor}
                  </div>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-4">
                {/* Room Header */}
                <div className="mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Room {room.number}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        room.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getDisplayStatus(room.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium capitalize">
                      {formatRoomType(room.type)}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      Max {room.maxOccupancy} guest
                      {room.maxOccupancy > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Rate */}
                <div className="mb-3">
                  <div className="text-xl font-bold text-gray-900">
                    ${room.rate}
                    <span className="text-sm font-normal text-gray-600">
                      /night
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-500">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() => handleBookNow(room)}
                  className={`w-full py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                    room.status === "available"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={room.status !== "available"}
                >
                  {room.status === "available" ? "Book Now" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No rooms found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more available rooms.
            </p>
            <button
              onClick={() =>
                setFilters({ roomType: "all", maxPrice: 500, minOccupancy: 1 })
              }
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Booking Modal */}
        {isBookingModalOpen && selectedRoom && (
          <NewBookingModal
            onClose={() => setIsBookingModalOpen(false)}
            onComplete={handleBookingComplete}
          />
        )}
      </div>
    </CustomerLayout>
  );
}
