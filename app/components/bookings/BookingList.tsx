"use client";

import { Calendar, CheckCircle, UserCheck, Users, LogOut, User, Bed, Phone, Globe, Home, MapPin } from "lucide-react";

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

interface BookingListProps {
  bookings: Booking[];
  guests: Guest[];
  onEdit?: (booking: Booking) => void;
  onCheckIn?: (booking: Booking) => void;
  onCheckOut?: (booking: Booking) => void;
  onCancel?: (booking: Booking) => void;
}

export default function BookingList({
  bookings,
  guests,
  onEdit,
  onCheckIn,
  onCheckOut,
  onCancel
}: BookingListProps) {
  const getGuestName = (guestId: string) => {
    const guest = guests.find(g => g.id === guestId);
    return guest ? guest.name : 'Unknown Guest';
  };

  const getSourceIcon = (source: Booking['source']) => {
    switch (source) {
      case 'booking.com':
        return <Globe className="h-4 w-4 text-blue-600" />;
      case 'tripadvisor':
        return <Globe className="h-4 w-4 text-green-600" />;
      case 'expedia':
        return <Globe className="h-4 w-4 text-orange-600" />;
      case 'direct':
        return <Home className="h-4 w-4 text-gray-600" />;
      case 'phone':
        return <Phone className="h-4 w-4 text-gray-600" />;
      case 'walk-in':
        return <MapPin className="h-4 w-4 text-gray-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'checked-in':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'checked-out':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusText = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'checked-in':
        return 'Checked-in';
      case 'checked-out':
        return 'Checked-out';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getPackageText = (pkg: Booking['package']) => {
    switch (pkg) {
      case 'room-only':
        return 'Room Only';
      case 'bed-breakfast':
        return 'Bed & Breakfast';
      case 'half-board':
        return 'Half Board';
      case 'full-board':
        return 'Full Board';
      default:
        return 'Room Only';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {getGuestName(booking.guestId)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {booking.guestId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">Room {booking.roomId}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {calculateNights(booking.checkIn, booking.checkOut)} nights
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{getPackageText(booking.package)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getSourceIcon(booking.source)}
                    <span className="ml-2 text-sm text-gray-900 capitalize">
                      {booking.source.replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${booking.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {booking.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => onCheckIn?.(booking)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Check-in
                        </button>
                        <button
                          onClick={() => onEdit?.(booking)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onCancel?.(booking)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === 'checked-in' && (
                      <button
                        onClick={() => onCheckOut?.(booking)}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        Check-out
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">Create a new booking to get started.</p>
        </div>
      )}
    </div>
  );
}