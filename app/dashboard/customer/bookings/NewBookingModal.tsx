// app/dashboard/customer/bookings/NewBookingModal.tsx
"use client";

import { useState } from "react";
import GuestInfo from "../NewBooking/GuestInfo";
import BookingDetails from "../NewBooking/BookingDetails";
import Preferences from "../NewBooking/Preferences";
import Confirm from "../NewBooking/Confirm";


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

export default function NewBookingModal({ onClose, onComplete }: NewBookingModalProps) {
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
    setBookingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
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
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">New Booking</h2>
            <p className="text-gray-600">Complete your hotel reservation</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.number 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-300 text-gray-600"
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? "text-blue-600" : "text-gray-500"
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.number ? "bg-blue-600" : "bg-gray-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[60vh] p-6">
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