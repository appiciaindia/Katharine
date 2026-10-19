"use client";

import Link from "next/link";
import {
  FaBoxOpen,
  FaCogs,
  FaTruck,
  FaCheckCircle,
  FaSearch,
  FaCalendarAlt,
  FaFilter,
  FaSortAmountDown,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaTimesCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

const statusConfig = {
  pending: {
    label: "Order Placed",
    className: "bg-amber-100 text-amber-700",
    icon: FaBoxOpen,
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-700",
    icon: FaCheckCircle,
  },
  processing: {
    label: "Processing",
    className: "bg-yellow-100 text-yellow-700",
    icon: FaCogs,
  },
  shipped: {
    label: "Shipped",
    className: "bg-blue-100 text-blue-700",
    icon: FaTruck,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    className: "bg-purple-100 text-purple-700",
    icon: FaTruck,
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-700",
    icon: FaCheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700",
    icon: FaTimesCircle,
  },
  returned: {
    label: "Returned",
    className: "bg-slate-100 text-slate-700",
    icon: FaTimesCircle,
  },
};

const deliveryMessage = {
  pending: "Your order is awaiting confirmation.",
  confirmed: "Your order has been confirmed.",
  processing: "Your order is being prepared.",
  shipped: "Your order has been handed to the courier.",
  out_for_delivery: "Your order is out for delivery.",
  delivered: "Your order was delivered.",
  cancelled: "This order was cancelled.",
  returned: "This order was returned.",
};

function formatOrder(order) {
  const status = order.status || "pending";
  return {
    id: order.id,
    order_id: order.order_number,
    date: order.created_at
      ? new Date(order.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "—",
    items: order.items?.length || 0,
    products: (order.items || []).map((item) => `${item.product_name} × ${item.quantity}`),
    total_amount: Number(order.grand_total || 0),
    payment: order.payment_status === "unpaid" ? "Cash on Delivery · Unpaid" : `Payment ${order.payment_status || "pending"}`,
    status,
    delivery: deliveryMessage[status] || "Order status updated.",
  };
}

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading || !user) return;

    let active = true;
    apiRequest(`/orders?page=${page}`)
      .then((response) => {
        if (!active) return;
        setOrders((response.data || []).map(formatOrder));
        setTotalOrders(Number(response.total ?? response.data?.length ?? 0));
        setLastPage(Number(response.last_page || 1));
        setError("");
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [authLoading, page, user]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_id.toLowerCase().includes(search.toLowerCase()) ||
      order.products.some((product) =>
        product.toLowerCase().includes(search.toLowerCase())
      );

    const matchesStatus =
      activeTab === "all" || order.status === activeTab;

    return matchesSearch && matchesStatus;
  });

  const getCount = (status) => {
    if (status === "all") return totalOrders;

    return orders.filter((order) => order.status === status).length;
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#113173]">
            My Orders
          </h1>

          <p className="mt-1 text-gray-500">
            View, track and manage all your Katharine Pharma orders.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff360a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e82f08] transition"
        >
          <FaShoppingCart />
          Continue Shopping
        </Link>
      </div>

      {!authLoading && !user && (
        <div className="rounded-xl border border-blue-100 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">Log in to view your orders.</p>
          <Link href="/login" className="mt-4 inline-flex rounded-lg bg-[#113173] px-5 py-2.5 font-semibold text-white">Login</Link>
        </div>
      )}

      {error && user && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>
      )}

      {loading && user && (
        <div role="status" className="rounded-xl bg-white p-8 text-center text-gray-500">Loading your orders…</div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total */}
        <div className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
              <FaBoxOpen />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-[#113173]">
                {totalOrders}
              </h3>
            </div>
          </div>
        </div>

        {/* Processing */}
        <div className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 text-xl">
              <FaCogs />
            </div>

            <div>
              <p className="text-sm text-gray-500">Processing</p>
              <h3 className="text-2xl font-bold text-[#113173]">
                {getCount("processing")}
              </h3>
            </div>
          </div>
        </div>

        {/* Shipped */}
        <div className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
              <FaTruck />
            </div>

            <div>
              <p className="text-sm text-gray-500">Shipped</p>
              <h3 className="text-2xl font-bold text-[#113173]">
                {getCount("shipped")}
              </h3>
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl">
              <FaCheckCircle />
            </div>

            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <h3 className="text-2xl font-bold text-[#113173]">
                {getCount("delivered")}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">

        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID or Product Name..."
              className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#0c213c] focus:ring-1 focus:ring-[#0c213c]"
            />
          </div>

          {/* Date */}
          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 hover:border-[#0c213c]">
            <FaCalendarAlt />
            All Dates
          </button>

          {/* Filter */}
          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 hover:border-[#0c213c]">
            <FaFilter />
            All Status
          </button>

          {/* Sort */}
          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 hover:border-[#0c213c]">
            <FaSortAmountDown />
            Newest First
          </button>

        </div>

      </div>

      {/* Status Tabs */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max border-b border-gray-200">

          {[
            ["all", "All Orders"],
            ["pending", "Order Placed"],
            ["confirmed", "Confirmed"],
            ["processing", "Processing"],
            ["shipped", "Shipped"],
            ["out_for_delivery", "Out for Delivery"],
            ["delivered", "Delivered"],
            ["cancelled", "Cancelled"],
            ["returned", "Returned"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
                activeTab === value
                  ? "border-[#0c213c] text-[#0c213c]"
                  : "border-transparent text-gray-500 hover:text-[#113173]"
              }`}
            >
              {label} ({getCount(value)})
            </button>
          ))}

        </div>
      </div>
      {lastPage > 1 && <p className="-mt-4 text-xs text-gray-400">Status counts show orders on the current page.</p>}

      {/* Orders */}
      {user && !loading && <div className="space-y-4">

        {filteredOrders.length === 0 ? (
          <div className="rounded-xl bg-white border border-gray-100 p-12 text-center">
            <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-4" />

            <h3 className="text-lg font-semibold text-[#113173]">
              No Orders Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {orders.length === 0 ? "Your placed orders will appear here." : "Try changing your search or filter."}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {

            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <div
                key={order.id}
                className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden"
              >

                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50 px-5 py-4 border-b border-gray-100">

                  <div>
                    <p className="text-xs text-gray-500">
                      Order ID
                    </p>

                    <h3 className="font-bold text-[#113173]">
                      {order.order_id}
                    </h3>
                  </div>

                  <div className="text-sm text-gray-500">
                    Order Date:{" "}
                    <span className="font-medium text-gray-700">
                      {order.date}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
                  >
                    <StatusIcon />
                    {status.label}
                  </span>

                </div>

                {/* Order Body */}
                <div className="p-5">

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_180px] gap-6">

                    {/* Products */}
                    <div>

                      <p className="text-sm font-semibold text-[#113173] mb-3">
                        {order.items} Items
                      </p>

                      <div className="space-y-2">

                        {order.products.slice(0, 3).map((product, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <FaBoxOpen className="text-gray-400" />
                            </div>

                            <span className="text-sm text-gray-600">
                              {product}
                            </span>
                          </div>
                        ))}

                        {order.items > 3 && (
                          <p className="text-xs font-semibold text-[#0c213c] ml-13">
                            +{order.items - 3} more items
                          </p>
                        )}

                      </div>

                    </div>

                    {/* Amount */}
                    <div>
                      <p className="text-xs text-gray-500">
                        Total Amount
                      </p>

                      <h3 className="text-xl font-bold text-[#113173] mt-1">
                        ₹{order.total_amount.toLocaleString("en-IN")}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {order.payment}
                      </p>
                    </div>

                    {/* Delivery */}
                    <div>
                      <p className="text-xs text-gray-500">
                        Delivery Status
                      </p>

                      <p className="text-sm font-medium text-gray-700 mt-2">
                        {order.delivery}
                      </p>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-100">

                    {(order.status === "shipped" ||
                      order.status === "out_for_delivery") && (
                      <Link
                        href="/account/track-order"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-[#0c213c] hover:text-[#0c213c] transition"
                      >
                        <FaMapMarkerAlt />
                        Track Order
                      </Link>
                    )}

                  </div>

                </div>

              </div>
            );
          })
        )}

      </div>}

      {/* Pagination */}
      {user && lastPage > 1 && !loading && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <button disabled={page <= 1} onClick={() => { setLoading(true); setPage((current) => Math.max(1, current - 1)); }} className="rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:opacity-40">← Previous</button>
          <span className="text-sm text-gray-500">Page {page} of {lastPage}</span>
          <button disabled={page >= lastPage} onClick={() => { setLoading(true); setPage((current) => Math.min(lastPage, current + 1)); }} className="rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:opacity-40">Next →</button>
        </div>
      )}

    </div>
  );
}
