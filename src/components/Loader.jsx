"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./Loader.css";

export default function Loader({ inline = false, label = "Loading Katharine Pharma" }) {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (inline) return undefined;
        const timer = window.setTimeout(() => setShowLoader(false), 1800);
        return () => window.clearTimeout(timer);
    }, [inline]);

    if (!inline && !showLoader) return null;

    return (
        <div className={`katharine-loader${inline ? " katharine-loader-inline" : ""}`} role="status" aria-label={label}>
            <div className="loader-content">
                <div className="loader-ring" aria-hidden="true" />
                <div className="logo-wrapper">
                    <Image
                        src="/logo.png"
                        alt="Katharine Pharma"
                        width={500}
                        height={180}
                        priority
                        className="katharine-logo"
                    />
                </div>
                <div className="loading-dots" aria-hidden="true"><span /><span /><span /></div>
                {inline && <span className="loader-label">{label}</span>}
            </div>
        </div>
    );
}
