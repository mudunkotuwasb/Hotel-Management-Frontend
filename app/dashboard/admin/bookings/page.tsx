"use client";

import { useState } from "react";
import AdminReceptionistLayout from "../../../components/layout/AdminReceptionistLayout";
import NewBookingModal from "../../../components/bookings/NewBookingModal";
import BookingCalendar from "../../../components/bookings/BookingCalendar";
import BookingList from "../../../components/bookings/BookingList";
import { Calendar, CheckCircle, UserCheck, Users, LogOut, List } from "lucide-react";

// Define proper TypeScript interfaces
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

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// Mock data with proper typing
const mockBookings: Booking[] = [
  {
    id: "1",
    guestId: "guest1",
    roomId: "101",
    checkIn: "2025-10-01",
    checkOut: "2025-10-03",
    status: "confirmed",
    source: "direct",
    package: "bed-breakfast",
    totalAmount: 282.00
  },
  {
    id: "2",
    guestId: "guest2",
    roomId: "102",
    checkIn: "2025-10-02",
    checkOut: "2025-10-04",
    status: "checked-in",
    source: "booking.com",
    package: "room-only",
    totalAmount: 200.00
  }
];

const mockGuests: Guest[] = [
  {
    id: "guest1",
    name: "Akila",
    email: "Akila@example.com",
    phone: "1234567890"
  },
  {
    id: "guest2",
    name: "Janatha",
    email: "jane@example.com",
    phone: "0710910202"
  }
];

export default function Bookings() {
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [guests] = useState<Guest[]>(mockGuests);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const getBookingStats = () => {
    const today = new Date();
    const todayCheckIns = bookings.filter(b => {
      const checkIn = new Date(b.checkIn);
      return checkIn.toDateString() === today.toDateString() && b.status === 'confirmed';
    }).length;
    
    const todayCheckOuts = bookings.filter(b => {
      const checkOut = new Date(b.checkOut);
      return checkOut.toDateString() === today.toDateString() && b.status === 'checked-in';
    }).length;

    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const checkedInBookings = bookings.filter(b => b.status === 'checked-in').length;

    return {
      total: bookings.length,
      confirmed: confirmedBookings,
      checkedIn: checkedInBookings,
      todayCheckIns,
      todayCheckOuts
    };
  };

  const stats = getBookingStats();

  // Handle edit booking - opens modal with existing booking data
  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setIsNewBookingOpen(true);
  };

  // Handle update booking - updates the booking in local state
  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
    // Reset editing state and close modal
    setEditingBooking(null);
    setIsNewBookingOpen(false);
  };

  // Handle creating new booking - adds to local state
  const handleNewBooking = () => {
    // In a real app, this would come from the API response
    const newBooking: Booking = {
      id: (bookings.length + 1).toString(),
      guestId: `guest${bookings.length + 1}`,
      roomId: "103",
      checkIn: "2025-10-05",
      checkOut: "2025-10-07",
      status: "confirmed",
      source: "direct",
      package: "bed-breakfast",
      totalAmount: 141.00
    };
    
    setBookings(prev => [...prev, newBooking]);
    setIsNewBookingOpen(false);
  };

  const handleCheckIn = (booking: Booking) => {
    console.log('Check-in booking:', booking);
    // Update booking status to checked-in in local state
    setBookings(prev =>
      prev.map(b =>
        b.id === booking.id ? { ...b, status: 'checked-in' } : b
      )
    );
  };

  const handleCheckOut = (booking: Booking) => {
    console.log('Check-out booking:', booking);
    // Update booking status to checked-out in local state
    setBookings(prev =>
      prev.map(b =>
        b.id === booking.id ? { ...b, status: 'checked-out' } : b
      )
    );
  };

  const handleCancelBooking = (booking: Booking) => {
    console.log('Cancel booking:', booking);
    // Update booking status to cancelled in local state
    setBookings(prev =>
      prev.map(b =>
        b.id === booking.id ? { ...b, status: 'cancelled' } : b
      )
    );
  };

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date);
    // In a real app, this would open a booking form for the selected date
  };

  const handleBookingClick = (booking: Booking) => {
    console.log('Booking clicked:', booking);
    // In a real app, this would open booking details
  };

  const handleCloseModal = () => {
    setIsNewBookingOpen(false);
    setEditingBooking(null);
  };

  const handleNewBookingClick = () => {
    setEditingBooking(null);
    setIsNewBookingOpen(true);
  };

  return (
    <AdminReceptionistLayout role="admin">
      <div className="p-6">
        {/* Header with View Toggle and New Booking Button */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bookings & Reservations
            </h1>
            <p className="text-gray-600">
              Manage guest reservations and check-ins
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* View Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'calendar' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Calendar View"
              >
                <Calendar className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={handleNewBookingClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              New Booking
            </button>
          </div>
        </div>

        {/* 5 Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Card 1 - Total Bookings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>

          {/* Card 2 - Confirmed */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.confirmed}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>

          {/* Card 3 - Checked-in */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.checkedIn}</div>
            <div className="text-sm text-gray-600">Checked-in</div>
          </div>

          {/* Card 4 - Today's Check-ins */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.todayCheckIns}</div>
            <div className="text-sm text-gray-600">Today's Check-ins</div>
          </div>

          {/* Card 5 - Today's Check-outs */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.todayCheckOuts}</div>
            <div className="text-sm text-gray-600">Today's Check-outs</div>
          </div>
        </div>

        {/* Dynamic Content based on View Mode */}
        <div className="max-w-8xl mx-auto">
          {viewMode === 'calendar' ? (
            <BookingCalendar
              bookings={bookings}
              onDateClick={handleDateClick}
              onBookingClick={handleBookingClick}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Booking List</h2>
                  <p className="text-gray-600 mt-1">
                    Showing {bookings.length} bookings
                  </p>
                </div>
              </div>
              <BookingList
                bookings={bookings}
                guests={guests}
                onEdit={handleEditBooking}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                onCancel={handleCancelBooking}
              />
            </div>
          )}
        </div>
      </div>

      {/* New Booking Modal */}
      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={handleCloseModal}
        editingBooking={editingBooking}
        onUpdateBooking={handleUpdateBooking}
      />
    </AdminReceptionistLayout>
  );
}