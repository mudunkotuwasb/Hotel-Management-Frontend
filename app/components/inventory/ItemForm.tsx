"use client";

import { X, Save } from "lucide-react";

export interface InventoryItem {
  id: string;
  name: string;
  category: "food" | "beverage" | "cleaning" | "amenities" | "other";
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  cost: number;
  supplier?: string;
  lastRestocked?: Date;
}

interface ItemFormProps {
  newItem: Partial<InventoryItem>;
  setNewItem: React.Dispatch<React.SetStateAction<Partial<InventoryItem>>>;
  formErrors: { [key: string]: string };
  setFormErrors: (errors: { [key: string]: string }) => void;
  editingItem: InventoryItem | null;
  onClose: () => void;
  onSave: () => void;
}

export default function ItemForm({
  newItem,
  setNewItem,
  formErrors,
  setFormErrors,
  editingItem,
  onClose,
  onSave,
}: ItemFormProps) {
  
  // API calls
  const handleSave = async () => {
    // Validate form before proceeding
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    try {
      // Replace API endpoint
      const endpoint = editingItem 
        ? "/api/inventory/update"  // Add endpoint for editing
        : "/api/inventory/add";    // Add Update endpoint for adding

      const response = await fetch(endpoint, {
        method: editingItem ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newItem,
          currentStock: Number(newItem.currentStock),
          minStock: Number(newItem.minStock),
          maxStock: Number(newItem.maxStock),
          cost: Number(newItem.cost),
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      // Handle successful response
      const result = await response.json();
      console.log("Item saved successfully:", result);

      // Call the existing onSave prop to handle UI state updates
      onSave();

    } catch (error) {
      // Handle API error (show toast, alert)
      console.error("Failed to save item:", error);
      alert("Failed to save item. Please try again.");
    }
  };

  return (
    <div className="card bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name *
          </label>
          <input
            type="text"
            value={newItem.name || ""}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter item name"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            value={newItem.category || "food"}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                category: e.target.value as InventoryItem["category"],
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="food">Food</option>
            <option value="beverage">Beverage</option>
            <option value="cleaning">Cleaning</option>
            <option value="amenities">Amenities</option>
            <option value="other">Other</option>
          </select>
          {formErrors.category && (
            <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
          )}
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit *
          </label>
          <input
            type="text"
            value={newItem.unit || ""}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., pieces, kg, liters"
          />
          {formErrors.unit && (
            <p className="text-red-500 text-sm mt-1">{formErrors.unit}</p>
          )}
        </div>

        {/* Current Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Stock *
          </label>
          <input
            type="number"
            value={newItem.currentStock || ""}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                currentStock: parseInt(e.target.value) || 1,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={1}
          />
          {formErrors.currentStock && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.currentStock}
            </p>
          )}
        </div>

        {/* Minimum Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Stock *
          </label>
          <input
            type="number"
            value={newItem.minStock || ""}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                minStock: parseInt(e.target.value) || 1,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={1}
          />
          {formErrors.minStock && (
            <p className="text-red-500 text-sm mt-1">{formErrors.minStock}</p>
          )}
        </div>

        {/* Maximum Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Stock *
          </label>
          <input
            type="number"
            value={newItem.maxStock || ""}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                maxStock: parseInt(e.target.value) || 1,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={1}
          />
          {formErrors.maxStock && (
            <p className="text-red-500 text-sm mt-1">{formErrors.maxStock}</p>
          )}
        </div>

        {/* Cost per Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost per Unit
          </label>
          <input
            type="number"
            value={newItem.cost || ""}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                cost: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        {/* Supplier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supplier
          </label>
          <input
            type="text"
            value={newItem.supplier || ""}
            onChange={(e) =>
              setNewItem({ ...newItem, supplier: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter supplier name"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-end">
          <button
            onClick={handleSave}
            disabled={!!Object.keys(formErrors).length}
            className={`btn btn-primary w-full justify-center flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group ${
              Object.keys(formErrors).length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            {editingItem ? "Update Item" : "Add Item"}
          </button>
        </div>
      </div>
    </div>
  );
}