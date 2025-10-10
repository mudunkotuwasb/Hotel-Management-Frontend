"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface BillItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  category: "room" | "meal" | "service" | "other";
}

interface Bill {
  id: string;
  bookingId: string;
  guestId: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "pending" | "paid" | "cancelled";
  createdAt: Date;
  paidAt?: Date;
}

const BillCreation: React.FC = () => {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<BillItem>>({
    description: "",
    quantity: 1,
    rate: 0,
    category: "room",
  });
  const [guestId, setGuestId] = useState("");
  const [bookingId, setBookingId] = useState("");

  // Calculate subtotal, tax, total dynamically
  const subtotal = billItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.1; // 10% tax example
  const total = subtotal + tax;

  // Handle new item input
  const handleItemChange = (field: keyof BillItem, value: any) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  // Add item to bill
  const handleAddItem = () => {
    if (!newItem.description || !newItem.quantity || !newItem.rate) return;

    const amount = (newItem.quantity || 0) * (newItem.rate || 0);
    const item: BillItem = {
      description: newItem.description || "",
      quantity: newItem.quantity || 0,
      rate: newItem.rate || 0,
      amount,
      category: newItem.category || "other",
    };

    setBillItems((prev) => [...prev, item]);
    setNewItem({ description: "", quantity: 1, rate: 0, category: "room" });
  };

  // Remove item
  const handleRemoveItem = (index: number) => {
    setBillItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Create bill
  const handleCreateBill = () => {
    const newBill: Partial<Bill> = {
      bookingId,
      guestId,
      items: billItems,
      subtotal,
      tax,
      total,
      status: "pending",
      createdAt: new Date(),
    };

    console.log("Created Bill:", newBill);
    // 🔹 You can now send this to backend via fetch/axios
  };

  // Reset form
  const handleReset = () => {
    setGuestId("");
    setBookingId("");
    setBillItems([]);
    setNewItem({ description: "", quantity: 1, rate: 0, category: "room" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create New Bill
      </h2>

      {/* Booking and Guest Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guest ID
          </label>
          <input
            type="text"
            value={guestId}
            onChange={(e) => setGuestId(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter guest ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Booking ID
          </label>
          <input
            type="text"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter booking ID"
          />
        </div>
      </div>

      {/* Add Item Section */}
      <div className="border rounded-xl p-4 bg-gray-50 mb-6">
        <h3 className="text-lg font-semibold mb-3">Add Bill Item</h3>

        <div className="grid grid-cols-5 gap-3 mb-3">
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => handleItemChange("description", e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) =>
              handleItemChange("quantity", parseInt(e.target.value))
            }
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Rate"
            value={newItem.rate}
            onChange={(e) =>
              handleItemChange("rate", parseFloat(e.target.value))
            }
            className="border rounded-lg p-2"
          />
          <select
            value={newItem.category}
            onChange={(e) =>
              handleItemChange(
                "category",
                e.target.value as BillItem["category"]
              )
            }
            className="border rounded-lg p-2"
          >
            <option value="room">Room</option>
            <option value="meal">Meal</option>
            <option value="service">Service</option>
            <option value="other">Other</option>
          </select>
          <button
            onClick={handleAddItem}
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {/* Item List */}
        {billItems.length > 0 && (
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-200 text-left text-sm">
                <th className="p-2">Description</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Rate</th>
                <th className="p-2">Amount</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.rate.toFixed(2)}</td>
                  <td className="p-2">{item.amount.toFixed(2)}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Totals */}
      <div className="text-right mb-6">
        <p>
          Subtotal:{" "}
          <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
        </p>
        <p>
          Tax (10%): <span className="font-semibold">Rs. {tax.toFixed(2)}</span>
        </p>
        <p>
          Total:{" "}
          <span className="font-semibold text-blue-600">
            Rs. {total.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Reset
        </button>
        <button
          onClick={handleCreateBill}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Create Bill
        </button>
      </div>
    </div>
  );
};

export default BillCreation;
