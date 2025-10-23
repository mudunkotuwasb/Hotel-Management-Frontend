"use client";

import { useEffect, useState } from "react";
import { Clock, Users, Bus, Edit2, Power, Trash2 } from "lucide-react";
import AddPackageModal from "./AddPackageModal";

interface Package {
  id: number;
  name: string;
  description: string;
  maxParticipants: number;
  price: number;
  duration: string;
  vehicle: string;
  status: string;
  location: string;
}

export default function TripPackagesView() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  // Add API endpoint
  /*
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/trip-packages');
        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        } else {
          console.error('Failed to fetch packages');
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);
  */

  // Temporary data
  useEffect(() => {
    const staticPackages = [
      {
        id: 1,
        name: "City Heritage Tour",
        description:
          "Explore the rich history and culture of our beautiful city with a guided tour through historic landmarks, museums, and local markets.",
        maxParticipants: 15,
        price: 75,
        duration: "1 day",
        vehicle: "Comfort Bus",
        status: "Active",
        location: "Historic City Center",
      },
      {
        id: 2,
        name: "Mountain Adventure",
        description:
          "Experience breathtaking mountain views and fresh air with our guided hiking tour through scenic trails and natural wonders.",
        maxParticipants: 8,
        price: 120,
        duration: "2 days",
        vehicle: "Adventure Van",
        status: "Active",
        location: "End Mountain Range",
      },
      {
        id: 3,
        name: "Coastal Paradise",
        description:
          "Relax and comfort at pristine beaches with crystal clear waters, perfect for swimming, snorkeling, and beach activities.",
        maxParticipants: 12,
        price: 90,
        duration: "1 day",
        vehicle: "Luxury Sedan",
        status: "Active",
        location: "Golden Coast",
      },
    ];
    setPackages(staticPackages);
    setLoading(false);
  }, []);

  const handleEditClick = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsEditModalOpen(true);
  };

  const handleUpdatePackage = (updatedPackage: any) => {
    // Add update API endpoint
    /*
    try {
      const response = await fetch(`/api/trip-packages/${editingPackage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPackage),
      });
      
      if (response.ok) {
        const updated = await response.json();
        // Update local state
        setPackages(prev => prev.map(pkg => pkg.id === editingPackage.id ? updated : pkg));
        setIsEditModalOpen(false);
        setEditingPackage(null);
      } else {
        console.error('Failed to update package');
      }
    } catch (error) {
      console.error('Error updating package:', error);
    }
    */

    // Temporary console log until API is implemented
    console.log("Package to be updated:", updatedPackage);
    setIsEditModalOpen(false);
    setEditingPackage(null);
  };

  const handleDeletePackage = async (packageId: number) => {
    // Add delete API endpoint
    /*
    try {
      const response = await fetch(`/api/trip-packages/${packageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove from local state
        setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
      } else {
        console.error('Failed to delete package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
    */

    // Temporary implementation until API is ready
    console.log("Package to be deleted:", packageId);
    setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
  };

  const handleToggleStatus = async (pkg: Package) => {
    const newStatus = pkg.status === "Active" ? "Inactive" : "Active";
    
    // Add status update API endpoint
    /*
    try {
      const response = await fetch(`/api/trip-packages/${pkg.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        const updated = await response.json();
        // Update local state
        setPackages(prev => prev.map(packageItem => 
          packageItem.id === pkg.id ? { ...packageItem, status: newStatus } : packageItem
        ));
      } else {
        console.error('Failed to update package status');
      }
    } catch (error) {
      console.error('Error updating package status:', error);
    }
    */

    // Temporary implementation until API is ready
    console.log(`Package ${pkg.id} status to be updated to:`, newStatus);
    setPackages(prev => prev.map(packageItem => 
      packageItem.id === pkg.id ? { ...packageItem, status: newStatus } : packageItem
    ));
  };

  if (loading) {
    return (
      <div className="text-center text-black py-8">Loading packages...</div>
    );
  }

  return (
    <div className="text-black">
      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow border border-black"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#1954EB"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6L6.75 18.75L12 13.5l2.25 2.25L18 9.75m-7.5-3.75H3.75"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-semibold truncate">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm truncate">
                    {pkg.location}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 md:px-3 py-1 rounded-full flex-shrink-0 ml-2 ${
                pkg.status === "Active" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-gray-100 text-gray-700"
              }`}>
                {pkg.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4 text-xs md:text-sm leading-relaxed line-clamp-3">
              {pkg.description}
            </p>

            {/* Features */}
            <div className="space-y-2 mb-4 text-gray-700 text-xs md:text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
                <span className="truncate">{pkg.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
                <span className="truncate">
                  Max {pkg.maxParticipants} participants
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Bus className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
                <span className="truncate">{pkg.vehicle}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-blue-600 font-bold text-lg md:text-xl mb-4">
              ${pkg.price}
            </div>

            {/* Buttons - Icons only with equal spacing */}
            <div className="flex items-center justify-between">
              <button
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                onClick={() => handleEditClick(pkg)}
              >
                <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button 
                className={`p-2 rounded-lg transition-colors ${
                  pkg.status === "Active" 
                    ? "bg-orange-50 text-orange-600 hover:bg-orange-100" 
                    : "bg-green-50 text-green-600 hover:bg-green-100"
                }`}
                onClick={() => handleToggleStatus(pkg)}
              >
                <Power className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button 
                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                onClick={() => handleDeletePackage(pkg.id)}
              >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Package Modal */}
      <AddPackageModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPackage(null);
        }}
        packageData={editingPackage}
        isEditMode={true}
        onUpdate={handleUpdatePackage}
      />
    </div>
  );
}