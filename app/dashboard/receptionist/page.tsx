"use client";

import AdminReceptionistLayout from "../../components/layout/AdminReceptionistLayout";
import DashboardCard from "../../components/common/DashboardCard";
import { ClipboardList, CreditCard, Bed } from "lucide-react";

export default function ReceptionistDashboard() {
  return (
    <AdminReceptionistLayout role="receptionist">
      <h2 className="text-2xl font-bold mb-6">Receptionist Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Active Bookings"
          value="30"
          icon={<Bed className="w-6 h-6" />}
        />
        <DashboardCard
          title="Pending Check-ins"
          value="12"
          icon={<ClipboardList className="w-6 h-6" />}
        />
        <DashboardCard
          title="Payments Collected"
          value="$4,500"
          icon={<CreditCard className="w-6 h-6" />}
        />
      </div>
    </AdminReceptionistLayout>
  );
}
