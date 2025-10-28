// app/dashboard/customer/bookings/NewBookingModal.tsx
"use client";

import { useState } from "react";
import GuestInfo from "./GuestInfo";
import BookingDetails from "./BookingDetails";
import Preferences from "./Preferences";
import Confirm from "./Confirm";

export type BookingData = {
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  bookingDetails: {
    roomType: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
  };
  preferences: {
    bedType: string;
    mealPlan: string;
    specialRequests: string;
  };
};

interface NewBookingModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function NewBookingModal({
  onClose,
  onComplete,
}: NewBookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    guestInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    bookingDetails: {
      roomType: "",
      checkIn: "",
      checkOut: "",
      adults: 0,
      children: 0,
      rooms: 0,
    },
    preferences: {
      bedType: "",
      mealPlan: "Select an Option",
      specialRequests: "",
    },
  });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const updateBookingData = (section: keyof BookingData, data: any) => {
    setBookingData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const handleComplete = () => {
    onComplete();
  };

  const steps = [
    { number: 1, title: "Guest Info", component: GuestInfo },
    { number: 2, title: "Booking Details", component: BookingDetails },
    { number: 3, title: "Preferences", component: Preferences },
    { number: 4, title: "Confirm", component: Confirm },
  ];

  const CurrentComponent = steps[currentStep - 1]?.component;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
        {/* Compact Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">New Booking</h2>
            <p className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Compact Progress - Titles below numbers */}
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center flex-1"
              >
                <div className="flex items-center w-full">
                  {/* Step number and title container */}
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                        currentStep >= step.number
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`mt-1 text-xs font-medium text-center ${
                        currentStep >= step.number
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {/* Connector line (except for last step) */}
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        currentStep > step.number
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {CurrentComponent && (
            <CurrentComponent
              data={bookingData}
              updateData={updateBookingData}
              nextStep={nextStep}
              prevStep={prevStep}
              currentStep={currentStep}
              totalSteps={steps.length}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
