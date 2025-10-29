"use client";

import { useState, useEffect } from "react";
import CustomerLayout from "../../components/layout/CustomerLayout";
import { Calendar, CheckCircle, Star, Plus, Bed } from "lucide-react";
import NewBookingModal from "./NewBooking/NewBookingModal";

// Mock data
interface User {
  id: string;
  name: string;
  email: string;
}

interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
}

interface Booking {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: string;
  totalAmount: number;
}

// Mock data
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
};

const mockRooms: Room[] = [
  { id: "1", number: "101", type: "single", price: 100 },
  { id: "2", number: "102", type: "double", price: 150 },
  { id: "3", number: "201", type: "suite", price: 300 },
  { id: "4", number: "202", type: "single", price: 100 },
];

const mockBookings: Booking[] = [
  {
    id: "1",
    roomId: "1",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    status: "checked-out",
    totalAmount: 500,
  },
  {
    id: "2",
    roomId: "2",
    checkIn: "2024-02-01",
    checkOut: "2024-02-05",
    status: "confirmed",
    totalAmount: 600,
  },
  {
    id: "3",
    roomId: "3",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    status: "pending",
    totalAmount: 1500,
  },
];

// Helper functions
const getBookingStatus = (status: string) => {
  switch (status) {
    case "confirmed":
      return {
        text: "Confirmed",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      };
    case "pending":
      return {
        text: "Pending",
        color: "bg-yellow-100 text-yellow-800",
        icon: Calendar,
      };
    case "checked-out":
      return {
        text: "Completed",
        color: "bg-blue-100 text-blue-800",
        icon: CheckCircle,
      };
    default:
      return {
        text: "Unknown",
        color: "bg-gray-100 text-gray-800",
        icon: Calendar,
      };
  }
};

const getRoomTypeIcon = (type: string) => {
  switch (type) {
    case "single":
      return <Bed className="h-4 w-4 text-blue-600" />;
    case "double":
      return <Bed className="h-4 w-4 text-blue-600" />;
    case "suite":
      return <Star className="h-4 w-4 text-blue-600" />;
    default:
      return <Bed className="h-4 w-4 text-blue-600" />;
  }
};

export default function CustomerDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API calls
    setUser(mockUser);
    setBookings(mockBookings);
  }, []);

  const handleNewBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = () => {
    setIsBookingModalOpen(false);
    // Optionally refresh bookings data here
    console.log("New booking completed, refresh data if needed");
  };

  return (
    <CustomerLayout>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-blue-100">
              Manage your bookings and explore our services
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {bookings.length}
              </div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {bookings.filter((b) => b.status === "checked-out").length}
              </div>
              <div className="text-sm text-gray-600">Completed Stays</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h3>
              <button
                onClick={handleNewBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </button>
            </div>
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking) => {
                const room = mockRooms.find((r) => r.id === booking.roomId);
                const status = getBookingStatus(booking.status);
                const StatusIcon = status.icon;

                return (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getRoomTypeIcon(room?.type || "single")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {room
                              ? `Room ${room.number}`
                              : `Room ${booking.roomId}`}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                            {new Date(booking.checkOut).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.text}
                        </span>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          ${booking.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* New Booking Modal */}
        {isBookingModalOpen && (
          <NewBookingModal
            onClose={() => setIsBookingModalOpen(false)}
            onComplete={handleBookingComplete}
          />
        )}
      </div>
    </CustomerLayout>
  );
}
