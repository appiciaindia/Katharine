"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { apiRequest } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        apiRequest("/auth/me")
            .then((response) => {
                if (active) setUser(response.data);
            })
            .catch(() => {
                if (active) setUser(null);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    async function login(credentials) {
        const response = await apiRequest("/auth/login", {
            method: "POST",
            body: credentials,
        });
        if (response.otp_required) return response;
        setUser(response.data);
        return response;
    }

    async function verifyLoginOtp(details) {
        const response = await apiRequest("/auth/verify-login-otp", {
            method: "POST",
            body: details,
        });
        setUser(response.data);
        return response.data;
    }

    async function register(details) {
        const response = await apiRequest("/auth/register", {
            method: "POST",
            body: details,
        });
        if (response.otp_required) return response;
        setUser(response.data);
        return response.data;
    }

    async function logout() {
        try {
            await apiRequest("/auth/logout", { method: "POST" });
        } finally {
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isLoggedIn: Boolean(user),
            login,
            verifyLoginOtp,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
