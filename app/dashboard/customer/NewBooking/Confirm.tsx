// app/dashboard/customer/NewBooking/Confirm.tsx
"use client";

import { useState } from "react";
import { BookingData } from "./NewBookingModal";

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
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

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

    if (
      requiredFields.some(
        (field) =>
          !field || field === "Not selected" || field === "Select an Option"
      )
    ) {
      return "Please fill in all required fields before confirming.";
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.guestInfo.email)) {
      return "Please enter a valid email address.";
    }

    if (!agreeToTerms) {
      return "Please agree to the terms & conditions.";
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

      // ADD API Endpoint here:
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success state
      setIsConfirmed(true);
    } catch (err) {
      console.error("Error confirming booking:", err);
      setError("Failed to confirm booking. Please try again.");
      alert("Failed to confirm booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGotIt = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "Not selected") return "Not selected";
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleDateString("en-US", { month: "short" });
      const year = date.getFullYear();

      // Add ordinal suffix to day
      const getOrdinalSuffix = (day: number) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };

      return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    } catch {
      return dateString;
    }
  };

  // Calculate duration in nights
  const calculateDuration = () => {
    if (!data.bookingDetails.checkIn || !data.bookingDetails.checkOut)
      return "0 nights";

    try {
      const checkIn = new Date(data.bookingDetails.checkIn);
      const checkOut = new Date(data.bookingDetails.checkOut);
      const duration = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `${duration} night${duration !== 1 ? "s" : ""}`;
    } catch {
      return "0 nights";
    }
  };

  // Format guest count
  const formatGuestCount = () => {
    const adults = data.bookingDetails.adults || 0;
    const children = data.bookingDetails.children || 0;

    if (adults === 0 && children === 0) return "No guests";

    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults !== 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children !== 1 ? "ren" : ""}`);

    return parts.join(", ");
  };

  // Success Confirmation Screen
  if (isConfirmed) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Booking Confirmed!
        </h2>

        {/* Success Message */}
        <div className="text-gray-600 mb-8 space-y-2">
          <p>Your booking has been successfully confirmed.</p>
          <p>Thank you for choosing Grand Hotel.</p>
        </div>

        {/* Got it Button */}
        <button
          onClick={handleGotIt}
          className="bg-blue-600 text-white px-8 py-3 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          Got it
        </button>
      </div>
    );
  }

  // Original Confirmation Form
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* PREVIEW Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">PREVIEW</h3>

        {/* Guest Information */}
        <div className="mb-6">
          <h4 className="text-base font-bold text-gray-800 mb-3">
            Guest Information
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {data.guestInfo.firstName || "Not provided"}{" "}
              {data.guestInfo.lastName || ""}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {data.guestInfo.email || "Not provided"}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {data.guestInfo.phone || "Not provided"}
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="mb-6">
          <h4 className="text-base font-bold text-gray-800 mb-3">
            Booking Details
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Check-in:</span>{" "}
              {formatDate(data.bookingDetails.checkIn)}
            </p>
            <p>
              <span className="font-medium">Check-out:</span>{" "}
              {formatDate(data.bookingDetails.checkOut)}
            </p>
            <p>
              <span className="font-medium">Duration:</span>{" "}
              {calculateDuration()}
            </p>
            <p>
              <span className="font-medium">Guests:</span> {formatGuestCount()}
            </p>
            <p>
              <span className="font-medium">Room Type:</span>{" "}
              {data.bookingDetails.roomType || "Not selected"}
            </p>
            <p>
              <span className="font-medium">Number of Rooms:</span>{" "}
              {data.bookingDetails.rooms || 1}
            </p>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-6">
          <h4 className="text-base font-bold text-gray-800 mb-3">
            Preferences
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Bed Preference:</span>{" "}
              {data.preferences.bedType
                ? data.preferences.bedType.charAt(0).toUpperCase() +
                  data.preferences.bedType.slice(1)
                : "Not selected"}
            </p>
            <p>
              <span className="font-medium">Meal Plan:</span>{" "}
              {data.preferences.mealPlan &&
              data.preferences.mealPlan !== "Select an Option"
                ? data.preferences.mealPlan
                : "Not selected"}
            </p>
            {data.preferences.specialRequests && (
              <p>
                <span className="font-medium">Special Request:</span>{" "}
                {data.preferences.specialRequests}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I agree to the hotel's terms & conditions
          </span>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={isLoading}
          className="flex-1 bg-gray-100 text-gray-600 px-6 py-3 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={isLoading || !agreeToTerms}
          className="flex-1 bg-blue-600 text-white px-6 py-3 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  );
}
