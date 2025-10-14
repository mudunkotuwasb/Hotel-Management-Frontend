"use client";

import AdminReceptionistLayout from "../../../components/layout/AdminReceptionistLayout";
import ChartsOverview from "../../../components/reports/ChartsOverview";
import ExportOptions from "../../../components/reports/ExportOptions";
import React, { useState } from "react";
import { TrendingUp, Users, DollarSign, Bed } from "lucide-react";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data for reports
  const occupancyData = [
    { name: "Jan", occupancy: 65, revenue: 12000 },
    { name: "Feb", occupancy: 70, revenue: 15000 },
    { name: "Mar", occupancy: 80, revenue: 18000 },
    { name: "Apr", occupancy: 75, revenue: 16000 },
    { name: "May", occupancy: 85, revenue: 20000 },
    { name: "Jun", occupancy: 90, revenue: 22000 },
    { name: "Jul", occupancy: 95, revenue: 25000 },
    { name: "Aug", occupancy: 88, revenue: 23000 },
    { name: "Sep", occupancy: 82, revenue: 19000 },
    { name: "Oct", occupancy: 78, revenue: 17000 },
    { name: "Nov", occupancy: 72, revenue: 14000 },
    { name: "Dec", occupancy: 68, revenue: 13000 },
  ];

  const roomTypeData = [
    { name: "Single", value: 8, revenue: 9600 },
    { name: "Double", value: 12, revenue: 21600 },
    { name: "Suite", value: 3, revenue: 9000 },
    { name: "Family", value: 2, revenue: 5000 },
  ];

  const revenueSources = [
    { name: "Room Revenue", value: 45200, percentage: 70 },
    { name: "Food & Beverage", value: 12914, percentage: 20 },
    { name: "Services", value: 6457, percentage: 10 },
  ];

  const dailyOccupancy = [
    { day: "Mon", occupancy: 75 },
    { day: "Tue", occupancy: 80 },
    { day: "Wed", occupancy: 85 },
    { day: "Thu", occupancy: 90 },
    { day: "Fri", occupancy: 95 },
    { day: "Sat", occupancy: 100 },
    { day: "Sun", occupancy: 70 },
  ];

  const guestSatisfaction = [
    { month: "Jan", rating: 4.2 },
    { month: "Feb", rating: 4.3 },
    { month: "Mar", rating: 4.5 },
    { month: "Apr", rating: 4.4 },
    { month: "May", rating: 4.6 },
    { month: "Jun", rating: 4.7 },
  ];

  const getKeyMetrics = () => {
    const currentMonth = occupancyData[occupancyData.length - 1];
    const previousMonth = occupancyData[occupancyData.length - 2];

    return {
      occupancyRate: currentMonth.occupancy,
      occupancyChange: (
        ((currentMonth.occupancy - previousMonth.occupancy) /
          previousMonth.occupancy) *
        100
      ).toFixed(1),
      revenue: currentMonth.revenue,
      revenueChange: (
        ((currentMonth.revenue - previousMonth.revenue) /
          previousMonth.revenue) *
        100
      ).toFixed(1),
      totalRooms: roomTypeData.reduce((sum, room) => sum + room.value, 0),
      avgRating: guestSatisfaction[guestSatisfaction.length - 1].rating,
    };
  };

  const metrics = getKeyMetrics();

  const handleExportReport = (type: string) => {
    console.log(`Exporting ${type} report`);
    // In a real app, this would generate and download the report
  };

  return (
    <AdminReceptionistLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Hotel performance insights and analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full md:w-auto rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:border-gray-400"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>

            {/* Compact dropdown export button */}
            <ExportOptions handleExportReport={handleExportReport} compact />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Occupancy Rate */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Bed className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.occupancyRate}%
            </div>
            <div className="text-sm text-gray-600">Occupancy Rate</div>
            <div
              className={`text-xs mt-1 ${
                parseFloat(metrics.occupancyChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {parseFloat(metrics.occupancyChange) >= 0 ? "+" : ""}
              {metrics.occupancyChange}% vs last month
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${metrics.revenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Monthly Revenue</div>
            <div
              className={`text-xs mt-1 ${
                parseFloat(metrics.revenueChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {parseFloat(metrics.revenueChange) >= 0 ? "+" : ""}
              {metrics.revenueChange}% vs last month
            </div>
          </div>

          {/* Total Rooms */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.totalRooms}
            </div>
            <div className="text-sm text-gray-600">Total Rooms</div>
            <div className="text-xs text-gray-500 mt-1">
              Available inventory
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.avgRating}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
            <div className="text-xs text-gray-500 mt-1">Guest satisfaction</div>
          </div>
        </div>

        {/* Charts Overview */}
        <ChartsOverview
          occupancyData={occupancyData}
          roomTypeData={roomTypeData}
          dailyOccupancy={dailyOccupancy}
          guestSatisfaction={guestSatisfaction}
        />

        {/* Revenue Breakdown */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Sources
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {revenueSources.map((source, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${source.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mb-2">{source.name}</div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${source.percentage}%`,
                      backgroundColor:
                        index === 0
                          ? "#4a90e2" // Blue
                          : index === 1
                          ? "#7ed321" // Green
                          : "#f5a623", // Yellow
                    }}
                  ></div>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  {source.percentage}% of total
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <ExportOptions handleExportReport={handleExportReport} />
      </div>
    </AdminReceptionistLayout>
  );
}
