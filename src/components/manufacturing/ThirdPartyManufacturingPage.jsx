"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import ManufacturingBenefits from "@/components/manufacturing/ManufacturingBenefits";
import ManufacturingCTA from "@/components/manufacturing/ManufacturingCTA";
import ManufacturingEnquiry from "@/components/manufacturing/ManufacturingEnquiry";
import ManufacturingFaq from "@/components/manufacturing/ManufacturingFaq";
import ManufacturingIntro from "@/components/manufacturing/ManufacturingIntro";
import ManufacturingSection from "@/components/manufacturing/ManufacturingSection";
import MenufatureHero from "@/components/manufacturing/ManufatureHero";
import PrivateLabel from "@/components/manufacturing/PrivateLabel";
import ProductListing from "@/components/manufacturing/ProductListing";
import ProductRange from "@/components/manufacturing/ProductRange";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");
const API_ORIGIN = API_URL.replace(/\/api$/, "");

function imageUrl(path, fallback) {
    if (!path) return fallback;
    if (/^(https?:)?\/\//i.test(path) || path.startsWith("/")) return path;
    return `${API_ORIGIN}/api/media/${path}`;
}

export default function ThirdPartyManufacturingPage() {
    const [page, setPage] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        Promise.all([
            apiRequest("/product-pages/third-party-manufacturing-pharma"),
            apiRequest("/products?per_page=48"),
        ]).then(([pageResponse, productResponse]) => {
            if (active) {
                setPage(pageResponse.data);
                setProducts(productResponse.data || []);
            }
        }).catch((requestError) => {
            if (active) setError(requestError.message || "Could not load this page.");
        });
        return () => { active = false; };
    }, []);

    if (error) return <main className="mx-auto max-w-4xl px-5 py-20 text-center"><h1 className="text-3xl font-bold">Page content could not be loaded</h1><p className="mt-3 text-slate-600">{error}</p></main>;
    if (!page) return <main className="px-5 py-20 text-center text-slate-500">Loading manufacturing page…</main>;

    const content = page.content || {};
    const productRows = products.map((product) => ({
        ...product,
        product_name: product.name,
        suitable_for: (product.animal_categories || []).map((animal) => animal.name),
        packing: product.pack_sizes || [],
        composition_title: "Composition / Ingredients",
    }));

    return <>
        <MenufatureHero title={content.hero_title || page.title} tagline={content.hero_tagline || "THIRD PARTY MANUFACTURING"} subTitle={page.description} heroImg={imageUrl(content.hero_image, "/images/third-party-manufacturing.png")} btnUrl={content.hero_button_url || "/contact"} buttonText={content.hero_button_text || "Get a Quote"} />
        <ManufacturingIntro title={content.intro_title} paragraphs={content.intro_paragraphs} />
        <ProductListing title="Our Manufacturing Product Range" subtitle="Published products appear here automatically. Use View Composition to check product ingredients, suitable animals and pack sizes." list={productRows} />
        <ProductRange />
        <PrivateLabel />
        <ManufacturingBenefits />
        <ManufacturingCTA />
        <ManufacturingSection why={{ title: content.why_title, subtitle: content.why_subtitle, description: content.why_description, points: content.why_points }} />
        <ManufacturingEnquiry />
        <ManufacturingFaq title={content.faq_title} items={content.faqs} />
    </>;
}
