"use client";

export default function BookingsView() {
  const stats = [
    { label: "Total Bookings", value: "2" },
    { label: "Pending", value: "1" },
    { label: "Confirmed", value: "1" },
    { label: "Completed", value: "0" }
  ];

  const bookings = [
    {
      id: 1,
      packageName: "City Heritage Tour",
      location: "Historic City Center",
      participants: 2,
      date: "1/20/2024",
      status: "Confirmed",
      price: 150
    },
    {
      id: 2,
      packageName: "Mountain Adventure",
      location: "Blue Mountain Range",
      participants: 1,
      date: "1/22/2024",
      status: "Pending",
      price: 120
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Trip Bookings</h3>
        {bookings.map((booking) => (
          <div key={booking.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold">{booking.packageName}</h4>
                <p className="text-sm text-gray-600">
                  {booking.location} • {booking.participants} participant{booking.participants > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-gray-600">Trip Date: {booking.date}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                <div className="text-lg font-bold text-gray-800 mt-2">${booking.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}