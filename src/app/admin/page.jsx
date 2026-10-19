"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user?.role !== "admin") router.replace("/admin/login");
    }, [loading, router, user]);

    if (loading || user?.role !== "admin") {
        return <main className="grid min-h-screen place-items-center text-gray-600">Opening admin panel…</main>;
    }

    return <AdminDashboard />;
}
