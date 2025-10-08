// app/dashboard/customer/RestaurantMenu/page.tsx
"use client";

import { useState, useEffect } from "react";
import CustomerLayout from "../../../components/layout/CustomerLayout";

// Define the menu item interface based on NewMenuItemPopup form data
interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  ingredients: string[];
  price: number;
  discount?: number;
  available: boolean;
  image?: string;
}

export default function RestaurantMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Replace with actual API endpoint
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      // const response = await fetch("/api/menu-items");
      // if (!response.ok) throw new Error("Failed to fetch menu items");
      // const data = await response.json();
      
      // Temporary mock data
      const mockData: MenuItem[] = [
        {
          id: "1",
          name: "Continental Breakfast",
          category: "breakfast",
          description: "Fresh pastries, fruits, coffee, and juice",
          ingredients: ["Pastries", "Fruits", "Coffee", "Juice"],
          price: 15,
          available: true
        },
        {
          id: "2",
          name: "Grilled Salmon",
          category: "dinner",
          description: "Fresh Atlantic salmon with herbs and lemon",
          ingredients: ["Salmon", "Herbs", "Lemon", "Olive Oil"],
          price: 28,
          available: true
        }
      ];
      
      setMenuItems(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load menu");
      console.error("Error fetching menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Get unique categories for filter
  const categories = ["All", ...new Set(menuItems.map(item => 
    item.category.charAt(0).toUpperCase() + item.category.slice(1)
  ))];

  // Filter menu items by selected category
  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => 
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  // Handle order placement
  const handleOrder = async (itemId: string) => {
    try {
      // TODO: Replace with actual API endpoint when available
      // const response = await fetch("/api/orders", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     menuItemId: itemId,
      //     quantity: 1,
      //     // Add other necessary order details
      //   }),
      // });
      
      // if (response.ok) {
      //   // Show success message or update UI
      //   console.log("Order placed successfully");
      // } else {
      //   throw new Error("Failed to place order");
      // }
      
      console.log(`Order placed for item: ${itemId}`);
      // Temporary success handling until API is implemented
      alert("Order placed successfully! This will be integrated with the ordering system.");
      
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return (
      <CustomerLayout>
        <div className="p-4 sm:p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading menu...</div>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  if (error) {
    return (
      <CustomerLayout>
        <div className="p-4 sm:p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">Error: {error}</div>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Restaurant Menu</h1>
            <p className="text-base text-gray-600">Explore our delicious dining options</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Order
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu items found.</p>
            <p className="text-gray-400 text-sm">Please check back later or try a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                {/* Image */}
                {item.image && (
                  <div className="mb-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {/* Title + Price */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-sm text-gray-600 capitalize">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      ${item.price}
                    </div>
                    {item.discount && item.discount > 0 && (
                      <div className="text-sm text-green-600 line-through">
                        ${(item.price + item.discount).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-3">{item.description}</p>

                {/* Ingredients */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>

                {/* Status + Order Now */}
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                  <button
                    onClick={() => handleOrder(item.id)}
                    className={`py-1 px-4 rounded-md font-medium text-sm transition-colors ${
                      item.available
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!item.available}
                  >
                    {item.available ? "Order Now" : "Not Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}