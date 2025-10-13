"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Bill, BillItem } from "./BillCard";

interface BillCreationProps {
  onClose: () => void;
  guests: { id: string; name: string }[];
  bookings: { id: string; guestId: string }[];
  initialGuestId?: string;
  initialBookingId?: string;
  initialStatus?: "pending" | "paid" | "cancelled";
  onCreateBill?: (bill: Bill) => void;
  mode?: "create" | "view";
  billToView?: Bill;
}

export default function BillCreation({
  guests = [],
  bookings = [],
  onClose,
  onCreateBill,
  initialGuestId = "",
  initialBookingId = "",
  initialStatus = "pending",
  mode = "create",
  billToView,
}: BillCreationProps) {
  const isViewMode = mode === "view";

  // States
  const [guestId, setGuestId] = useState(initialGuestId);
  const [bookingId, setBookingId] = useState(initialBookingId);
  const [status, setStatus] = useState(initialStatus);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<BillItem>>({
    description: "",
    quantity: 1,
    rate: 0,
    category: "room",
  });

  // 🔹 Sync state when switching modes or billToView changes
  useEffect(() => {
    if (isViewMode && billToView) {
      setGuestId(billToView.guestId);
      setBookingId(billToView.bookingId);
      setStatus(billToView.status);
      setBillItems(billToView.items);
    } else {
      // Reset form for create mode
      setGuestId(initialGuestId);
      setBookingId(initialBookingId);
      setStatus(initialStatus);
      setBillItems([]);
      setNewItem({ description: "", quantity: 1, rate: 0, category: "room" });
    }
  }, [isViewMode, billToView, initialGuestId, initialBookingId, initialStatus]);

  // 🔹 Totals
  const subtotal = useMemo(
    () => billItems.reduce((sum, item) => sum + item.amount, 0),
    [billItems]
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // 🔹 Item handlers
  const handleItemChange = (field: keyof BillItem, value: any) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = () => {
    if (!newItem.description || !newItem.quantity || !newItem.rate) return;

    const item: BillItem = {
      description: newItem.description!,
      quantity: newItem.quantity!,
      rate: newItem.rate!,
      amount: newItem.quantity! * newItem.rate!,
      category: newItem.category || "other",
    };

    setBillItems((prev) => [...prev, item]);
    setNewItem({ description: "", quantity: 1, rate: 0, category: "room" });
  };

  const handleRemoveItem = (index: number) => {
    setBillItems((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Create bill
  const handleCreateBill = () => {
    if (!guestId || !bookingId || billItems.length === 0) return;

    const newBill: Bill = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      bookingId,
      guestId,
      items: billItems,
      subtotal,
      tax,
      total,
      status,
      createdAt: new Date(),
    };

    if (onCreateBill) onCreateBill(newBill);
    resetForm();
  };

  const resetForm = () => {
    setGuestId(initialGuestId);
    setBookingId(initialBookingId);
    setStatus(initialStatus);
    setBillItems([]);
    setNewItem({ description: "", quantity: 1, rate: 0, category: "room" });
  };

  const filteredBookings = bookings.filter((b) => b.guestId === guestId);

  return (
    <div className="card bg-white rounded-lg shadow-lg p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold mb-4">
          {isViewMode ? "View Bill" : "Create New Bill"}
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Guest, Booking & Status */}
      {!isViewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest
            </label>
            <select
              value={guestId}
              onChange={(e) => setGuestId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Guest</option>
              {guests.map((guest) => (
                <option key={guest.id} value={guest.id}>
                  {guest.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booking
            </label>
            <select
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Booking</option>
              {filteredBookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Bill["status"])}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      )}

      {/* Add Bill Item */}
      {!isViewMode && (
        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4">
          <h4 className="text-md font-semibold mb-2">Add Bill Item</h4>
          <div className="grid grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => handleItemChange("description", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) =>
                handleItemChange("quantity", parseInt(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Rate"
              value={newItem.rate}
              onChange={(e) =>
                handleItemChange("rate", parseFloat(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={newItem.category}
              onChange={(e) =>
                handleItemChange(
                  "category",
                  e.target.value as BillItem["category"]
                )
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="room">Room</option>
              <option value="meal">Meal</option>
              <option value="service">Service</option>
              <option value="other">Other</option>
            </select>
            <button
              onClick={handleAddItem}
              className="flex items-center justify-center gap-1 bg-blue-500 text-white px-2 py-1 rounded"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </div>
      )}

      {/* Items Table */}
      {billItems.length > 0 && (
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr className="bg-gray-200 text-left text-sm">
              <th className="p-2">Description</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Rate</th>
              <th className="p-2">Amount</th>
              {!isViewMode && <th className="p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {billItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.description}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.rate.toFixed(2)}</td>
                <td className="p-2">{item.amount.toFixed(2)}</td>
                {!isViewMode && (
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Totals */}
      <div className="text-right mb-6 mt-6">
        <p>
          Subtotal:{" "}
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </p>
        <p>
          Tax (10%): <span className="font-semibold">${tax.toFixed(2)}</span>
        </p>
        <p>
          Total:{" "}
          <span className="font-semibold text-blue-600">
            ${total.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end gap-2">
        {isViewMode ? (
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        ) : (
          <>
            <button
              onClick={resetForm}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </button>
            <button
              onClick={handleCreateBill}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Create Bill
            </button>
          </>
        )}
      </div>
    </div>
  );
}
