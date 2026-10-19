import ProductDetails from "@/components/shoping/ProductDetails";
import products from "@/data/products";
import { Suspense } from "react";
import { connection } from "next/server";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const fallback = products.find((product) => product.slug === slug);
    let product = fallback;

    try {
        const response = await fetch(`${API_URL}/products/${encodeURIComponent(slug)}`, {
            headers: { Accept: "application/json" },
            cache: "no-store",
        });
        if (response.ok) {
            const payload = await response.json();
            product = payload.data || fallback;
        }
    } catch {
        // Keep route metadata usable when the API is temporarily unavailable.
    }

    const title = product?.seo_title || product?.name || "Animal Health Product";
    const description = product?.seo_description || product?.short_description || product?.description || "Explore animal nutrition and wellness products from Katharine Pharmaceuticals.";
    const keywords = String(product?.seo_keywords || "").split(",").map((keyword) => keyword.trim()).filter(Boolean);

    return {
        title,
        description,
        ...(keywords.length ? { keywords } : {}),
        openGraph: { title, description },
    };
}

export function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default function Page({ params }) {
    return <><ProductDetails params={params} /><Suspense><RuntimeMetadataMarker /></Suspense></>;
}

async function RuntimeMetadataMarker() {
    await connection();
    return null;
}
