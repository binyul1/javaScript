import React, { useState } from "react";
import { PageTitle } from "../../components/page-title/PageTitle";
import {
  LuPlus,
  LuSearch,
  LuEye,
  LuTrash2,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { NavLink } from "react-router";

// Mock order data - replace with actual API data
interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2024-01-14",
    status: "shipped",
    total: 149.5,
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    date: "2024-01-13",
    status: "processing",
    total: 89.99,
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    date: "2024-01-12",
    status: "pending",
    total: 459.99,
    items: 5,
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    date: "2024-01-11",
    status: "cancelled",
    total: 199.99,
    items: 2,
  },
  {
    id: "ORD-006",
    customer: "Diana Davis",
    email: "diana@example.com",
    date: "2024-01-10",
    status: "delivered",
    total: 349.99,
    items: 4,
  },
  {
    id: "ORD-007",
    customer: "Edward Miller",
    email: "edward@example.com",
    date: "2024-01-09",
    status: "shipped",
    total: 79.99,
    items: 1,
  },
  {
    id: "ORD-008",
    customer: "Fiona Garcia",
    email: "fiona@example.com",
    date: "2024-01-08",
    status: "processing",
    total: 599.99,
    items: 6,
  },
  {
    id: "ORD-009",
    customer: "George Taylor",
    email: "george@example.com",
    date: "2024-01-07",
    status: "pending",
    total: 129.99,
    items: 2,
  },
  {
    id: "ORD-010",
    customer: "Helen Martinez",
    email: "helen@example.com",
    date: "2024-01-06",
    status: "delivered",
    total: 279.99,
    items: 3,
  },
];

const ITEMS_PER_PAGE = 5;

export default function ListOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter orders based on search term and status
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCreateOrder = () => {
    // Navigate to create order page or open modal
    console.log("Create new order");
  };

  const handleViewOrder = (orderId: string) => {
    console.log("View order:", orderId);
  };

  const handleEditOrder = (orderId: string) => {
    console.log("Edit order:", orderId);
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log("Delete order:", orderId);
  };

  return (
    <div className="p-6 bg-stone-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
          <PageTitle className="text-teal-900 text-left text-3xl">
            Orders Management
          </PageTitle>
          <button
            onClick={handleCreateOrder}
            className="flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-800/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <NavLink to="create" className="flex items-center gap-2">
              <LuPlus className="w-5 h-5" />
              Create Order
            </NavLink>
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Status Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="status-filter"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white min-w-[160px] text-gray-700"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-50 transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.customer}
                    </div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {order.items}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="text-teal-600 hover:text-teal-900 p-2 rounded-lg hover:bg-teal-50 transition-all duration-200 transform hover:scale-105"
                        title="View Order"
                      >
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditOrder(order.id)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
                        title="Edit Order"
                      >
                        <CiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 transform hover:scale-105"
                        title="Delete Order"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <LuSearch className="w-16 h-16 mx-auto opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className="text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 font-medium">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
              >
                <LuChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-sm ${
                        currentPage === pageNum
                          ? "bg-teal-800 text-white shadow-md transform scale-105"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
              >
                Next
                <LuChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
