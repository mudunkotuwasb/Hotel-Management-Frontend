// app/dashboard/customer/bookings/page.tsx
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CustomerLayout from "../../../components/layout/CustomerLayout";
import NewBookingModal from "./NewBookingModal";

// Mock data for bookings
const mockBookings = [
  {
    id: "BK001",
    roomType: "Deluxe Suite",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    guests: 2,
    status: "Confirmed",
    total: 750.00,
  },
  {
    id: "BK002",
    roomType: "Standard Room",
    checkIn: "2024-02-01",
    checkOut: "2024-02-03",
    guests: 1,
    status: "Completed",
    total: 300.00,
  },
  {
    id: "BK003",
    roomType: "Executive Suite",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    guests: 3,
    status: "Pending",
    total: 1200.00,
  },
];

export default function MyBookingsPage() {
  const [bookings] = useState(mockBookings);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <CustomerLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your hotel reservations and bookings</p>
          </div>
          <button
            onClick={handleNewBooking}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FaPlus className="w-4 h-4" />
            New Booking
          </button>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {bookings.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">Start by making your first reservation</p>
              <button
                onClick={handleNewBooking}
                className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 mx-auto"
              >
                <FaPlus className="w-4 h-4" />
                New Booking
              </button>
            </div>
          ) : (
            <>
              {/* Mobile View - Cards */}
              <div className="sm:hidden">
                <div className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                          <div className="text-xs text-gray-500 mt-1">{booking.roomType}</div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Dates:</span>
                          <span className="text-gray-900 text-right">{booking.checkIn} to {booking.checkOut}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Guests:</span>
                          <span className="text-gray-900">{booking.guests} guest(s)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-medium text-gray-900">${booking.total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          View Details
                        </button>
                        {booking.status === "Confirmed" && (
                          <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop View - Table */}
              <div className="hidden sm:block overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room Type
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guests
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.roomType}</div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {booking.checkIn} to {booking.checkOut}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.guests} guest(s)</div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${booking.total.toFixed(2)}</div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">
                            View Details
                          </button>
                          {booking.status === "Confirmed" && (
                            <button className="text-red-600 hover:text-red-900">
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
            <div className="text-xs sm:text-sm text-gray-600">Total Bookings</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{bookings.length}</div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
            <div className="text-xs sm:text-sm text-gray-600">Upcoming Stays</div>
            <div className="text-xl sm:text-2xl font-bold text-green-600 mt-1">
              {bookings.filter(b => b.status === "Confirmed").length}
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
            <div className="text-xs sm:text-sm text-gray-600">Total Spent</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
              ${bookings.reduce((sum, booking) => sum + booking.total, 0).toFixed(2)}
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