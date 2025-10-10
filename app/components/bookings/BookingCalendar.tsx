"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar, CheckCircle, Users, LogOut } from "lucide-react";

interface Booking {
  id: string;
  guestId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  source: 'direct' | 'booking.com' | 'tripadvisor' | 'expedia' | 'phone' | 'walk-in';
  package: 'room-only' | 'bed-breakfast' | 'half-board' | 'full-board';
  totalAmount: number;
}

interface BookingCalendarProps {
  bookings: Booking[];
  onDateClick?: (date: Date) => void;
  onBookingClick?: (booking: Booking) => void;
}

export default function BookingCalendar({
  bookings,
  onDateClick,
  onBookingClick
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current date info
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = monthNames[currentMonth];

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    onDateClick?.(clickedDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  const getBookingsForDate = (day: number) => {
    const targetDate = new Date(currentYear, currentMonth, day);
    return bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return targetDate >= checkIn && targetDate < checkOut;
    });
  };

  const getBookingStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case 'checked-in':
        return "bg-green-100 text-green-800 border border-green-200";
      case 'checked-out':
        return "bg-gray-100 text-gray-800 border border-gray-200";
      case 'cancelled':
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getSourceIcon = (source: Booking['source']) => {
    switch (source) {
      case 'booking.com':
        return '🏨';
      case 'tripadvisor':
        return '🦉';
      case 'expedia':
        return '✈️';
      case 'direct':
        return '🏠';
      case 'phone':
        return '📞';
      case 'walk-in':
        return '🚶';
      default:
        return '📅';
    }
  };

  const generateCalendarDays = () => {
    const days = [];

    // Empty cells for days before month start
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-center text-sm p-2 min-h-[100px] border border-gray-200 bg-gray-50" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBookings = getBookingsForDate(day);
      const today = isToday(day);

      days.push(
        <div
          key={day}
          className={`text-center text-sm p-2 border border-gray-200 min-h-[100px] ${
            today ? "bg-green-50" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-medium ${
              today ? "text-green-600" : "text-gray-900"
            }`}>
              {day}
            </span>
            {onDateClick && (
              <button
                onClick={() => handleDateClick(day)}
                className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Plus className="h-3 w-3 text-gray-400" />
              </button>
            )}
          </div>

          {/* Bookings for this day */}
          <div className="space-y-1">
            {dayBookings.slice(0, 2).map((booking) => (
              <div
                key={booking.id}
                onClick={() => onBookingClick?.(booking)}
                className={`text-xs p-1 rounded cursor-pointer hover:shadow-sm transition-shadow ${getBookingStatusColor(booking.status)}`}
                title={`Room ${booking.roomId} - ${booking.status}`}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-xs">{getSourceIcon(booking.source)}</span>
                  <span className="truncate">Room {booking.roomId}</span>
                </div>
              </div>
            ))}
            {dayBookings.length > 2 && (
              <div className="text-xs text-gray-500 text-center">
                +{dayBookings.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {monthName} {currentYear}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days Header */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2 bg-gray-50"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {generateCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
          <span className="text-gray-600">Confirmed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
          <span className="text-gray-600">Checked-in</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded"></div>
          <span className="text-gray-600">Checked-out</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
          <span className="text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
}