"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
    const router = useRouter();
    const { user, loading, login, verifyLoginOtp, logout } = useAuth();
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [challengeId, setChallengeId] = useState("");
    const [loginEmail, setLoginEmail] = useState("");

    async function handleExistingCustomerLogout() {
        setError("");
        try {
            await logout();
        } catch (requestError) {
            setError(requestError.message);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        const form = new FormData(event.currentTarget);
        try {
            let account;
            if (challengeId) {
                account = await verifyLoginOtp({ challenge_id: challengeId, code: form.get("code") });
            } else {
                const email = String(form.get("email") || "").trim();
                account = await login({ email, password: form.get("password") });
                if (account.otp_required) {
                    setLoginEmail(email);
                    setChallengeId(account.challenge_id);
                    return;
                }
                // The login API returns { data: user, otp_required: false }.
                // Normalize it to the user object before checking the role.
                account = account.data ?? account;
            }
            if (account.role !== "admin") {
                await logout();
                setError("This account does not have admin access.");
                return;
            }
            router.replace("/admin");
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <main className="grid min-h-screen place-items-center text-gray-600">Checking your session…</main>;
    }

    if (user?.role === "admin") {
        redirect("/admin");
    }

    return (
        <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10">
            <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
                <Link href="/" className="text-sm font-semibold text-blue-700">← Back to storefront</Link>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Katharine Pharma</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin sign in</h1>
                <p className="mt-2 text-sm text-slate-600">Use the administrator account created for this store.</p>

                {error && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}

                {user && user.role !== "admin" ? (
                    <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                        <p>This browser is signed in as a customer. Sign out before using the separate admin account.</p>
                        <button type="button" onClick={handleExistingCustomerLogout} className="mt-3 font-semibold underline">Sign out of customer account</button>
                    </div>
                ) : <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {challengeId ? <>
                        <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">Enter the 6-digit code sent to <strong>{loginEmail}</strong>.</p>
                        <label className="block text-sm font-medium text-slate-700">Email verification code
                            <input name="code" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 tracking-[0.3em] outline-none focus:border-blue-600" />
                        </label>
                        <button type="button" onClick={() => { setChallengeId(""); setLoginEmail(""); setError(""); }} className="text-sm font-semibold text-blue-700 underline">Back to sign in</button>
                    </> : <>
                    <label className="block text-sm font-medium text-slate-700">
                        Email
                        <input name="email" type="email" autoComplete="username" required className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                        Password
                        <input name="password" type="password" autoComplete="current-password" required className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" />
                    </label>
                    </>}
                    <button type="submit" disabled={submitting} className="w-full rounded-xl bg-[#113173] px-4 py-3 font-semibold text-white transition hover:bg-blue-900 disabled:cursor-wait disabled:opacity-60">
                        {submitting ? (challengeId ? "Verifying…" : "Signing in…") : (challengeId ? "Verify code" : "Sign in to admin")}
                    </button>
                </form>}
            </section>
        </main>
    );
}
