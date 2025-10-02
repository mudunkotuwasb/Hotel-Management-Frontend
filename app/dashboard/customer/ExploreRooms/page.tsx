// app/dashboard/customer/ExploreRooms/page.tsx
"use client";

import CustomerLayout from "../../../components/layout/CustomerLayout";

// Mock data for rooms
const rooms = [
  {
    id: "101",
    name: "Room 101",
    type: "Single",
    status: "Available",
    rate: 120,
    maxOccupancy: 1,
    amenities: ["WIFI", "TV", "AC", "Mini Bar"],
  },
  {
    id: "102",
    name: "Room 102",
    type: "Double",
    status: "Available",
    rate: 180,
    maxOccupancy: 2,
    amenities: ["WIFI", "TV", "AC", "Mini Bar", "Ocean View"],
  },
  {
    id: "201",
    name: "Room 201",
    type: "Suite",
    status: "Booked",
    rate: 300,
    maxOccupancy: 3,
    amenities: ["WIFI", "TV", "AC", "Mini Bar", "Ocean View", "Balcony"],
  },
];

export default function ExploreRoomsPage() {
  return (
    <CustomerLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Explore Our Rooms</h1>
          <p className="text-base text-gray-600">Discover our luxurious accommodations</p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Room Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">{room.type}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        room.status === "Available" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {room.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-4">
                {/* Rate and Occupancy */}
                <div className="mb-3">
                  <div className="text-xl font-bold text-gray-900">${room.rate}<span className="text-sm font-normal text-gray-600">/night</span></div>
                  <div className="text-xs text-gray-600 mt-1">Max: {room.maxOccupancy} guest{room.maxOccupancy > 1 ? 's' : ''}</div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Now Button */}
                <button 
                  className={`w-full py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                    room.status === "Available" 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={room.status !== "Available"}
                >
                  {room.status === "Available" ? "Book Now" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}