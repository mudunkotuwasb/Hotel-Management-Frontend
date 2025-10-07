"use client";

import { useState } from "react";

interface NewBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewBookingModal({ isOpen, onClose }: NewBookingModalProps) {
    const [formData, setFormData] = useState({
        firstName: "Lahiru",
        lastName: "Ellepola",
        email: "lahiruellepola@gmail.com",
        phone: "76 000 0000",
        checkIn: "2025-09-23",
        checkOut: "2025-09-24",
        adults: 2,
        children: 0,
        rooms: 1,
        roomType: "Deluxe",
        roomNo: "Room 101",
        bedPreference: "Double",
        mealPlan: "Bed & Breakfast",
        specialRequest: "Near pool"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const updateCounter = (field: 'adults' | 'children' | 'rooms', increment: boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: Math.max(0, prev[field] + (increment ? 1 : -1))
        }));
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = date.getDate();
        const suffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day}${suffix} ${month} ${year}`;
    };

    const calculateDuration = () => {
        if (!formData.checkIn || !formData.checkOut) return 0;
        const start = new Date(formData.checkIn);
        const end = new Date(formData.checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // API INTEGRATION SECTION

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            //Replace actual API endpoint
            const API_URL = "ADD_BOOKING_API_ENDPOINT_HERE";

            const bookingData = {
                guest: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone
                },
                booking: {
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut,
                    duration: calculateDuration(),
                    adults: formData.adults,
                    children: formData.children,
                    rooms: formData.rooms,
                    roomType: formData.roomType,
                    roomNo: formData.roomNo,
                    bedPreference: formData.bedPreference,
                    mealPlan: formData.mealPlan,
                    specialRequest: formData.specialRequest,
                    status: "confirmed",
                    totalAmount: 141.00
                }
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //  Add any required headers like authentication tokens
                    // "Authorization": "Bearer your-token-here"
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                throw new Error(`Failed to create booking: ${response.statusText}`);
            }

            const result = await response.json();

            // Handle successful booking
            console.log("Booking created successfully:", result);
            onClose();
            // alert("Booking created successfully!");

        } catch (error) {
            console.error("Error creating booking:", error);
            setSubmitError(error instanceof Error ? error.message : "Failed to create booking");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmBooking = () => {
        // Basic validation before submission
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            setSubmitError("Please fill in all required personal details");
            return;
        }

        if (!formData.checkIn || !formData.checkOut) {
            setSubmitError("Please select check-in and check-out dates");
            return;
        }

        if (!formData.roomType || !formData.roomNo) {
            setSubmitError("Please select room type and room number");
            return;
        }

        if (!formData.bedPreference) {
            setSubmitError("Please select bed preference");
            return;
        }

        handleSubmit();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="p-4 border-b border-gray-300">
                    <h2 className="text-xl font-bold text-gray-900">New Booking</h2>
                </div>

                {/* Error Message Display */}
                {submitError && (
                    <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                        {submitError}
                    </div>
                )}

                <div className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Form */}
                        <div className="space-y-6">
                            {/* Personal Details */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Personal Details</h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-900 mb-1">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-900 mb-1">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-1">
                                            Phone Number *
                                        </label>
                                        <div className="flex">
                                            <div className="border border-gray-300 rounded-l px-3 py-2 text-sm bg-gray-100 text-gray-600">
                                                +94
                                            </div>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="flex-1 border border-gray-300 border-l-0 rounded-r px-3 py-2 text-sm text-gray-900"
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-300" />

                            {/* Booking Details */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Booking Details</h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-900 mb-1">
                                                Check-in *
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.checkIn}
                                                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-900 mb-1">
                                                Check-out *
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.checkOut}
                                                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                            />
                                        </div>
                                    </div>

                                    {/* Adults and Children */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Adults Counter */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-900 mb-2">Adults</label>
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => updateCounter('adults', false)}
                                                    className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 text-lg"
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm font-medium text-gray-900 min-w-8 text-center">
                                                    {formData.adults}
                                                </span>
                                                <button
                                                    onClick={() => updateCounter('adults', true)}
                                                    className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 text-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Children Counter */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-900 mb-2">Children</label>
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => updateCounter('children', false)}
                                                    className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 text-lg"
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm font-medium text-gray-900 min-w-8 text-center">
                                                    {formData.children}
                                                </span>
                                                <button
                                                    onClick={() => updateCounter('children', true)}
                                                    className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 text-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-1">
                                            Room Type *
                                        </label>
                                        <select
                                            value={formData.roomType}
                                            onChange={(e) => handleInputChange('roomType', e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                        >
                                            <option>Standard</option>
                                            <option>Deluxe</option>
                                            <option>Suite</option>
                                        </select>
                                    </div>

                                    {/* Rooms Counter */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-2">Rooms</label>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => updateCounter('rooms', false)}
                                                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 text-lg"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-medium text-gray-900 min-w-8 text-center">
                                                {formData.rooms}
                                            </span>
                                            <button
                                                onClick={() => updateCounter('rooms', true)}
                                                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 text-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-1">
                                            Room No *
                                        </label>
                                        <select
                                            value={formData.roomNo}
                                            onChange={(e) => handleInputChange('roomNo', e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                        >
                                            <option>Room 101</option>
                                            <option>Room 102</option>
                                            <option>Room 103</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-300" />

                            {/* Preferences */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Preferences</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-2">
                                            Bed Preference *
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Single', 'Double', 'King', 'Twin'].map((type) => (
                                                <label key={type} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="bedPreference"
                                                        checked={formData.bedPreference === type}
                                                        onChange={() => handleInputChange('bedPreference', type)}
                                                        className="mr-2 text-blue-600"
                                                    />
                                                    <span className="text-xs text-gray-900">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-1">
                                            Meal Plan
                                        </label>
                                        <select
                                            value={formData.mealPlan}
                                            onChange={(e) => handleInputChange('mealPlan', e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                        >
                                            <option>Select an Option</option>
                                            <option>Bed & Breakfast</option>
                                            <option>Half Board</option>
                                            <option>Full Board</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-1">
                                            Special Requests
                                        </label>
                                        <textarea
                                            value={formData.specialRequest}
                                            onChange={(e) => handleInputChange('specialRequest', e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                            rows={2}
                                            placeholder="Any special requests..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Preview */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">Preview</h3>

                            {/* Guest Information */}
                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Guest Information</h4>
                                <div className="space-y-1 text-xs">
                                    <p className="text-gray-900">
                                        <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Email:</span> {formData.email}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Phone:</span> +94 {formData.phone}
                                    </p>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Booking Details</h4>
                                <div className="space-y-1 text-xs">
                                    <p className="text-gray-900">
                                        <span className="font-medium">Check-in:</span> {formatDate(formData.checkIn)}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Check-out:</span> {formatDate(formData.checkOut)}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Duration:</span> {calculateDuration()} night{calculateDuration() !== 1 ? 's' : ''}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Guests:</span> {formData.adults} Adult{formData.adults !== 1 ? 's' : ''}, {formData.children} Child{formData.children !== 1 ? 'ren' : ''}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Room Type:</span> {formData.roomType}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Number of Rooms:</span> {formData.rooms}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Room No:</span> {formData.roomNo}
                                    </p>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Preferences</h4>
                                <div className="space-y-1 text-xs">
                                    <p className="text-gray-900">
                                        <span className="font-medium">Bed Preference:</span> {formData.bedPreference}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Meal Plan:</span> {formData.mealPlan}
                                    </p>
                                    <p className="text-gray-900">
                                        <span className="font-medium">Special Request:</span> {formData.specialRequest}
                                    </p>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="border-t border-gray-300 pt-3">
                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-900">Sub Total:</span>
                                        <span className="text-gray-900">$128.50</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-900">Service Fee:</span>
                                        <span className="text-gray-900">$12.50</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-900">Discount:</span>
                                        <span className="text-gray-900">$0</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-sm border-t border-gray-300 pt-2">
                                        <span className="text-gray-900">Total:</span>
                                        <span className="text-gray-900">$141.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-300">
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmBooking}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Confirm Booking"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}