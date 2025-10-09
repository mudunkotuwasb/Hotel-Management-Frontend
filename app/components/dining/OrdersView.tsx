export default function OrdersView() {
  return (
    <div className="space-y-6">
      {/* Order Status Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow text-center text-black">
          <div className="text-2xl font-bold">0</div>
          <div className="text-gray-600">Pending Orders</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center text-black">
          <div className="text-2xl font-bold">1</div>
          <div className="text-gray-600">Preparing</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center text-black">
          <div className="text-2xl font-bold">0</div>
          <div className="text-gray-600">Ready</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center text-black">
          <div className="text-2xl font-bold">0</div>
          <div className="text-gray-600">Served</div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow text-black">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold">Filters</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Order Status</span>
              <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-1 min-w-[200px]">
                <span className="flex-1">All Orders</span>
                <span className="text-gray-400">›</span>
              </div>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white p-4 rounded-lg shadow text-black">
        <h3 className="font-semibold mb-4">Orders</h3>
        
        {/* Orders Grid - 3 cards per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Order Card */}
          <div className="border rounded-lg p-4 text-black">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-sm">Order #1</h4>
                <div className="text-xs text-gray-600 mt-1">
                  <div>Room 2</div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  Preparing
                </span>
                <span className="text-xs text-gray-600">08:30</span>
              </div>
            </div>

            <div className="mb-3">
              <h5 className="font-medium text-sm mb-1">Items</h5>
              <ul className="text-xs space-y-1 text-black">
                <li>x2 Continental Breakfast</li>
                <li>x1 Grilled Salmon</li>
              </ul>
            </div>

            <div className="mb-3">
              <h5 className="font-medium text-sm">Notes:</h5>
              <p className="text-xs text-gray-600">Room service</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="font-semibold text-sm">Total: $58</div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                Mark Ready
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 text-black">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-sm">Order #3</h4>
                <div className="text-xs text-gray-600 mt-1">
                  <div>Room 8</div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Pending
                </span>
                <span className="text-xs text-gray-600">10:00</span>
              </div>
            </div>

            <div className="mb-3">
              <h5 className="font-medium text-sm mb-1">Items</h5>
              <ul className="text-xs space-y-1 text-black">
                <li>x1 Continental Breakfast</li>
                <li>x1 Coffee</li>
              </ul>
            </div>

            <div className="mb-3">
              <h5 className="font-medium text-sm">Notes:</h5>
              <p className="text-xs text-gray-600">No sugar in coffee</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="font-semibold text-sm">Total: $35</div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                Start Prep
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 mt-6 text-sm">
          Showing 3 of 3 orders
        </div>
      </div>
    </div>
  );
}