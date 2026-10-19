const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");

async function getPage(slug, type) {
    try {
        const response = await fetch(`${API_URL}/${type}/${encodeURIComponent(slug)}`, {
            headers: { Accept: "application/json" },
            cache: "no-store",
        });
        if (!response.ok) return null;
        const payload = await response.json();
        return payload.data || null;
    } catch {
        return null;
    }
}

export async function getProductPage(slug) {
    return getPage(slug, "product-pages");
}

export async function getVeterinaryPage(slug) {
    return getPage(slug, "veterinary-pages");
}

function pageMetadata(page) {
    if (!page) return {};
    const title = page.meta_title || page.content?.meta_title || page.content?.seo_title || page.title;
    const description = page.content?.seo_description || page.description || "";
    const keywords = String(page.content?.seo_keywords || "").split(",").map((keyword) => keyword.trim()).filter(Boolean);
    return {
        title,
        ...(description ? { description } : {}),
        ...(keywords.length ? { keywords } : {}),
        openGraph: { title, ...(description ? { description } : {}) },
    };
}

export async function productPageMetadata(slug) {
    const page = await getProductPage(slug);
    return pageMetadata(page);
}

export async function veterinaryPageMetadata(slug) {
    const page = await getVeterinaryPage(slug);
    return pageMetadata(page);
}
