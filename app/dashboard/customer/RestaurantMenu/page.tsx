// app/dashboard/customer/RestaurantMenu/page.tsx
"use client";

import CustomerLayout from "../../../components/layout/CustomerLayout";

// Mock data for menu
const menuItems = [
  {
    id: "1",
    title: "Continental Breakfast",
    category: "Breakfast",
    description: "Fresh pastries, fruits, coffee, and juice",
    ingredients: ["Pastries", "Fruits", "Coffee", "Juice"],
    status: "Available",
    price: 15
  },
  {
    id: "2",
    title: "Grilled Salmon",
    category: "Dinner",
    description: "Fresh Atlantic salmon with herbs and lemon",
    ingredients: ["Salmon", "Herbs", "Lemon", "Olive Oil"],
    status: "Available",
    price: 28
  }
];

export default function RestaurantMenuPage() {
  return (
    <CustomerLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Restaurant Menu</h1>
            <p className="text-base text-gray-600">Explore our delicious dining options</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Order
          </button>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              {/* Title + Price */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className="text-sm text-gray-600">{item.category}</span>
                </div>
                <div className="text-lg font-bold text-gray-900">${item.price}</div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-3">{item.description}</p>

              {/* Ingredients */}
              <div className="flex flex-wrap gap-2 mb-3">
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
                    item.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.status}
                </span>
                <button
                  className={`py-1 px-4 rounded-md font-medium text-sm transition-colors ${
                    item.status === "Available"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={item.status !== "Available"}
                >
                  {item.status === "Available" ? "Order Now" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
