// app/dashboard/customer/NewBooking/BookingDetails.tsx
"use client";

import { BookingData } from "../bookings/NewBookingModal";

interface BookingDetailsProps {
  data: BookingData;
  updateData: (section: keyof BookingData, data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function BookingDetails({ data, updateData, nextStep, prevStep }: BookingDetailsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const roomTypes = [
    "Standard Room",
    "Deluxe Room",
    "Executive Suite",
    "Presidential Suite",
    "Family Room"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Check-in Date *
            </label>
            <input
              type="date"
              required
              value={data.bookingDetails.checkIn}
              onChange={(e) => updateData('bookingDetails', { checkIn: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-black"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Check-out Date *
            </label>
            <input
              type="date"
              required
              value={data.bookingDetails.checkOut}
              onChange={(e) => updateData('bookingDetails', { checkOut: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">
              Adults:
            </label>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={() => updateData('bookingDetails', {
                  adults: Math.max(0, (data.bookingDetails.adults || 0) - 1)
                })}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                -
              </button>
              <span className="text-sm sm:text-base font-medium text-black min-w-8 sm:min-w-10 text-center">
                {data.bookingDetails.adults || 0}
              </span>
              <button
                type="button"
                onClick={() => updateData('bookingDetails', {
                  adults: (data.bookingDetails.adults || 0) + 1
                })}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">
              Children:
            </label>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={() => updateData('bookingDetails', {
                  children: Math.max(0, (data.bookingDetails.children || 0) - 1)
                })}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                -
              </button>
              <span className="text-sm sm:text-base font-medium text-black min-w-8 sm:min-w-10 text-center">
                {data.bookingDetails.children || 0}
              </span>
              <button
                type="button"
                onClick={() => updateData('bookingDetails', {
                  children: (data.bookingDetails.children || 0) + 1
                })}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
            Room Type *
          </label>
          <select
            required
            value={data.bookingDetails.roomType}
            onChange={(e) => updateData('bookingDetails', { roomType: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-black"
          >
            <option value="">Select a room type</option>
            {roomTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">
            Rooms:
          </label>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              type="button"
              onClick={() => updateData('bookingDetails', {
                rooms: Math.max(0, (data.bookingDetails.rooms || 0) - 1)
              })}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              -
            </button>
            <span className="text-sm sm:text-base font-medium text-black min-w-8 sm:min-w-10 text-center">
              {data.bookingDetails.rooms || 0}
            </span>
            <button
              type="button"
              onClick={() => updateData('bookingDetails', {
                rooms: (data.bookingDetails.rooms || 0) + 1
              })}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
          <button
            type="button"
            onClick={prevStep}
            className="w-full sm:w-auto order-2 sm:order-1 bg-gray-100 text-gray-600 px-5 py-2.5 sm:py-2 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto order-1 sm:order-2 bg-blue-500 text-white px-5 py-2.5 sm:py-2 text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm hover:shadow-md mb-3 sm:mb-0"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
}