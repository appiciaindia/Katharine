"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");
const API_ORIGIN = API_URL.replace(/\/api$/, "");

function resolveLogo(value) {
    if (!value) return "/logo.png";
    if (/^(https?:)?\/\//i.test(value)) return value;
    const path = String(value).replace(/^\/+/, "").replace(/^storage\//, "");
    if (path.startsWith("images/") || path.startsWith("logo")) return `/${path}`;
    return `${API_ORIGIN}/api/media/${path}`;
}

export function useSiteSettings() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        let active = true;
        apiRequest("/settings")
            .then((response) => {
                if (active) setSettings(response.data || null);
            })
            .catch(() => {
                if (active) setSettings(null);
            });

        return () => {
            active = false;
        };
    }, []);

    return {
        siteTitle: settings?.site_title || "Katharine Pharmaceuticals Private Limited, Jaipur",
        siteLogo: resolveLogo(settings?.site_logo),
    };
}
