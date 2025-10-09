"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Plus, Package, AlertTriangle } from "lucide-react";
import AdminReceptionistLayout from "../../../components/layout/AdminReceptionistLayout";
import InventoryCard from "../../../components/inventory/InventoryCard";
import ItemForm from "../../../components/inventory/ItemForm";
import ItemFilters from "../../../components/inventory/ItemFilters";
import toast from "react-hot-toast";
import QuickActions from "../../../components/inventory/QuickActions";

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

const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Coffee Beans",
    category: "food",
    currentStock: 65,
    minStock: 10,
    maxStock: 50,
    unit: "kg",
    cost: 15,
    supplier: "Coffee Supply Co.",
    lastRestocked: new Date("2024-01-10"),
  },
  {
    id: "2",
    name: "Towels",
    category: "amenities",
    currentStock: 25,
    minStock: 30,
    maxStock: 100,
    unit: "pieces",
    cost: 8,
    supplier: "Hotel Supplies Inc.",
    lastRestocked: new Date("2024-01-12"),
  },
  {
    id: "3",
    name: "Bath Soap",
    category: "amenities",
    currentStock: 8,
    minStock: 20,
    maxStock: 80,
    unit: "pieces",
    cost: 2.5,
    supplier: "Hotel Supplies Inc.",
    lastRestocked: new Date("2024-01-08"),
  },
  {
    id: "4",
    name: "Toilet Paper",
    category: "amenities",
    currentStock: 12,
    minStock: 25,
    maxStock: 100,
    unit: "rolls",
    cost: 1.2,
    supplier: "Hotel Supplies Inc.",
    lastRestocked: new Date("2024-01-05"),
  },
  {
    id: "5",
    name: "Cleaning Spray",
    category: "cleaning",
    currentStock: 3,
    minStock: 8,
    maxStock: 30,
    unit: "bottles",
    cost: 4.5,
    supplier: "Cleaning Solutions Ltd.",
    lastRestocked: new Date("2024-01-03"),
  },
  {
    id: "6",
    name: "Fresh Milk",
    category: "food",
    currentStock: 15,
    minStock: 20,
    maxStock: 50,
    unit: "liters",
    cost: 3.2,
    supplier: "Dairy Fresh Co.",
    lastRestocked: new Date("2024-01-14"),
  },
  {
    id: "7",
    name: "Bread",
    category: "food",
    currentStock: 6,
    minStock: 10,
    maxStock: 25,
    unit: "loaves",
    cost: 2.8,
    supplier: "Bakery Direct",
    lastRestocked: new Date("2024-01-14"),
  },
  {
    id: "8",
    name: "Orange Juice",
    category: "beverage",
    currentStock: 4,
    minStock: 12,
    maxStock: 40,
    unit: "liters",
    cost: 5.5,
    supplier: "Beverage Co.",
    lastRestocked: new Date("2024-01-11"),
  },
];

export default function Inventory() {
  const [inventoryItems, setInventoryItems] =
    useState<InventoryItem[]>(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "food",
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: "pieces",
    cost: 0,
    supplier: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredItems = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.supplier &&
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      let matchesStock = true;
      if (stockFilter === "low") {
        matchesStock = item.currentStock <= item.minStock;
      } else if (stockFilter === "normal") {
        matchesStock =
          item.currentStock > item.minStock &&
          item.currentStock < item.maxStock * 0.9;
      } else if (stockFilter === "high") {
        matchesStock = item.currentStock >= item.maxStock * 0.9;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [inventoryItems, searchTerm, categoryFilter, stockFilter]);

  const getInventoryStats = () => {
    const total = inventoryItems.length;
    const lowStock = inventoryItems.filter(
      (item) => item.currentStock <= item.minStock
    ).length;
    const highStock = inventoryItems.filter(
      (item) => item.currentStock >= item.maxStock * 0.9
    ).length;
    const categories = Array.from(
      new Set(inventoryItems.map((item) => item.category))
    ).length;
    const totalValue = inventoryItems.reduce(
      (sum, item) => sum + item.currentStock * item.cost,
      0
    );

    return { total, lowStock, highStock, categories, totalValue };
  };

  const stats = getInventoryStats();

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem("hotel_inventory", JSON.stringify(inventoryItems));
  }, [inventoryItems]);

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setNewItem(item);
    setShowAddForm(true);
  };

  const handleRestockItem = (item: InventoryItem) => {
    const newStock = item.maxStock;
    const updatedItems = inventoryItems.map((i) =>
      i.id === item.id
        ? { ...i, currentStock: newStock, lastRestocked: new Date() }
        : i
    );
    setInventoryItems(updatedItems);
    toast.success(`${item.name} restocked to ${newStock} ${item.unit}`);
  };

  const handleUpdateStock = (item: InventoryItem, newStock: number) => {
    const updatedItems = inventoryItems.map((i) =>
      i.id === item.id ? { ...i, currentStock: Math.max(0, newStock) } : i
    );
    setInventoryItems(updatedItems);
    toast.success(
      `${item.name} stock updated to ${Math.max(0, newStock)} ${item.unit}`
    );
  };

  const handleAddItem = () => {
    const errors: Record<string, string> = {};

    if (!newItem.name) errors.name = "Item name is required.";
    if (!newItem.category) errors.category = "Category is required.";
    if (newItem.currentStock === undefined || newItem.currentStock < 0)
      errors.currentStock = "Current stock must be 0 or more.";
    if (newItem.minStock === undefined || newItem.minStock < 0)
      errors.minStock = "Minimum stock must be 0 or more.";
    if (newItem.maxStock === undefined || newItem.maxStock <= 0)
      errors.maxStock = "Maximum stock must be greater than 0.";
    if (!newItem.unit) errors.unit = "Unit is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

    const item: InventoryItem = {
      id: editingItem?.id || Date.now().toString(),
      name: newItem.name || "",
      category: (newItem.category as InventoryItem["category"]) || "other",
      currentStock: newItem.currentStock ?? 0,
      minStock: newItem.minStock ?? 0,
      maxStock: newItem.maxStock ?? 0,
      unit: newItem.unit || "pieces",
      cost: newItem.cost ?? 0,
      supplier: newItem.supplier,
      lastRestocked: new Date(),
    };

    if (editingItem) {
      const updatedItems = inventoryItems.map((i) =>
        i.id === editingItem.id ? item : i
      );
      setInventoryItems(updatedItems);
      toast.success(`${item.name} updated successfully`);
    } else {
      setInventoryItems([...inventoryItems, item]);
      toast.success(`${item.name} added successfully`);
    }

    setShowAddForm(false);
    setEditingItem(null);
    setFormErrors({});
    setNewItem({
      name: "",
      category: "food",
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unit: "pieces",
      cost: 0,
      supplier: "",
    });
  };

  const handleDeleteItem = (item: InventoryItem) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      const updatedItems = inventoryItems.filter((i) => i.id !== item.id);
      setInventoryItems(updatedItems);
      toast.success(`${item.name} deleted successfully`);
    }
  };

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "food", label: "Food" },
    { value: "beverage", label: "Beverage" },
    { value: "cleaning", label: "Cleaning" },
    { value: "amenities", label: "Amenities" },
    { value: "other", label: "Other" },
  ];

  const stockOptions = [
    { value: "all", label: "All Stock Levels" },
    { value: "low", label: "Low Stock" },
    { value: "normal", label: "Normal Stock" },
    { value: "high", label: "High Stock" },
  ];

  return (
    <AdminReceptionistLayout role="admin">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Inventory Management
            </h1>
            <p className="text-gray-600 mt-1">
              Track and manage hotel inventory items
            </p>
          </div>

          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
            Add Item
          </button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-white border-gray-100">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Items</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-red-50 border-red-200">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {stats.lowStock}
            </div>
            <div className="text-sm text-red-700 font-medium">Low Stock</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-green-50 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.highStock}
            </div>
            <div className="text-sm text-green-700 font-medium">High Stock</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-blue-50 border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.categories}
            </div>
            <div className="text-sm text-blue-700 font-medium">Categories</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-yellow-50 border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              ${stats.totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-yellow-700 font-medium">
              Total Value
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {stats.lowStock > 0 && (
          <div className="card bg-red-50 border border-red-200 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">
                  Low Stock Alert
                </h3>
                <p className="text-red-700">
                  {stats.lowStock} item{stats.lowStock !== 1 ? "s" : ""}{" "}
                  {stats.lowStock !== 1 ? "are" : "is"} running low on stock and
                  need{stats.lowStock === 1 ? "s" : ""} to be restocked.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <ItemFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          categoryOptions={categoryOptions}
          stockOptions={stockOptions}
          onClearFilters={() => {
            setSearchTerm("");
            setCategoryFilter("all");
            setStockFilter("all");
          }}
        />

        {/* Add/Edit Form */}
        {showAddForm && (
          <ItemForm
            newItem={newItem}
            setNewItem={setNewItem}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            editingItem={editingItem}
            onClose={() => {
              setShowAddForm(false);
              setEditingItem(null);
              setNewItem({
                name: "",
                category: "food",
                currentStock: 0,
                minStock: 0,
                maxStock: 0,
                unit: "pieces",
                cost: 0,
                supplier: "",
              });
            }}
            onSave={handleAddItem}
          />
        )}

        {/* Results */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Inventory Items
          </h3>
          <p className="text-sm text-gray-600">
            Showing {filteredItems.length} of {inventoryItems.length} items
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <InventoryCard
                key={item.id}
                item={item}
                onEdit={handleEditItem}
                onRestock={handleRestockItem}
                onUpdateStock={handleUpdateStock}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No inventory items found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more items.
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <QuickActions
          onAddNewItem={() => {
            setShowAddForm(true);
            setEditingItem(null);
            setNewItem({
              name: "",
              category: "food",
              currentStock: 0,
              minStock: 0,
              maxStock: 0,
              unit: "pieces",
              cost: 0,
              supplier: "",
            });
          }}
        />
      </div>
    </AdminReceptionistLayout>
  );
}
