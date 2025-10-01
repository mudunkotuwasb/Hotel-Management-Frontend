// app/dashboard/customer/NewBooking/Confirm.tsx
"use client";

import { BookingData } from "../bookings/NewBookingModal";

interface ConfirmProps {
  data: BookingData;
  updateData: (section: keyof BookingData, data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  totalSteps: number;
  onComplete?: () => void;
}

export default function Confirm({ data, prevStep, onComplete }: ConfirmProps) {
  const handleConfirm = () => {
    console.log("Booking confirmed:", data);
    alert("Booking confirmed successfully!");
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Booking</h2>
      
      <div className="space-y-4">
        {/* Guest Information Summary */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Guest Information</h3>
          <div className="bg-gray-50 p-3 rounded-lg text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-gray-500">First Name</p>
                <p className="font-medium text-gray-800">{data.guestInfo.firstName}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Name</p>
                <p className="font-medium text-gray-800">{data.guestInfo.lastName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{data.guestInfo.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{data.guestInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details Summary */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Booking Details</h3>
          <div className="bg-gray-50 p-3 rounded-lg text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-gray-500">Room Type</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.roomType || "Not selected"}</p>
              </div>
              <div>
                <p className="text-gray-500">Check-in</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.checkIn || "Not selected"}</p>
              </div>
              <div>
                <p className="text-gray-500">Check-out</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.checkOut || "Not selected"}</p>
              </div>
              <div>
                <p className="text-gray-500">Adults</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.adults}</p>
              </div>
              <div>
                <p className="text-gray-500">Children</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.children}</p>
              </div>
              <div>
                <p className="text-gray-500">Rooms</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.rooms}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Summary */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preferences</h3>
          <div className="bg-gray-50 p-3 rounded-lg text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-gray-500">Bed Preference</p>
                <p className="font-medium text-gray-800">
                  {data.preferences.bedType ? 
                    data.preferences.bedType.charAt(0).toUpperCase() + data.preferences.bedType.slice(1) 
                    : "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Meal Plan</p>
                <p className="font-medium text-gray-800">
                  {data.preferences.mealPlan && data.preferences.mealPlan !== "Select an Option" 
                    ? data.preferences.mealPlan 
                    : "Not selected"}
                </p>
              </div>
              {data.preferences.specialRequests && (
                <div className="md:col-span-2">
                  <p className="text-gray-500">Special Requests</p>
                  <p className="font-medium text-gray-800">{data.preferences.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-100 text-gray-600 px-5 py-2 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            ← Back
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-5 py-2 text-sm rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            Confirm Booking ✓
          </button>
        </div>
      </div>
    </div>
  );
}