"use client";

import { useState, useEffect } from "react";

//  MenuItem interface based on admin side (NewMenuItemPopup()) form data
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

export default function MenuManagement() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All category");
    const [availabilityFilter, setAvailabilityFilter] = useState<string>("All category");

    // Replace API endpoint
    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            // const response = await fetch("/api/menu-items");
            // if (!response.ok) throw new Error("Failed to fetch menu items");
            // const data = await response.json();

            // mock data
            const mockData: MenuItem[] = [
                {
                    id: "1",
                    name: "Grilled Salmon",
                    category: "dinner",
                    description: "Fresh Atlantic salmon with herbs and lemon",
                    ingredients: ["Salmon", "Herbs", "Lemon", "Olive Oil"],
                    price: 28,
                    available: true
                },
                {
                    id: "2",
                    name: "Continental Breakfast",
                    category: "breakfast",
                    description: "Traditional continental breakfast selection",
                    ingredients: ["Bread", "Butter", "Jam", "Coffee", "Juice"],
                    price: 30,
                    available: true
                }
            ];

            setMenuItems(mockData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load menu items");
            console.error("Error fetching menu items:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    // Get unique categories for filter
    const categories = ["All category", ...new Set(menuItems.map(item =>
        item.category.charAt(0).toUpperCase() + item.category.slice(1)
    ))];

    // Filter menu items by selected category and availability
    const filteredItems = menuItems.filter(item => {
        const categoryMatch = selectedCategory === "All category" ||
            item.category.toLowerCase() === selectedCategory.toLowerCase();
        const availabilityMatch = availabilityFilter === "All category" ||
            (availabilityFilter === "Available" && item.available) ||
            (availabilityFilter === "Unavailable" && !item.available);

        return categoryMatch && availabilityMatch;
    });

    // Calculate statistics
    const totalItems = menuItems.length;
    const availableItems = menuItems.filter(item => item.available).length;
    const unavailableItems = menuItems.filter(item => !item.available).length;
    const totalCategories = new Set(menuItems.map(item => item.category)).size;

    // Handle delete menu item
    const handleDelete = async (itemId: string) => {
        if (!confirm("Are you sure you want to delete this menu item?")) return;

        try {
            // Replace API endpoint
            /* const response = await fetch(`/api/menu-items/${itemId}`, {
               method: "DELETE",
             });
            
             if (response.ok) {
               setMenuItems(prev => prev.filter(item => item.id !== itemId));
             } else {
               throw new Error("Failed to delete menu item");
             }
            */
            setMenuItems(prev => prev.filter(item => item.id !== itemId));
            console.log(`Deleted menu item: ${itemId}`);

        } catch (err) {
            console.error("Error deleting menu item:", err);
            alert("Failed to delete menu item. Please try again.");
        }
    };

    const handleEdit = (itemId: string) => {
        console.log(`Edit menu item: ${itemId}`);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow text-center text-black">
                            <div className="text-2xl font-bold">-</div>
                            <div className="text-gray-600">Loading...</div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-black">
                    <div className="flex justify-center items-center h-32">
                        <div className="text-gray-600">Loading menu items...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow text-black">
                    <div className="text-center text-red-600">
                        <p className="text-lg font-semibold mb-2">Error Loading Menu</p>
                        <p>{error}</p>
                        <button
                            onClick={fetchMenuItems}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Menu Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow text-center text-black">
                    <div className="text-2xl font-bold">{totalItems}</div>
                    <div className="text-gray-600">Total Items</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center text-black">
                    <div className="text-2xl font-bold">{availableItems}</div>
                    <div className="text-gray-600">Available</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center text-black">
                    <div className="text-2xl font-bold">{unavailableItems}</div>
                    <div className="text-gray-600">Unavailable</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center text-black">
                    <div className="text-2xl font-bold">{totalCategories}</div>
                    <div className="text-gray-600">Categories</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow text-black">
                <h3 className="font-semibold mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border rounded px-3 py-2 text-black"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Availability</label>
                        <select
                            value={availabilityFilter}
                            onChange={(e) => setAvailabilityFilter(e.target.value)}
                            className="w-full border rounded px-3 py-2 text-black"
                        >
                            <option value="All">All Items</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white p-6 rounded-lg shadow text-black">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Menu Items</h3>
                    <div className="text-sm text-gray-600">
                        Showing {filteredItems.length} of {menuItems.length} items
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No menu items found.</p>
                        <p className="text-gray-400 text-sm">Try adjusting your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4 text-black hover:shadow-md transition-shadow">
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

                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-semibold text-lg">{item.name}</h4>
                                        <p className="text-gray-600 capitalize">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold">${item.price}</div>
                                        {item.discount && item.discount > 0 && (
                                            <div className="text-sm text-green-600">
                                                Save ${item.discount}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {item.ingredients.map((ingredient, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 px-2 py-1 rounded text-xs text-black"
                                        >
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.available
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {item.available ? "Available" : "Unavailable"}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(item.id)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}