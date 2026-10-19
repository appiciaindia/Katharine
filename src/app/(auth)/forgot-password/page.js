"use client";

import { useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setPending(true);
    const email = new FormData(event.currentTarget).get("email");

    try {
      const response = await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: { email },
      });
      setMessage(response.message);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-blue-100 px-4 py-12">
      <section className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
        <h1 className="text-center text-2xl font-bold text-[#0c213c] md:text-3xl">Reset your password</h1>
        <p className="mt-3 text-center text-gray-600">Enter your account email and we’ll send reset instructions.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Email Address
            <input required type="email" name="email" autoComplete="email" className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3" />
          </label>
          {message && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p>}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={pending} className="w-full rounded-xl bg-[#113173] px-5 py-3 font-semibold text-white disabled:opacity-60">{pending ? "Sending…" : "Send reset instructions"}</button>
        </form>
        <div className="mt-6 flex justify-center gap-5 text-sm font-semibold">
          <Link href="/login" className="text-blue-600 hover:underline">Back to login</Link>
          <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
        </div>
      </section>
    </main>
  );
}
