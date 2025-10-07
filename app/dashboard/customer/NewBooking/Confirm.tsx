// app/dashboard/customer/NewBooking/Confirm.tsx
"use client";

import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to prepare data for API submission
  const prepareBookingData = () => {
    return {
      guestInfo: {
        firstName: data.guestInfo.firstName,
        lastName: data.guestInfo.lastName,
        email: data.guestInfo.email,
        phone: data.guestInfo.phone,
      },
      bookingDetails: {
        roomType: data.bookingDetails.roomType,
        checkIn: data.bookingDetails.checkIn,
        checkOut: data.bookingDetails.checkOut,
        adults: data.bookingDetails.adults,
        children: data.bookingDetails.children,
        rooms: data.bookingDetails.rooms,
      },
      preferences: {
        bedType: data.preferences.bedType,
        mealPlan: data.preferences.mealPlan,
        specialRequests: data.preferences.specialRequests,
      },
      // Add timestamp and status
      timestamp: new Date().toISOString(),
      status: "confirmed",
    };
  };

  // Function to validate data before submission
  const validateBookingData = () => {
    const requiredFields = [
      data.guestInfo.firstName,
      data.guestInfo.lastName,
      data.guestInfo.email,
      data.guestInfo.phone,
      data.bookingDetails.roomType,
      data.bookingDetails.checkIn,
      data.bookingDetails.checkOut,
    ];

    if (requiredFields.some(field => !field || field === "Not selected" || field === "Select an Option")) {
      return "Please fill in all required fields before confirming.";
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.guestInfo.email)) {
      return "Please enter a valid email address.";
    }

    return null;
  };

  const handleConfirm = async () => {
    // Validate data first
    const validationError = validateBookingData();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prepare the data for API submission
      const bookingData = prepareBookingData();
      
      console.log("Booking data prepared for API:", bookingData);

      // TODO: Replace this with your actual API call
      // Example API call structure:
      /*
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const result = await response.json();
      console.log("Booking created successfully:", result);
      */

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, show success message
      alert("Booking confirmed successfully!");
      
      // Call onComplete to close modal or proceed to next step
      if (onComplete) {
        onComplete();
      }

    } catch (err) {
      console.error("Error confirming booking:", err);
      setError("Failed to confirm booking. Please try again.");
      alert("Failed to confirm booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "Not selected") return "Not selected";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Booking</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      <div className="space-y-4">
        {/* Guest Information Summary */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Guest Information</h3>
          <div className="bg-gray-50 p-3 rounded-lg text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-gray-500">First Name</p>
                <p className="font-medium text-gray-800">{data.guestInfo.firstName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Name</p>
                <p className="font-medium text-gray-800">{data.guestInfo.lastName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{data.guestInfo.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{data.guestInfo.phone || "Not provided"}</p>
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
                <p className="font-medium text-gray-800">{formatDate(data.bookingDetails.checkIn)}</p>
              </div>
              <div>
                <p className="text-gray-500">Check-out</p>
                <p className="font-medium text-gray-800">{formatDate(data.bookingDetails.checkOut)}</p>
              </div>
              <div>
                <p className="text-gray-500">Adults</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.adults || 0}</p>
              </div>
              <div>
                <p className="text-gray-500">Children</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.children || 0}</p>
              </div>
              <div>
                <p className="text-gray-500">Rooms</p>
                <p className="font-medium text-gray-800">{data.bookingDetails.rooms || 1}</p>
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
            disabled={isLoading}
            className="bg-gray-100 text-gray-600 px-5 py-2 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-green-500 text-white px-5 py-2 text-sm rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                Confirm Booking ✓
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}