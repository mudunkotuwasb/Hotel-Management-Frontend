// app/dashboard/customer/Profile/page.tsx
"use client";

import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Mock user data for demo accounts
  const demoUsers = {
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

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API endpoint when available
        /*
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        });
        */

        // For now, use localStorage data or demo data
        const storedUser = localStorage.getItem("currentUser");
        const userEmail = localStorage.getItem("currentUserEmail");
        
        if (storedUser) {
          const userData: UserProfile = JSON.parse(storedUser);
          setUser(userData);
          setFormData({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
          });
        } else if (userEmail && demoUsers[userEmail as keyof typeof demoUsers]) {
          // Use demo user data
          const demoUser = demoUsers[userEmail as keyof typeof demoUsers];
          setUser(demoUser);
          setFormData({
            name: demoUser.name,
            email: demoUser.email,
            phone: demoUser.phone,
          });
          // Store for future use
          localStorage.setItem("currentUser", JSON.stringify(demoUser));
        } else {
          // Fallback to customer demo data
          const fallbackUser = demoUsers["customer@example.com"];
          setUser(fallbackUser);
          setFormData({
            name: fallbackUser.name,
            email: fallbackUser.email,
            phone: fallbackUser.phone,
          });
          localStorage.setItem("currentUser", JSON.stringify(fallbackUser));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
        
        // Fallback to customer demo data on error
        const fallbackUser = demoUsers["customer@example.com"];
        setUser(fallbackUser);
        setFormData({
          name: fallbackUser.name,
          email: fallbackUser.email,
          phone: fallbackUser.phone,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (!user) return;

    try {
      // TODO: Replace with actual API endpoint when available
      /*
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      */

      // For now, update localStorage
      const updatedUser: UserProfile = {
        ...user,
        name: formData.name,
        phone: formData.phone,
      };

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handlePreferenceChange = (preference: keyof UserProfile['preferences']) => {
    if (!user) return;

    try {
      const updatedUser: UserProfile = {
        ...user,
        preferences: {
          ...user.preferences,
          [preference]: !user.preferences[preference],
        },
      };

      // TODO: Replace with actual API endpoint when available
      /*
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [preference]: !user.preferences[preference],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }
      */

      // For now, update localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Preferences updated!");
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences");
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
            <h2 className="text-2xl font-bold text-black mb-4">Please Log In</h2>
            <p className="text-black mb-6">
              You need to be logged in to view your profile. Please sign in to access your account information.
            </p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">My Profile</h2>
          <p className="text-black">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Non-smoking room</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={user.preferences.nonSmoking}
                      onChange={() => handlePreferenceChange('nonSmoking')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">High floor preference</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={user.preferences.highFloor}
                      onChange={() => handlePreferenceChange('highFloor')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Late checkout preference</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={user.preferences.lateCheckout}
                      onChange={() => handlePreferenceChange('lateCheckout')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}