"use client";

import React, { useState, useMemo } from "react";
import { Plus, FileText } from "lucide-react";
import BillCard from "../../../components/billing/BillCard";
import AdminReceptionistLayout from "../../../components/layout/AdminReceptionistLayout";
import BillFilters from "../../../components/billing/BillFilters";
import QuickActions from "../../../components/billing/QuickActions";
import BillCreation from "../../../components/billing/BillCreation";

export interface BillItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  category: "room" | "meal" | "service" | "other";
}

export interface Bill {
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

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality?: string;
  preferences?: string[];
  bookingHistory: string[];
}

const mockGuests: Guest[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    nationality: "US",
    preferences: ["Non-smoking", "High floor"],
    bookingHistory: ["1", "2"],
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1-555-0456",
    nationality: "ES",
    preferences: ["Vegetarian meals"],
    bookingHistory: ["3"],
  },
];

const mockBills: Bill[] = [
  {
    id: "1",
    bookingId: "1",
    guestId: "1",
    items: [
      {
        description: "Room 102 (3 nights)",
        quantity: 3,
        rate: 180,
        amount: 540,
        category: "room",
      },
      {
        description: "Breakfast package",
        quantity: 3,
        rate: 15,
        amount: 45,
        category: "meal",
      },
    ],
    subtotal: 585,
    tax: 58.5,
    total: 643.5,
    status: "pending",
    createdAt: new Date("2024-01-15"),
  },
];

export default function Billing() {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [guests] = useState(mockGuests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // SINGLE state for modal
  const [showBillForm, setShowBillForm] = useState(false);
  const [billToView, setBillToView] = useState<Bill | null>(null);

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const guest = guests.find((g) => g.id === bill.guestId);
      const guestName = guest ? guest.name.toLowerCase() : "";
      const matchesSearch =
        guestName.includes(searchTerm.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || bill.status === statusFilter;

      let matchesDate = true;
      if (dateFilter === "today") {
        matchesDate =
          new Date(bill.createdAt).toDateString() === new Date().toDateString();
      } else if (dateFilter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = new Date(bill.createdAt) >= weekAgo;
      } else if (dateFilter === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        matchesDate = new Date(bill.createdAt) >= monthAgo;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bills, guests, searchTerm, statusFilter, dateFilter]);

  const stats = {
    total: bills.length,
    pending: bills.filter((b) => b.status === "pending").length,
    paid: bills.filter((b) => b.status === "paid").length,
    totalRevenue: bills
      .filter((b) => b.status === "paid")
      .reduce((sum, b) => sum + b.total, 0),
    pendingAmount: bills
      .filter((b) => b.status === "pending")
      .reduce((sum, b) => sum + b.total, 0),
  };

  const getGuestForBill = (guestId: string) =>
    guests.find((g) => g.id === guestId);

  // HANDLERS
  const openCreateBill = () => {
    setBillToView(null);
    setShowBillForm(true);
  };

  const handleViewBill = (bill: Bill) => {
    setBillToView(bill);
    setShowBillForm(true);
  };

  const handleCloseBillForm = () => {
    setBillToView(null);
    setShowBillForm(false);
  };

  const handleMarkPaid = (billToUpdate: Bill) => {
    setBills((prev) =>
      prev.map((b) =>
        b.id === billToUpdate.id
          ? { ...b, status: "paid", paidAt: new Date() }
          : b
      )
    );
  };

  const handleDownloadBill = (bill: Bill) => {
    console.log("Download bill:", bill);
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "cancel", label: "Cancelled" },
  ];

  const dateOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This week" },
    { value: "month", label: "This month" },
  ];

  return (
    <AdminReceptionistLayout role="receptionist">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
            <p className="text-gray-600 mt-1">
              Manage guest bills and payments
            </p>
          </div>

          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition group"
            onClick={openCreateBill}
          >
            <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
            Create Bill
          </button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-white border-gray-100">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Bills</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-yellow-50 border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {stats.pending}
            </div>
            <div className="text-sm text-yellow-700 font-medium">Pending</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-green-50 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.paid}
            </div>
            <div className="text-sm text-green-700 font-medium">Paid</div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-green-50 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-1">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-green-700 font-medium">
              Total Revenue
            </div>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition bg-yellow-50 border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              ${stats.pendingAmount.toLocaleString()}
            </div>
            <div className="text-sm text-yellow-700 font-medium">
              Pending Amount
            </div>
          </div>
        </div>

        {/* Filters */}
        <BillFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          statusOptions={statusOptions}
          dateOptions={dateOptions}
          onClearFilters={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setDateFilter("all");
          }}
        />

        {/* BillCreation Modal */}
        {showBillForm && (
          <BillCreation
            onClose={handleCloseBillForm}
            guests={guests.map((g) => ({ id: g.id, name: g.name }))}
            bookings={[
              { id: "1", guestId: "1" },
              { id: "2", guestId: "1" },
              { id: "3", guestId: "2" },
            ]}
            initialGuestId=""
            initialBookingId=""
            initialStatus="pending"
            mode={billToView ? "view" : "create"}
            billToView={billToView || undefined}
            onCreateBill={(newBill: Bill) =>
              setBills((prev) => [newBill, ...prev])
            }
          />
        )}

        {/* Bills List */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Bills</h3>
          <p className="text-sm text-gray-600">
            Showing {filteredBills.length} of {bills.length} bills
          </p>
        </div>

        {filteredBills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBills.map((bill) => (
              <BillCard
                key={bill.id}
                bill={bill}
                guest={getGuestForBill(bill.guestId)}
                onView={handleViewBill}
                onDownload={handleDownloadBill}
                onMarkPaid={handleMarkPaid}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bills found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more bills.
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <QuickActions onCreateBillClick={openCreateBill} />
      </div>
    </AdminReceptionistLayout>
  );
}
