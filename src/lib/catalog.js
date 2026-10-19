"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import localProducts from "@/data/products";
import { categories as localCategories } from "@/data/categories";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");
const API_ORIGIN = API_URL.replace(/\/api$/, "");

function imageUrl(path, fallback = "") {
    if (!path) return fallback;
    if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
    const normalized = String(path).replace(/^\/+/, "");
    if (normalized.startsWith("images/") || normalized.startsWith("logo")) {
        return `/${normalized}`;
    }
    return `${API_ORIGIN}/api/media/${normalized.replace(/^storage\//, "")}`;
}

export function normalizeProduct(product) {
    const fallback = localProducts.find((item) => item.slug === product.slug);
    const listedPrice = Number(product.price || 0);
    const price = Number(product.sale_price ?? product.price ?? 0);
    const oldPrice = Number(product.mrp ?? (listedPrice > price ? listedPrice : fallback?.oldPrice ?? 0));
    const hasReviewStats = product.review_count !== undefined || product.reviews_count !== undefined;
    const rating = Number(hasReviewStats
        ? product.rating ?? product.reviews_avg_rating ?? 0
        : product.rating ?? fallback?.rating ?? 0);
    const reviewCount = Number(product.review_count ?? product.reviews_count ?? fallback?.reviews ?? 0);
    const category = product.category || {};
    const extraImages = (product.images || []).map((item) => imageUrl(item.path || item.image || item.url)).filter(Boolean);
    const ingredients = (product.ingredients || fallback?.ingredients || []).map((item) =>
        typeof item === "string" ? item : [item.name, item.quantity].filter(Boolean).join(" — "),
    );
    const animalTypes = (product.animal_categories || product.animalCategories || []).map((item) => item.name);

    return {
        ...fallback,
        ...product,
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: imageUrl(product.image, fallback?.image || "/logo.png"),
        images: [...new Set([imageUrl(product.image, fallback?.image || "/logo.png"), ...extraImages])],
        price,
        oldPrice: oldPrice > price ? oldPrice : undefined,
        rating,
        reviewCount,
        reviews: reviewCount,
        category: category.name || fallback?.category || "Animal Nutrition",
        categoryName: category.name || fallback?.category || "Animal Nutrition",
        categorySlug: category.slug || fallback?.categorySlug || "animal-wellness",
        shortDescription: product.short_description || fallback?.shortDescription || "",
        description: product.description || fallback?.description || "",
        ingredients,
        animalTypes: animalTypes.length ? animalTypes : fallback?.animalTypes || [],
        suitableFor: animalTypes.length ? animalTypes : fallback?.suitableFor || [],
        benefits: Array.isArray(product.benefits) ? product.benefits : fallback?.benefits || [],
        dosage: product.dosage || fallback?.dosage || "",
        storage: product.storage_instructions || product.storage || fallback?.storage || "",
        stock: Number(product.stock ?? fallback?.stock ?? 0),
        new_arrival: Boolean(product.new_arrival),
    };
}

export function normalizeCategory(category) {
    const fallback = localCategories.find((item) => item.slug === category.slug);
    const imagePath = category.image || "";
    const heroImage = imagePath
        ? (imagePath.includes("/") ? imageUrl(imagePath) : `/images/${imagePath}`)
        : fallback?.heroImage || "/logo.png";

    return {
        ...fallback,
        ...category,
        title: category.hero_title || fallback?.title || fallback?.heroTitle || category.name,
        heroTitle: category.hero_title || fallback?.heroTitle || category.name,
        heroImage,
        whyImage: category.why_image ? imageUrl(category.why_image) : fallback?.whyImage || heroImage,
        benefits: Array.isArray(category.benefits) ? category.benefits : fallback?.benefits || [],
        whyTitle: category.why_title || fallback?.whyTitle || `Why Choose ${category.name}?`,
        whyPoints: Array.isArray(category.why_points) ? category.why_points : fallback?.whyPoints || [],
        animals: Array.isArray(category.animals) ? category.animals : fallback?.animals || [],
    };
}

function useCatalogValue(initialData, load, dependencyKey) {
    const [state, setState] = useState(() => ({
        key: dependencyKey,
        data: initialData,
        loading: true,
        error: null,
    }));

    useEffect(() => {
        let active = true;
        const controller = new AbortController();

        load(controller.signal)
            .then((value) => {
                if (active) setState({ key: dependencyKey, data: value, loading: false, error: null });
            })
            .catch((requestError) => {
                if (active && requestError.name !== "AbortError") {
                    setState({ key: dependencyKey, data: initialData, loading: false, error: requestError });
                }
            });

        return () => {
            active = false;
            controller.abort();
        };
        // The loader changes only when its stable key changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependencyKey]);

    const isCurrent = state.key === dependencyKey;
    return {
        data: isCurrent ? state.data : initialData,
        loading: !isCurrent || state.loading,
        error: isCurrent ? state.error : null,
    };
}

export function useCatalogProducts({ categorySlug = "", featured = false, animalSlug = "" } = {}) {
    const query = new URLSearchParams({ per_page: "48" });
    if (categorySlug) query.set("category", categorySlug);
    if (featured) query.set("featured", "1");
    if (animalSlug) query.set("animal", animalSlug);

    let fallback = categorySlug
        ? localProducts.filter((product) => product.categorySlug === categorySlug)
        : localProducts;
    if (featured) fallback = fallback.filter((product) => product.featured || product.isBestSelling);
    if (animalSlug) {
        const requestedAnimals = animalSlug.split(",").map((animal) => animal.trim().toLowerCase()).filter(Boolean);
        fallback = fallback.filter((product) => {
            const animals = product.suitableFor || product.animalTypes || [];
            return animals.some((animal) => requestedAnimals.some((requested) => String(animal).toLowerCase().includes(requested)));
        });
    }

    return useCatalogValue(fallback, async (signal) => {
        const response = await apiRequest(`/products?${query.toString()}`, { signal });
        return (response.data || []).map(normalizeProduct);
    }, `${categorySlug}:${featured}:${animalSlug}`);
}

export function useCatalogCategories() {
    return useCatalogValue(localCategories, async (signal) => {
        const response = await apiRequest("/categories", { signal });
        return (response.data || []).map(normalizeCategory);
    }, "categories");
}

export function useCatalogProduct(slug) {
    const fallback = localProducts.find((product) => product.slug === slug) || null;

    return useCatalogValue(fallback, async (signal) => {
        if (!slug) return null;
        const response = await apiRequest(`/products/${encodeURIComponent(slug)}`, { signal });
        return response.data ? normalizeProduct(response.data) : null;
    }, slug || "product:");
}
