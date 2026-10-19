"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
    const router = useRouter();
    const { register, verifyLoginOtp } = useAuth();
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [challengeId, setChallengeId] = useState("");
    const [signupEmail, setSignupEmail] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setPending(true);
        const form = new FormData(event.currentTarget);
        if (challengeId) {
            try {
                await verifyLoginOtp({ challenge_id: challengeId, code: form.get("code") });
                router.push("/account");
            } catch (requestError) {
                setError(requestError.message);
            } finally {
                setPending(false);
            }
            return;
        }
        const password = form.get("password");

        if (password !== form.get("password_confirmation")) {
            setError("The passwords do not match.");
            setPending(false);
            return;
        }

        try {
            const response = await register({
                name: form.get("name"),
                email: form.get("email"),
                phone: form.get("phone"),
                password,
                password_confirmation: form.get("password_confirmation"),
            });
            if (response.otp_required) {
                setSignupEmail(String(form.get("email") || "").trim());
                setChallengeId(response.challenge_id);
            } else {
                router.push("/account");
            }
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setPending(false);
        }
    }

    return (
        <main className="flex justify-center bg-blue-100 px-2 py-4 md:px-5 md:py-10 lg:px-10 lg:py-15">
            <section className="w-[95%] rounded-2xl bg-white shadow-fuchsia-100 md:w-[80%] lg:w-[65%] xl:w-1/2">
                <div className="p-4 md:p-10">
                    <h1 className="mb-2 text-center text-2xl font-bold text-[#0c213c] md:text-3xl lg:text-4xl">Create Your Account</h1>
                    <p className="text-center">Join Katharine Pharma for convenient access to animal nutrition products.</p>
                    {challengeId ? <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900">A 6-digit verification code was sent to <strong>{signupEmail}</strong>. Verify your email to finish creating your account.</p>
                        <label className="block text-sm font-medium md:text-lg">Email verification code
                            <input required type="text" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} placeholder="Enter 6-digit code" className="mt-1 w-full rounded border border-blue-300 px-3 py-3 tracking-[0.3em]" />
                        </label>
                        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                        <Button type="submit" className="w-full" disabled={pending}>{pending ? "Verifying…" : "Verify email"}</Button>
                        <button type="button" onClick={() => { setChallengeId(""); setSignupEmail(""); setError(""); }} className="w-full text-sm font-semibold text-blue-600">Back to registration</button>
                    </form> : <form onSubmit={handleSubmit} className="mt-4">
                        <label className="mb-3 block text-sm font-medium md:text-lg">Full Name
                            <input required type="text" name="name" autoComplete="name" placeholder="Enter your full name" className="mt-1 w-full rounded border border-blue-300 px-3 py-3" />
                        </label>
                        <div className="grid gap-x-4 md:grid-cols-2">
                            <label className="mb-3 block text-sm font-medium md:text-lg">Email Address
                                <input required type="email" name="email" autoComplete="email" placeholder="Enter your email address" className="mt-1 w-full rounded border border-blue-300 px-3 py-3" />
                            </label>
                            <label className="mb-3 block text-sm font-medium md:text-lg">Mobile Number
                                <input type="tel" name="phone" autoComplete="tel" placeholder="Enter your mobile number" className="mt-1 w-full rounded border border-blue-300 px-3 py-3" />
                            </label>
                            <label className="mb-3 block text-sm font-medium md:text-lg">Password
                                <input required minLength={8} type="password" name="password" autoComplete="new-password" placeholder="Create a password" className="mt-1 w-full rounded border border-blue-300 px-3 py-3" />
                            </label>
                            <label className="mb-3 block text-sm font-medium md:text-lg">Confirm Password
                                <input required minLength={8} type="password" name="password_confirmation" autoComplete="new-password" placeholder="Confirm your password" className="mt-1 w-full rounded border border-blue-300 px-3 py-3" />
                            </label>
                        </div>
                        <label className="mt-2 flex items-start text-xs md:text-sm">
                            <input required type="checkbox" className="mt-1 h-4 w-4" />
                            <span className="pl-2">I agree to the <Link href="/terms-and-condition" className="font-semibold text-blue-500">Terms &amp; Conditions</Link> and <Link href="/privacy-policy" className="font-semibold text-blue-500">Privacy Policy</Link>.</span>
                        </label>
                        {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                        <Button type="submit" className="mt-4 w-full" disabled={pending}>{pending ? "Creating account…" : "Create Account"}</Button>
                    </form>}
                    {!challengeId && <p className="mt-3 text-center">Already have an account? <Link href="/login" className="text-blue-500">Sign In</Link></p>}
                </div>
            </section>
        </main>
    );
}
