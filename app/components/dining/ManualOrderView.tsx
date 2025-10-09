"use client";

import { useState, useEffect } from "react";

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

// Define the order item interface
interface OrderItem {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
}

// Define the order data interface
interface OrderData {
    guestName: string;
    roomNumber?: string;
    tableNumber?: string;
    specialNotes?: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
}

export default function ManualOrderView() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        guestName: "",
        roomNumber: "",
        tableNumber: "",
        specialNotes: ""
    });

    // Selected items state
    const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

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
                    name: "Continental Breakfast",
                    category: "breakfast",
                    description: "Traditional continental breakfast selection",
                    ingredients: ["Bread", "Butter", "Jam", "Coffee", "Juice"],
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
            setError(err instanceof Error ? err.message : "Failed to load menu items");
            console.error("Error fetching menu items:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddItem = (menuItem: MenuItem) => {
        if (!menuItem.available) return;

        setSelectedItems(prev => {
            const existingItem = prev.find(item => item.menuItemId === menuItem.id);

            if (existingItem) {
                // Increase quantity if item already exists
                return prev.map(item =>
                    item.menuItemId === menuItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item
                return [
                    ...prev,
                    {
                        menuItemId: menuItem.id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ];
            }
        });
    };

    const handleRemoveItem = (menuItemId: string) => {
        setSelectedItems(prev => {
            const existingItem = prev.find(item => item.menuItemId === menuItemId);

            if (existingItem && existingItem.quantity > 1) {
                // Decrease quantity
                return prev.map(item =>
                    item.menuItemId === menuItemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                // Remove item completely
                return prev.filter(item => item.menuItemId !== menuItemId);
            }
        });
    };

    const getItemQuantity = (menuItemId: string) => {
        const item = selectedItems.find(item => item.menuItemId === menuItemId);
        return item ? item.quantity : 0;
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCreateOrder = async () => {
        if (!formData.guestName.trim()) {
            alert("Please enter guest name");
            return;
        }

        if (selectedItems.length === 0) {
            alert("Please select at least one menu item");
            return;
        }

        try {
            const orderData: OrderData = {
                guestName: formData.guestName,
                roomNumber: formData.roomNumber || undefined,
                tableNumber: formData.tableNumber || undefined,
                specialNotes: formData.specialNotes || undefined,
                items: selectedItems,
                totalAmount: calculateTotal(),
                status: "pending"
            };

            // Replace  API endpoint

            /* const apiEndpoint = "/api/orders";
               
               const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(orderData),
                });
         
                if (response.ok) {
               
                 setFormData({
                  guestName: "",
                    roomNumber: "",
                    tableNumber: "",
                    specialNotes: ""
                  });
                  setSelectedItems([]);
                  alert("Order created successfully!");
                } else {
                  throw new Error("Failed to create order");
                }
               */

            console.log("Order data to be saved:", orderData);
            alert("Order created successfully! This will be integrated with the ordering system.");

            setFormData({
                guestName: "",
                roomNumber: "",
                tableNumber: "",
                specialNotes: ""
            });
            setSelectedItems([]);

        } catch (err) {
            console.error("Error creating order:", err);
            alert("Failed to create order. Please try again.");
        }
    };

    const availableMenuItems = menuItems.filter(item => item.available);

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow text-black">
                <h3 className="text-lg font-semibold mb-6">Create Manual Order</h3>
                <div className="flex justify-center items-center h-32">
                    <div className="text-gray-600">Loading menu items...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-lg shadow text-black">
                <h3 className="text-lg font-semibold mb-6">Create Manual Order</h3>
                <div className="text-center text-red-600">
                    <p className="mb-2">Error loading menu items</p>
                    <button
                        onClick={fetchMenuItems}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow text-black">
            <h3 className="text-lg font-semibold mb-6">Create Manual Order</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Guest Information */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Guest Name *</label>
                            <input
                                type="text"
                                name="guestName"
                                value={formData.guestName}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2 text-black"
                                placeholder="Enter guest name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Room Number</label>
                            <select
                                name="roomNumber"
                                value={formData.roomNumber}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2 text-black"
                            >
                                <option value="">Select room (optional)</option>
                                <option value="101">Room 101</option>
                                <option value="102">Room 102</option>
                                <option value="103">Room 103</option>
                                <option value="201">Room 201</option>
                                <option value="202">Room 202</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Table Number</label>
                            <input
                                type="text"
                                name="tableNumber"
                                value={formData.tableNumber}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2 text-black"
                                placeholder="Enter table number (optional)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Special Notes</label>
                            <textarea
                                name="specialNotes"
                                value={formData.specialNotes}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2 text-black"
                                rows={3}
                                placeholder="Any special instructions..."
                            />
                        </div>
                    </div>

                    {/* Selected Items Summary */}
                    {selectedItems.length > 0 && (
                        <div className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-3">Order Summary</h4>
                            <div className="space-y-2">
                                {selectedItems.map((item) => (
                                    <div key={item.menuItemId} className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">{item.name}</span>
                                            <span className="text-sm text-gray-600 ml-2">x{item.quantity}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => handleRemoveItem(item.menuItemId)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t mt-3 pt-3">
                                <div className="flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Menu Items Selection */}
                <div className="space-y-6">
                    <h4 className="font-semibold mb-4">Select Menu Items</h4>

                    {availableMenuItems.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No available menu items found.
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto">
                            {availableMenuItems.map((menuItem) => {
                                const quantity = getItemQuantity(menuItem.id);
                                return (
                                    <div key={menuItem.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <div className="font-semibold">{menuItem.name}</div>
                                                <div className="text-sm text-gray-600 capitalize">{menuItem.category}</div>
                                                <div className="text-lg font-semibold text-gray-700 mt-1">${menuItem.price}</div>
                                                {quantity > 0 && (
                                                    <div className="text-sm text-blue-600 mt-1">
                                                        Added: {quantity}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {quantity > 0 && (
                                                    <button
                                                        onClick={() => handleRemoveItem(menuItem.id)}
                                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleAddItem(menuItem)}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                                >
                                                    {quantity > 0 ? '+' : 'Add'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <button
                        onClick={handleCreateOrder}
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors w-full font-semibold"
                    >
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    );
}