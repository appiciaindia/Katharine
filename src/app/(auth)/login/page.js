"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { BiLeaf } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { IoIosNutrition, IoMdClose } from "react-icons/io";
import { VscWorkspaceTrusted } from "react-icons/vsc";

export default function LoginPage() {
    const router = useRouter();
    const { login, verifyLoginOtp } = useAuth();
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [challengeId, setChallengeId] = useState("");
    const [loginEmail, setLoginEmail] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setPending(true);
        const form = new FormData(event.currentTarget);

        try {
            if (challengeId) {
                await verifyLoginOtp({ challenge_id: challengeId, code: form.get("code") });
                router.push("/account");
            } else {
                const email = String(form.get("email") || "").trim();
                const response = await login({ email, password: form.get("password") });
                if (response.otp_required) {
                    setLoginEmail(email);
                    setChallengeId(response.challenge_id);
                } else {
                    router.push("/account");
                }
            }
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setPending(false);
        }
    }

    return (
        <main className="flex justify-center bg-blue-100 px-2 py-5 md:px-5 md:py-14 lg:px-10 lg:py-20">
            <section className="relative grid w-[95%] rounded-2xl bg-white shadow-fuchsia-100 md:w-[90%] lg:grid-cols-2">
                <div className="relative rounded-t-2xl bg-[linear-gradient(#ebebebd9,#f1ededd1),url('/images/choose.png')] bg-cover bg-center p-4 text-center md:p-8 lg:rounded-l-2xl lg:text-left">
                    <img src="/logo.png" alt="Katharine Pharma" className="m-auto w-50 lg:m-0" />
                    <h1 className="mb-2 mt-5 text-2xl font-bold md:text-3xl lg:text-4xl lg:leading-11"><span className="text-[#0c213c]">Better Animal Health for a</span> <span className="text-green-700">Brighter Tomorrow</span></h1>
                    <p className="md:text-lg">Trusted nutrition and healthcare solutions for healthier livestock and better animal care.</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 lg:absolute lg:bottom-3 lg:left-1/2 lg:w-[90%] lg:-translate-x-1/2 lg:grid-cols-4">
                        <div className="text-center"><VscWorkspaceTrusted className="m-auto text-4xl" /><h2 className="mt-1 font-semibold">Trusted Products</h2></div>
                        <div className="text-center"><IoIosNutrition className="m-auto text-4xl" /><h2 className="mt-1 font-semibold">Better Nutrition</h2></div>
                        <div className="text-center"><FaRegHeart className="m-auto text-4xl" /><h2 className="mt-1 font-semibold">Healthier Livestock</h2></div>
                        <div className="text-center"><BiLeaf className="m-auto text-4xl" /><h2 className="mt-1 font-semibold">Sustainable Farming</h2></div>
                    </div>
                </div>

                <div className="p-4 md:p-10">
                    <h2 className="mb-2 text-center text-2xl font-bold text-[#0c213c] md:text-3xl lg:text-4xl">Welcome Back to <span className="text-green-600">Katharine Pharma</span></h2>
                    <p className="text-center">Sign in to manage your orders, delivery details and account.</p>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                        {challengeId ? <>
                            <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900">A 6-digit sign-in code was sent to <strong>{loginEmail}</strong>. Enter it to finish signing in.</p>
                            <label className="block text-lg font-medium">Email verification code
                                <input type="text" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required placeholder="Enter 6-digit code" className="mt-1 w-full rounded border border-blue-300 px-4 py-3 tracking-[0.3em]" />
                            </label>
                            <button type="button" onClick={() => { setChallengeId(""); setLoginEmail(""); setError(""); }} className="block font-semibold text-blue-500">Back to login</button>
                        </> : <>
                            <label className="block text-lg font-medium">Email Address
                                <input type="email" name="email" autoComplete="email" required placeholder="Enter your registered email" className="mt-1 w-full rounded border border-blue-300 px-4 py-3" />
                            </label>
                            <label className="block text-lg font-medium">Password
                                <input type="password" name="password" autoComplete="current-password" required placeholder="Enter your password" className="mt-1 w-full rounded border border-blue-300 px-4 py-3" />
                            </label>
                            <Link href="/forgot-password" className="block font-semibold text-blue-500">Forgot Password?</Link>
                        </>}
                        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                        <Button type="submit" className="mt-3 w-full" disabled={pending}>{pending ? (challengeId ? "Verifying…" : "Signing in…") : (challengeId ? "Verify code" : "Login")}</Button>
                    </form>
                    {!challengeId && <p className="mt-3 text-center">Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Create an Account</Link></p>}
                </div>
                <Link href="/shop" aria-label="Close login" className="absolute right-2.5 top-2.5 flex h-13 w-13 items-center justify-center rounded-full border border-blue-200 text-3xl transition hover:border-red-600 hover:text-red-600"><IoMdClose /></Link>
            </section>
        </main>
    );
}
