"use client";

import { useState, useEffect } from "react";

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

interface NewBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingBooking?: Booking | null;
    onUpdateBooking?: (booking: Booking) => void;
}

// Country data with country codes and expected digit lengths
interface Country {
    code: string;
    name: string;
    phoneDigits: number;
    example: string;
}

const countries: Country[] = [
    { code: "+94", name: "Sri Lanka", phoneDigits: 9, example: "760000000" },
    { code: "+91", name: "India", phoneDigits: 10, example: "9876543210" },
    { code: "+1", name: "USA/Canada", phoneDigits: 10, example: "5551234567" },
    { code: "+44", name: "UK", phoneDigits: 10, example: "2079460958" },
    { code: "+61", name: "Australia", phoneDigits: 9, example: "412345678" },
    { code: "+65", name: "Singapore", phoneDigits: 8, example: "91234567" },
    { code: "+60", name: "Malaysia", phoneDigits: 9, example: "123456789" },
    { code: "+66", name: "Thailand", phoneDigits: 9, example: "812345678" },
    { code: "+81", name: "Japan", phoneDigits: 10, example: "9012345678" },
    { code: "+82", name: "South Korea", phoneDigits: 9, example: "101234567" },
    { code: "+86", name: "China", phoneDigits: 11, example: "13123456789" },
    { code: "+971", name: "UAE", phoneDigits: 9, example: "501234567" },
    { code: "+973", name: "Bahrain", phoneDigits: 8, example: "36001234" },
    { code: "+974", name: "Qatar", phoneDigits: 8, example: "33123456" },
    { code: "+966", name: "Saudi Arabia", phoneDigits: 9, example: "551234567" },
];

export default function NewBookingModal({
    isOpen,
    onClose,
    editingBooking = null,
    onUpdateBooking
}: NewBookingModalProps) {
    const [formData, setFormData] = useState({
        firstName: "Lahiru",
        lastName: "Ellepola",
        email: "lahiruellepola@gmail.com",
        countryCode: "+94",
        phone: "760000000",
        checkIn: "2025-09-23",
        checkOut: "2025-09-24",
        adults: 2,
        children: 0,
        rooms: 1,
        roomType: "Deluxe",
        roomNo: ["Room 101"],
        bedPreference: "Double",
        mealPlan: "Bed & Breakfast",
        specialRequest: "Near pool"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const availableRooms = ["Room 101", "Room 102", "Room 103", "Room 104", "Room 105", "Room 201", "Room 202", "Room 203"];

    // Get current country details
    const currentCountry = countries.find(country => country.code === formData.countryCode) || countries[0];

    // Initialize form with editing booking data
    useEffect(() => {
        if (editingBooking) {
            const mockGuest = {
                firstName: "Lahiru",
                lastName: "Ellepola",
                email: "lahiruellepola@gmail.com",
                phone: "760000000"
            };

            setFormData({
                firstName: mockGuest.firstName,
                lastName: mockGuest.lastName,
                email: mockGuest.email,
                countryCode: "+94",
                phone: mockGuest.phone,
                checkIn: editingBooking.checkIn,
                checkOut: editingBooking.checkOut,
                adults: 2,
                children: 0,
                rooms: 1,
                roomType: "Deluxe",
                roomNo: [editingBooking.roomId],
                bedPreference: "Double",
                mealPlan: editingBooking.package === 'room-only' ? 'Room Only' :
                    editingBooking.package === 'bed-breakfast' ? 'Bed & Breakfast' :
                        editingBooking.package === 'half-board' ? 'Half Board' : 'Full Board',
                specialRequest: "Near pool"
            });
        } else {
            setFormData({
                firstName: "Lahiru",
                lastName: "Ellepola",
                email: "lahiruellepola@gmail.com",
                countryCode: "+94",
                phone: "760000000",
                checkIn: "2025-09-23",
                checkOut: "2025-09-24",
                adults: 2,
                children: 0,
                rooms: 1,
                roomType: "Deluxe",
                roomNo: ["Room 101"],
                bedPreference: "Double",
                mealPlan: "Bed & Breakfast",
                specialRequest: "Near pool"
            });
        }
        setFieldErrors({});
        setSubmitError(null);
    }, [editingBooking]);

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string, country: Country): boolean => {
        // Remove all non-digit characters
        const cleanPhone = phone.replace(/\D/g, '');
        // Check if the cleaned phone number has the correct length
        return cleanPhone.length === country.phoneDigits;
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Required field validation
        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required";
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            errors.email = "Please enter a valid email address with @ symbol";
        }

        // Phone validation
        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!validatePhone(formData.phone, currentCountry)) {
            errors.phone = `${currentCountry.name} phone number must be exactly ${currentCountry.phoneDigits} digits (no spaces)`;
        }

        // Date validation
        if (!formData.checkIn) {
            errors.checkIn = "Check-in date is required";
        }

        if (!formData.checkOut) {
            errors.checkOut = "Check-out date is required";
        } else if (formData.checkIn && formData.checkOut) {
            const checkInDate = new Date(formData.checkIn);
            const checkOutDate = new Date(formData.checkOut);
            if (checkOutDate <= checkInDate) {
                errors.checkOut = "Check-out date must be after check-in date";
            }
        }

        // Room type validation
        if (!formData.roomType) {
            errors.roomType = "Room type is required";
        }

        // Room selection validation
        if (formData.roomNo.length !== formData.rooms) {
            errors.roomNo = "Please select all required rooms";
        } else {
            for (let i = 0; i < formData.roomNo.length; i++) {
                if (!formData.roomNo[i]) {
                    errors.roomNo = `Please select room ${i + 1}`;
                    break;
                }
            }
        }

        // Bed preference validation
        if (!formData.bedPreference) {
            errors.bedPreference = "Bed preference is required";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const updateCounter = (field: 'adults' | 'children' | 'rooms', increment: boolean) => {
        setFormData(prev => {
            const newValue = Math.max(0, prev[field] + (increment ? 1 : -1));

            if (field === 'rooms') {
                const currentRooms = prev.roomNo;
                let newRooms = [...currentRooms];

                if (increment && newValue > currentRooms.length) {
                    const availableRoom = availableRooms.find(room => !currentRooms.includes(room));
                    if (availableRoom) {
                        newRooms.push(availableRoom);
                    }
                } else if (!increment && newValue < currentRooms.length) {
                    newRooms = newRooms.slice(0, newValue);
                }

                return {
                    ...prev,
                    [field]: newValue,
                    roomNo: newRooms
                };
            }

            return {
                ...prev,
                [field]: newValue
            };
        });
    };

    const handleRoomSelection = (room: string, index: number) => {
        setFormData(prev => {
            const newRoomNo = [...prev.roomNo];
            newRoomNo[index] = room;
            return {
                ...prev,
                roomNo: newRoomNo
            };
        });
        if (fieldErrors.roomNo) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.roomNo;
                return newErrors;
            });
        }
    };

    const handleCountryCodeChange = (countryCode: string) => {
        const newCountry = countries.find(country => country.code === countryCode) || countries[0];
        setFormData(prev => ({
            ...prev,
            countryCode,
            phone: ""
        }));

        if (fieldErrors.phone) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.phone;
                return newErrors;
            });
        }
    };

    const handlePhoneChange = (value: string) => {
        const cleanValue = value.replace(/\D/g, '');

        // Limit length based on country
        if (cleanValue.length > currentCountry.phoneDigits) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            phone: cleanValue
        }));

        if (fieldErrors.phone) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.phone;
                return newErrors;
            });
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (fieldErrors[field]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }

        // Remove spaces from email
        if (field === 'email') {
            const cleanValue = value.replace(/\s/g, '');
            setFormData(prev => ({
                ...prev,
                email: cleanValue
            }));
        }
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

    // API INTEGRATION SECTION - CREATE BOOKING
    const handleCreateBooking = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const API_URL = "ADD_BOOKING_API_ENDPOINT_HERE";

            const bookingData = {
                guest: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.countryCode + formData.phone
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
                    totalAmount: 141.00 * formData.rooms
                }
            };

            console.log("Booking created successfully:", bookingData);
            onClose();

        } catch (error) {
            console.error("Error creating booking:", error);
            setSubmitError(error instanceof Error ? error.message : "Failed to create booking");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateBooking = async () => {
        if (!editingBooking) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const API_URL = `UPDATE_BOOKING_API_ENDPOINT_HERE/${editingBooking.id}`;

            const updatedBookingData = {
                guest: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.countryCode + formData.phone
                },
                booking: {
                    id: editingBooking.id,
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
                    status: editingBooking.status,
                    totalAmount: editingBooking.totalAmount * formData.rooms
                }
            };

            console.log("Booking updated successfully:", updatedBookingData);

            if (onUpdateBooking) {
                const updatedBooking: Booking = {
                    ...editingBooking,
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut,
                    roomId: formData.roomNo[0].replace('Room ', ''),
                    package: formData.mealPlan === 'Room Only' ? 'room-only' :
                        formData.mealPlan === 'Bed & Breakfast' ? 'bed-breakfast' :
                            formData.mealPlan === 'Half Board' ? 'half-board' : 'full-board'
                };
                onUpdateBooking(updatedBooking);
            }

            onClose();

        } catch (error) {
            console.error("Error updating booking:", error);
            setSubmitError(error instanceof Error ? error.message : "Failed to update booking");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmBooking = () => {
        if (!validateForm()) {
            setSubmitError("Please fix the validation errors before proceeding");
            return;
        }

        setSubmitError(null);

        if (editingBooking) {
            handleUpdateBooking();
        } else {
            handleCreateBooking();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="p-4 border-b border-gray-300">
                    <h2 className="text-xl font-bold text-gray-900">
                        {editingBooking ? 'Edit Booking' : 'New Booking'}
                    </h2>
                </div>

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
                                                className={`w-full border rounded px-3 py-2 text-sm text-gray-900 ${fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="First Name"
                                            />
                                            {fieldErrors.firstName && (
                                                <p className="text-red-500 text-xs mt-1">{fieldErrors.firstName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-900 mb-1">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                className={`w-full border rounded px-3 py-2 text-sm text-gray-900 ${fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Last Name"
                                            />
                                            {fieldErrors.lastName && (
                                                <p className="text-red-500 text-xs mt-1">{fieldErrors.lastName}</p>
                                            )}
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
                                            className={`w-full border rounded px-3 py-2 text-sm text-gray-900 ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="email@example.com"
                                        />
                                        {fieldErrors.email && (
                                            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-1">
                                            Phone Number *
                                        </label>
                                        <div className="flex">
                                            <select
                                                value={formData.countryCode}
                                                onChange={(e) => handleCountryCodeChange(e.target.value)}
                                                className="border border-gray-300 rounded-l px-3 py-2 text-sm bg-gray-100 text-gray-900 w-32"
                                            >
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.code} {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handlePhoneChange(e.target.value)}
                                                className={`flex-1 border border-l-0 rounded-r px-3 py-2 text-sm text-gray-900 ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder={`e.g., ${currentCountry.example}`}
                                                maxLength={currentCountry.phoneDigits}
                                            />
                                        </div>
                                        {fieldErrors.phone && (
                                            <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            {currentCountry.name}: {currentCountry.phoneDigits} digits required (no spaces)
                                        </p>
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
                                                className={`w-full border rounded px-3 py-2 text-sm text-gray-900 ${fieldErrors.checkIn ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {fieldErrors.checkIn && (
                                                <p className="text-red-500 text-xs mt-1">{fieldErrors.checkIn}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-900 mb-1">
                                                Check-out *
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.checkOut}
                                                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                                                className={`w-full border rounded px-3 py-2 text-sm text-gray-900 ${fieldErrors.checkOut ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {fieldErrors.checkOut && (
                                                <p className="text-red-500 text-xs mt-1">{fieldErrors.checkOut}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Adults and Children */}
                                    <div className="grid grid-cols-2 gap-3">
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
                                            className={`w-full border rounded px-3 py-2 text-sm text-gray-900 ${fieldErrors.roomType ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select Room Type</option>
                                            <option>Standard</option>
                                            <option>Deluxe</option>
                                            <option>Suite</option>
                                        </select>
                                        {fieldErrors.roomType && (
                                            <p className="text-red-500 text-xs mt-1">{fieldErrors.roomType}</p>
                                        )}
                                    </div>

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
                                        <div className="space-y-2">
                                            {Array.from({ length: formData.rooms }).map((_, index) => (
                                                <select
                                                    key={index}
                                                    value={formData.roomNo[index] || ""}
                                                    onChange={(e) => handleRoomSelection(e.target.value, index)}
                                                    className={`w-full border rounded px-3 py-2 text-sm text-gray-900 ${fieldErrors.roomNo ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                >
                                                    <option value="">Select Room {index + 1}</option>
                                                    {availableRooms
                                                        .filter(room => !formData.roomNo.includes(room) || room === formData.roomNo[index])
                                                        .map(room => (
                                                            <option key={room} value={room}>
                                                                {room}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            ))}
                                        </div>
                                        {fieldErrors.roomNo && (
                                            <p className="text-red-500 text-xs mt-1">{fieldErrors.roomNo}</p>
                                        )}
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
                                        {fieldErrors.bedPreference && (
                                            <p className="text-red-500 text-xs mt-1">{fieldErrors.bedPreference}</p>
                                        )}
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
                                            <option>Room Only</option>
                                            <option>Bed & Breakfast</option>
                                            <option>Half Board</option>
                                            <option>Full Board</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-900 mb-1">
                                            Special Requests (Optional)
                                        </label>
                                        <textarea
                                            value={formData.specialRequest}
                                            onChange={(e) => handleInputChange('specialRequest', e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900"
                                            rows={2}
                                            placeholder="Any special requests (optional)..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Preview */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">Preview</h3>

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
                                        <span className="font-medium">Phone:</span> {formData.countryCode} {formData.phone}
                                    </p>
                                </div>
                            </div>

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
                                        <span className="font-medium">Rooms:</span> {formData.roomNo.join(', ')}
                                    </p>
                                </div>
                            </div>

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
                                        <span className="font-medium">Special Request:</span> {formData.specialRequest || 'None'}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-300 pt-3">
                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-900">Sub Total:</span>
                                        <span className="text-gray-900">${(128.50 * formData.rooms).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-900">Service Fee:</span>
                                        <span className="text-gray-900">${(12.50 * formData.rooms).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-900">Discount:</span>
                                        <span className="text-gray-900">$0</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-sm border-t border-gray-300 pt-2">
                                        <span className="text-gray-900">Total:</span>
                                        <span className="text-gray-900">${(141.00 * formData.rooms).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                editingBooking ? "Update Booking" : "Confirm Booking"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}