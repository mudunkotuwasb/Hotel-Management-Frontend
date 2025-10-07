"use client";

import { useState } from "react";
import AdminReceptionistLayout from "../../../components/layout/AdminReceptionistLayout";
import NewBookingModal from "./NewBookingModal";
import { Calendar, CheckCircle, UserCheck, Users, LogOut } from "lucide-react";

export default function Bookings() {
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Get current date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Use current month and year for display
  const displayYear = currentYear;
  const displayMonth = currentMonth;

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = monthNames[displayMonth];

  // Get days in current month
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  const isToday = (day: number) => {
    return day === currentDay;
  };

  const generateCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-center text-sm p-2" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day;
      const today = isToday(day);

      days.push(
        <div
          key={day}
          className={`text-center text-sm p-2 border border-gray-200 rounded cursor-pointer transition-colors ${isSelected
              ? "bg-blue-600 text-white border-blue-600 font-semibold"
              : today
                ? "bg-green-500 text-white border-green-500 font-semibold"
                : "text-gray-900 hover:bg-gray-50"
            }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <AdminReceptionistLayout role="admin">
      <div className="p-6">
        {/* Header with New Booking Button */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings & Reservations</h1>
            <p className="text-gray-600">Manage guest reservations and check-ins</p>
          </div>
          <button
            onClick={() => setIsNewBookingOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            New Booking
          </button>
        </div>

        {/* 5 Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Card 1 - Total Bookings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>

          {/* Card 2 - Confirmed */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>

          {/* Card 3 - Checked-in */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
            <div className="text-sm text-gray-600">Checked-in</div>
          </div>

          {/* Card 4 - Today's Check-ins */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Today's Check-ins</div>
          </div>

          {/* Card 5 - Today's Check-outs */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Today's Check-outs</div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto">
          {/* Calendar Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{monthName} {displayYear}</h3>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Days Header */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {generateCalendarDays()}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-600">Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-gray-600">Selected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Booking Modal */}
      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
      />
    </AdminReceptionistLayout>
  );
}