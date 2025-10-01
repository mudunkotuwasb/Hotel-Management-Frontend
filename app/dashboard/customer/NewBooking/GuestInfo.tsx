// app/dashboard/customer/NewBooking/GuestInfo.tsx
"use client";

import { BookingData } from "../bookings/NewBookingModal";

interface GuestInfoProps {
  data: BookingData;
  updateData: (section: keyof BookingData, data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function GuestInfo({ data, updateData, nextStep }: GuestInfoProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">Guest Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              First Name *
            </label>
            <input
              type="text"
              required
              value={data.guestInfo.firstName}
              onChange={(e) => updateData('guestInfo', { firstName: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-black"
              placeholder="First name"
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={data.guestInfo.lastName}
              onChange={(e) => updateData('guestInfo', { lastName: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-black"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={data.guestInfo.email}
              onChange={(e) => updateData('guestInfo', { email: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-black"
              placeholder="email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={data.guestInfo.phone}
              onChange={(e) => updateData('guestInfo', { phone: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-black"
              placeholder="+94 XXX XXX XXX"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 sm:pt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2.5 sm:py-2 text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
}