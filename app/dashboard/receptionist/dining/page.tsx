"use client";

import { useState } from "react";
import AdminReceptionistLayout from "../../../components/layout/AdminReceptionistLayout";
import OrdersView from "../../../components/dining/OrdersView";
import ManualOrderView from "../../../components/dining/ManualOrderView";
import MenuManagement from "../../../components/dining/MenuManagement";
import NewMenuItemPopup from "../../../components/dining/NewMenuItemPopup";
import { ClipboardList, Plus, Utensils } from "lucide-react";

type ActiveView = "orders" | "manual-order" | "menu";

export default function Dining() {
  const [activeView, setActiveView] = useState<ActiveView>("orders");
  const [showNewMenuPopup, setShowNewMenuPopup] = useState(false);

  return (
    <AdminReceptionistLayout role="receptionist">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">Dining & Menu</h2>
          <p className="text-gray-600">
            Manage menu items and track food orders
          </p>
        </div>
        <button
          onClick={() => setShowNewMenuPopup(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Menu Item
        </button>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          className={`flex items-center space-x-2 pb-2 px-1 ${
            activeView === "orders"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveView("orders")}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Orders (2)</span>
        </button>
        <button
          className={`flex items-center space-x-2 pb-2 px-1 ${
            activeView === "manual-order"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveView("manual-order")}
        >
          <Plus className="w-4 h-4" />
          <span>Manual Order</span>
        </button>
        <button
          className={`flex items-center space-x-2 pb-2 px-1 ${
            activeView === "menu"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveView("menu")}
        >
          <Utensils className="w-4 h-4" />
          <span>Menu (2)</span>
        </button>
      </div>

      {/* Content based on active view */}
      {activeView === "orders" && <OrdersView />}
      {activeView === "manual-order" && <ManualOrderView />}
      {activeView === "menu" && <MenuManagement />}

      {/* New Menu Item Popup */}
      {showNewMenuPopup && (
        <NewMenuItemPopup onClose={() => setShowNewMenuPopup(false)} />
      )}
    </AdminReceptionistLayout>
  );
}
