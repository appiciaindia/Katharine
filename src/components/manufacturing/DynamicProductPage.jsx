"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import MenufatureHero from "@/components/manufacturing/ManufatureHero";
import ProductListing from "@/components/manufacturing/ProductListing";
import WhyChoose from "@/components/manufacturing/WhyChoose";
import ProductsListFaq from "@/components/coman/ProductsListFaq";
import Loader from "@/components/Loader";
import { normalizePageFaqs, normalizeWhyPoints } from "@/lib/product-page-content";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");
const API_ORIGIN = API_URL.replace(/\/api$/, "");

function resolvePageImage(path, fallback) {
    if (!path) return fallback;
    if (/^(https?:)?\/\//i.test(path) || path.startsWith("/")) return path;
    return `${API_ORIGIN}/api/media/${path}`;
}

export default function DynamicProductPage({ slug }) {
    const [page, setPage] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        apiRequest(`/product-pages/${encodeURIComponent(slug)}`).then(async (response) => {
            const pageData = response.data;
            const catalog = await apiRequest(`/products?product_form=${encodeURIComponent(pageData.product_form)}&per_page=48`);
            if (active) { setPage(pageData); setProducts(catalog.data || []); }
        }).catch((requestError) => { if (active) setError(requestError.message || "This product page could not be loaded."); });
        return () => { active = false; };
    }, [slug]);

    if (error) return <main className="mx-auto max-w-5xl px-5 py-20 text-center"><h1 className="text-3xl font-bold">Page unavailable</h1><p className="mt-3 text-slate-600">{error}</p></main>;
    if (!page) return <main className="mx-auto max-w-5xl px-5 py-10"><Loader inline label="Loading products…" /></main>;

    const displayProducts = products.map((product) => ({
        ...product,
        product_name: product.name,
        suitable_for: (product.animal_categories || []).map((animal) => animal.name),
        packing: product.pack_sizes || [],
        composition_title: "Composition / Ingredients",
    }));
    const formLabel = `${page.product_form[0].toUpperCase()}${page.product_form.slice(1)}`;
    const defaultWhyList = [
        { title: "Thoughtful Formulations", subtitle: `Explore ${page.product_form} products with composition details.`, img: "/icons/ch1.png" },
        { title: "Suitable Animal Types", subtitle: "Check the animal categories listed for each product.", img: "/icons/ch2.png" },
        { title: "Product Variety", subtitle: "Browse our published products in this product form.", img: "/icons/products.png" },
        { title: "Composition Details", subtitle: "Review ingredients and quantities shared by our team.", img: "/icons/ch4.png" },
    ];
    const defaultFaqs = [
        { question: `What ${page.product_form} products are available?`, answer: `This page lists published ${page.product_form} products managed by Katharine Pharma.` },
        { question: "Where can I find product composition?", answer: "Select View Composition in the product list to see its ingredients and quantities." },
        { question: "Which animals are these products for?", answer: "Suitable animal types are shown alongside each product when those details have been added." },
        { question: "How do I order a product?", answer: "Open our shop to browse available products and current ordering options." },
    ];
    const content = page.content || {};
    const introParagraphs = Array.isArray(content.intro_paragraphs) ? content.intro_paragraphs : [];
    const listingIntro = introParagraphs.map((paragraph) => String(paragraph || "").trim()).filter(Boolean).join(" ");
    const defaultListingIntro = `Browse our range of ${page.product_form}-form animal nutrition products. Check each product's composition, pack sizes and suitable animal categories.`;
    const whyPoints = normalizeWhyPoints(content.why_points);
    const whyList = whyPoints.length
        ? whyPoints.map((item, index) => ({
            title: item.title,
            subtitle: item.description,
            img: `/icons/${["ch1.png", "ch2.png", "products.png", "ch4.png"][index % 4]}`,
        }))
        : defaultWhyList;
    const faqs = normalizePageFaqs(content.faqs);
    const pageFaqs = faqs.length ? faqs : defaultFaqs;

    return <main>
        <MenufatureHero title={content.hero_title || page.title} subTitle={content.hero_description || page.description || `Explore our ${page.product_form} animal nutrition and veterinary products.`} btnUrl={content.hero_button_url || "/shop"} buttonText={content.hero_button_text || `Shop ${formLabel} Products`} tagline={content.hero_tagline || `${formLabel} Products`} heroImg={resolvePageImage(content.hero_image, page.product_form === "liquid" ? "/images/liquid-supplements.png" : "/images/veterinary-supplements.webp")} />
        <ProductListing title={content.products_title || content.intro_title || `Explore Our ${formLabel} Products`} subtitle={content.products_description || listingIntro || defaultListingIntro} list={displayProducts} />
        <div className="grid pb-10 px-3 md:px-7 lg:grid-cols-2 lg:px-10 lg:pb-20 md:pb-14">
            <WhyChoose title={content.why_title || `Why Choose ${formLabel} Products?`} whyList={whyList} />
            <ProductsListFaq title={content.faq_title || `FAQs About ${formLabel} Products`} faqs={pageFaqs} />
        </div>
    </main>;
}
