// app/dashboard/customer/Profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, Save, Edit, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import CustomerLayout from "../../../components/layout/CustomerLayout";
import Link from "next/link";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  preferences: {
    nonSmoking: boolean;
    highFloor: boolean;
    lateCheckout: boolean;
    newsletter: boolean;
  };
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem("currentUser");
        
        if (userData) {
          const userProfile: UserProfile = JSON.parse(userData);
          setUser(userProfile);
          setFormData({
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
          });
        } else {
          // if user is logged in demo accounts
          const demoUserData = getDemoUserData();
          if (demoUserData) {
            setUser(demoUserData);
            setFormData({
              name: demoUserData.name,
              email: demoUserData.email,
              phone: demoUserData.phone,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to get demo user data based on email
  const getDemoUserData = (): UserProfile | null => {
    if (typeof window === 'undefined') return null;

    const currentUserEmail = localStorage.getItem("currentUserEmail");
    
    if (currentUserEmail) {
      // Return demo user data based on email
      const demoUsers: { [key: string]: UserProfile } = {
        "customer@example.com": {
          id: "demo_customer",
          name: "Demo Customer",
          email: "customer@example.com",
          phone: "+1-555-0789",
          joinDate: "January 15, 2024",
          preferences: {
            nonSmoking: true,
            highFloor: true,
            lateCheckout: false,
            newsletter: true,
          }
        },
        "admin@hotel.com": {
          id: "demo_admin",
          name: "Admin User",
          email: "admin@hotel.com",
          phone: "+1-555-0001",
          joinDate: "January 1, 2024",
          preferences: {
            nonSmoking: true,
            highFloor: false,
            lateCheckout: true,
            newsletter: true,
          }
        },
        "receptionist@hotel.com": {
          id: "demo_receptionist",
          name: "Receptionist User",
          email: "receptionist@hotel.com",
          phone: "+1-555-0002",
          joinDate: "January 10, 2024",
          preferences: {
            nonSmoking: true,
            highFloor: true,
            lateCheckout: true,
            newsletter: false,
          }
        }
      };

      return demoUsers[currentUserEmail] || null;
    }

    return null;
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const updatedUser: UserProfile = {
        ...user,
        name: formData.name,
        phone: formData.phone,
      };

      if (user.id.startsWith("user_")) {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
      } else {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }

      setUser(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handlePreferenceChange = (preference: keyof UserProfile['preferences']) => {
    if (!user) return;

    const updatedUser: UserProfile = {
      ...user,
      preferences: {
        ...user.preferences,
        [preference]: !user.preferences[preference],
      },
    };

    setUser(updatedUser);
    
    // Save preferences for both registered and demo users
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
    // For registered users, also update their main profile
    if (user.id.startsWith("user_")) {
      localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
    }
  };

  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </CustomerLayout>
    );
  }

  if (!user) {
    return (
      <CustomerLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogIn className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view your profile. Please sign in to access your account information.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <LogIn className="h-5 w-5" />
              Go to Login
            </Link>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account information</p>
            {user.id.startsWith("demo_") && (
              <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm">
                  <strong>Demo Account:</strong> Some features may be limited in demo mode.
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  {!user.id.startsWith("demo_") && (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Edit className="h-4 w-4" />
                      {isEditing ? "Cancel" : "Edit"}
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900 font-medium">{user.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">{user.email}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  {/* Join Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">{user.joinDate}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900 font-medium">{user.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Preferences */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>

                <div className="space-y-4">
                  {/* Non-smoking Room */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Non-smoking room
                    </label>
                    <button
                      onClick={() => handlePreferenceChange('nonSmoking')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        user.preferences.nonSmoking ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          user.preferences.nonSmoking ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* High Floor Preference */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      High floor preference
                    </label>
                    <button
                      onClick={() => handlePreferenceChange('highFloor')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        user.preferences.highFloor ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          user.preferences.highFloor ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Late Checkout */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Late checkout preference
                    </label>
                    <button
                      onClick={() => handlePreferenceChange('lateCheckout')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        user.preferences.lateCheckout ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          user.preferences.lateCheckout ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}