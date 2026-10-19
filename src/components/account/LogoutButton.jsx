"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      router.push("/login");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div>
      <button onClick={handleLogout} className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-600 transition hover:bg-red-50">
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </button>
      {error && <p role="alert" className="px-4 text-xs text-red-700">{error}</p>}
    </div>
  );
}
