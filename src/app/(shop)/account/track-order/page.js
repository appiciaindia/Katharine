"use client";

import { useState } from "react";
import { FaSearch, FaTruck } from "react-icons/fa";
import { apiRequest } from "@/lib/api";

export default function TrackOrderPage() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setOrder(null);
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);

    try {
      const response = await apiRequest("/orders/track", {
        method: "POST",
        body: {
          order_number: form.get("order_number"),
          contact: form.get("contact"),
        },
      });
      setOrder(response.data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#113173] md:text-3xl">Track Your Order</h1>
        <p className="mt-1 text-gray-500">Enter your order number and registered contact details.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold text-gray-700">
            Order number
            <input required name="order_number" autoComplete="off" placeholder="e.g. KP12345678" className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 font-normal outline-none focus:border-[#0293fd]" />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Mobile number or email
            <input required name="contact" autoComplete="email" placeholder="Registered mobile or email" className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 font-normal outline-none focus:border-[#0293fd]" />
          </label>
            <button disabled={pending} type="submit" className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#0293fd] px-5 py-3 font-semibold text-white transition hover:bg-[#027fdc] disabled:opacity-60">
            <FaSearch /> {pending ? "Checking…" : "Track Order"}
          </button>
        </form>

        {error && (
          <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}
        {order && (
          <div role="status" className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
            <div className="flex items-start gap-3">
              <FaTruck className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Order {order.order_number}: {order.status}</p>
                <p className="mt-1">Payment: {order.payment_status} · Total: ₹{Number(order.grand_total).toLocaleString("en-IN")}</p>
                <ul className="mt-3 space-y-1">
                  {order.items?.map((item) => <li key={item.id}>{item.product_name} × {item.quantity}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
