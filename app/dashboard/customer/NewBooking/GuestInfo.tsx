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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Section Titles */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Guest Information</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              required
              value={data.guestInfo.firstName}
              onChange={(e) => updateData('guestInfo', { firstName: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
              placeholder="First name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={data.guestInfo.lastName}
              onChange={(e) => updateData('guestInfo', { lastName: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
              placeholder="Last name"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={data.guestInfo.email}
            onChange={(e) => updateData('guestInfo', { email: e.target.value })}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
            placeholder="email@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="flex">
            <div className="flex items-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-600">
              +94
            </div>
            <input
              type="tel"
              required
              value={data.guestInfo.phone}
              onChange={(e) => updateData('guestInfo', { phone: e.target.value })}
              className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
              placeholder="+94 XXX XXX XXX"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
}