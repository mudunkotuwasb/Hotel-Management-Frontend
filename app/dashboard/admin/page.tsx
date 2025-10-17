"use client";

import React from "react";
import {
  Bed,
  Users,
  Utensils,
  Package,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  Plus,
} from "lucide-react";
import AdminReceptionistLayout from "../../components/layout/AdminReceptionistLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import ChartCard from "../../components/dashboard/ChartCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";

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
  availableRooms: 12,
  occupiedRooms: 5,
  cleaningRooms: 2,
  todayCheckIns: 3,
  todayCheckOuts: 2,
  todayOrders: 8,
  lowStockItems: 3,
  occupancyRate: 75,
  revenue: 12500,
};

export default function Dashboard() {
  const stats = mockDashboardStats;

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
            title="Total Rooms"
            value={stats.totalRooms}
            subtitle="Hotel capacity"
            icon={Bed}
            bgColor="bg-gray-500"
            textColor="text-white"
          />
          <StatsCard
            title="Available Rooms"
            value={stats.availableRooms}
            subtitle={`${stats.occupancyRate}% occupied`}
            change="+5% from yesterday"
            changeType="positive"
            icon={CheckCircle}
            bgColor="bg-green-500"
            textColor="text-white"
          />
          <StatsCard
            title="Today's Check-ins"
            value={stats.todayCheckIns}
            subtitle="Guests arriving"
            icon={Users}
            bgColor="bg-yellow-500"
            textColor="text-white"
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
          />
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Occupied Rooms"
            value={stats.occupiedRooms}
            subtitle="Currently in use"
            icon={Bed}
            bgColor="bg-red-500"
            textColor="text-white"
          />
          <StatsCard
            title="Needs Cleaning"
            value={stats.cleaningRooms}
            subtitle="Housekeeping tasks"
            icon={AlertTriangle}
            bgColor="bg-yellow-500"
            textColor="text-white"
          />
          <StatsCard
            title="Low Stock Alert"
            value={stats.lowStockItems}
            subtitle="Items to reorder"
            icon={Package}
            bgColor="bg-red-500"
            textColor="text-white"
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            subtitle="This month"
            change="+12% from last month"
            changeType="positive"
            icon={TrendingUp}
            bgColor="bg-green-500"
            textColor="text-white"
          />
        </div>

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
