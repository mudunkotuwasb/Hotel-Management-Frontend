"use client";

import React, { useState } from "react";
import { Bed, Users, Utensils, CheckCircle } from "lucide-react";
import AdminReceptionistLayout from "../../components/layout/AdminReceptionistLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import ChartCard from "../../components/dashboard/ChartCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import RoomCard, { Room } from "../../components/rooms/RoomCard";

interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  cleaningRooms: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  todayOrders: number;
  lowStockItems: number;
  occupancyRate: number;
  revenue: number;
}

const mockDashboardStats: DashboardStats = {
  totalRooms: 20,
  availableRooms: 2,
  occupiedRooms: 5,
  cleaningRooms: 2,
  todayCheckIns: 3,
  todayCheckOuts: 2,
  todayOrders: 8,
  lowStockItems: 3,
  occupancyRate: 75,
  revenue: 12500,
};

// --- Mock rooms data ---
const mockRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "single",
    status: "available",
    rate: 100,
    amenities: ["wifi", "tv"],
    maxOccupancy: 1,
    floor: 1,
  },
  {
    id: "2",
    number: "102",
    type: "double",
    status: "occupied",
    rate: 150,
    amenities: ["wifi", "tv", "ac"],
    maxOccupancy: 2,
    floor: 1,
  },
  {
    id: "3",
    number: "103",
    type: "suite",
    status: "available",
    rate: 250,
    amenities: ["wifi", "tv", "ac", "mini bar"],
    maxOccupancy: 4,
    floor: 2,
  },
  {
    id: "4",
    number: "104",
    type: "family",
    status: "reserved",
    rate: 200,
    amenities: ["wifi", "tv"],
    maxOccupancy: 4,
    floor: 2,
  },
];

const mockCheckIns = [
  {
    id: "C001",
    roomNumber: "102",
    guestName: "John Doe",
    checkInDate: "2025-10-28",
    nights: 2,
    contact: "0712345678",
  },
  {
    id: "C002",
    roomNumber: "104",
    guestName: "Amal Perera",
    checkInDate: "2025-10-28",
    nights: 1,
    contact: "0756789123",
  },
];

const mockCheckOuts = [
  {
    id: "O001",
    roomNumber: "101",
    guestName: "Jane Smith",
    checkOutDate: "2025-10-28",
    total: 3500,
  },
];

const mockOrders = [
  {
    id: "M001",
    guestName: "Kavindu Silva",
    roomNumber: "103",
    items: ["Breakfast Set", "Coffee"],
    total: 1200,
    status: "Delivered",
  },
];

export default function Dashboard() {
  const stats = mockDashboardStats;
  const [filteredRooms, setFilteredRooms] = useState<Room[] | null>(null);
  const [filteredCheckIns, setFilteredCheckIns] = useState<any[] | null>(null);
  const [filteredCheckOuts, setFilteredCheckOuts] = useState<any[] | null>(
    null
  );
  const [filteredOrders, setFilteredOrders] = useState<any[] | null>(null);

  // Mock chart data
  const occupancyData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 70 },
    { name: "Wed", value: 80 },
    { name: "Thu", value: 75 },
    { name: "Fri", value: 85 },
    { name: "Sat", value: 90 },
    { name: "Sun", value: 70 },
  ];

  const roomStatusData = [
    { name: "Available", value: stats.availableRooms },
    { name: "Occupied", value: stats.occupiedRooms },
    { name: "Cleaning", value: stats.cleaningRooms },
    { name: "Maintenance", value: 1 },
  ];

  const revenueData = [
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 15000 },
    { name: "Mar", value: 18000 },
    { name: "Apr", value: 16000 },
    { name: "May", value: 20000 },
    { name: "Jun", value: 22000 },
  ];

  // Handler to change status
  const handleStatusChange = (roomId: string, status: Room["status"]) => {
    setFilteredRooms((prev) =>
      prev
        ? prev
            .map((room) =>
              room.id === roomId
                ? {
                    ...room,
                    status,
                  }
                : room
            )
            .filter((room) => room.status === "available") // remove if not available
        : null
    );
  };

  return (
    <AdminReceptionistLayout role="admin">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-700 to-teal-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-1">
                Welcome to Grand Hotel
              </h1>
              <p className="text-gray-200 text-sm md:text-base">
                Here's what's happening today
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white/20 rounded-lg">
              <Bed className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Available Rooms"
            value={stats.availableRooms}
            subtitle={`${stats.occupancyRate}% occupied`}
            change="+5% from yesterday"
            changeType="positive"
            icon={CheckCircle}
            bgColor="bg-green-500"
            textColor="text-white"
            onClick={() =>
              setFilteredRooms((prev) =>
                prev
                  ? null
                  : mockRooms.filter((room) => room.status === "available")
              )
            }
          />

          <StatsCard
            title="Today's Check-ins"
            value={stats.todayCheckIns}
            subtitle="Guests arriving"
            icon={Users}
            bgColor="bg-yellow-500"
            textColor="text-white"
            onClick={() => {
              setFilteredRooms(null);
              setFilteredCheckOuts(null);
              setFilteredOrders(null);
              setFilteredCheckIns((prev) => (prev ? null : mockCheckIns));
            }}
          />
          <StatsCard
            title="Today's Check-outs"
            value={stats.todayCheckOuts}
            subtitle="Guests leaving"
            icon={Users}
            bgColor="bg-red-500"
            textColor="text-white"
            onClick={() => {
              setFilteredRooms(null);
              setFilteredCheckIns(null);
              setFilteredOrders(null);
              setFilteredCheckOuts((prev) => (prev ? null : mockCheckOuts));
            }}
          />
          <StatsCard
            title="Today's Orders"
            value={stats.todayOrders}
            subtitle="Meal orders"
            change="+3 from yesterday"
            changeType="positive"
            icon={Utensils}
            bgColor="bg-teal-500"
            textColor="text-white"
            onClick={() => {
              setFilteredRooms(null);
              setFilteredCheckIns(null);
              setFilteredCheckOuts(null);
              setFilteredOrders((prev) => (prev ? null : mockOrders));
            }}
          />
        </div>

        {/* Show Filtered Rooms on Click */}
        {filteredRooms && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Available Rooms</h2>
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => setFilteredRooms(null)}
              >
                Clear Filter
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        )}

        {/* ✅ Today's Check-ins Table */}
        {filteredCheckIns && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Today's Check-ins</h2>
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => setFilteredCheckIns(null)}
              >
                Clear Filter
              </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Guest Name
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Room No
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Check-in Date
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Nights
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {filteredCheckIns.map((checkin) => (
                    <tr
                      key={checkin.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3">{checkin.id}</td>
                      <td className="px-6 py-3 font-medium">
                        {checkin.guestName}
                      </td>
                      <td className="px-6 py-3">{checkin.roomNumber}</td>
                      <td className="px-6 py-3">{checkin.checkInDate}</td>
                      <td className="px-6 py-3">{checkin.nights}</td>
                      <td className="px-6 py-3">{checkin.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 🚪 Today's Check-outs Table */}
        {filteredCheckOuts && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Today's Check-outs</h2>
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => setFilteredCheckOuts(null)}
              >
                Clear Filter
              </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Checkout ID
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Guest Name
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Room No
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Check-out Date
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {filteredCheckOuts.map((checkout) => (
                    <tr
                      key={checkout.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3">{checkout.id}</td>
                      <td className="px-6 py-3 font-medium">
                        {checkout.guestName}
                      </td>
                      <td className="px-6 py-3">{checkout.roomNumber}</td>
                      <td className="px-6 py-3">{checkout.checkOutDate}</td>
                      <td className="px-6 py-3">
                        Rs.{checkout.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 🍽️ Today's Orders Table */}
        {filteredOrders && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Today's Orders</h2>
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => setFilteredOrders(null)}
              >
                Clear Filter
              </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Guest Name
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Room No
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">Items</th>
                    <th className="px-6 py-3 text-left font-semibold">Total</th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-3">{order.id}</td>
                      <td className="px-6 py-3 font-medium">
                        {order.guestName}
                      </td>
                      <td className="px-6 py-3">{order.roomNumber}</td>
                      <td className="px-6 py-3">{order.items.join(", ")}</td>
                      <td className="px-6 py-3">
                        Rs.{order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard
              title="Weekly Occupancy Rate"
              type="bar"
              data={occupancyData}
              dataKey="value"
              nameKey="name"
            />
          </div>
          <RecentActivity />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Room Status Distribution"
            type="pie"
            data={roomStatusData}
            dataKey="value"
            nameKey="name"
          />
          <ChartCard
            title="Monthly Revenue Trend"
            type="bar"
            data={revenueData}
            dataKey="value"
            nameKey="name"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </AdminReceptionistLayout>
  );
}
