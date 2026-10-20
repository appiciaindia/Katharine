"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";
import { normalizePageFaqs, normalizeWhyPoints } from "@/lib/product-page-content";
import { useAuth } from "@/context/AuthContext";
import localProducts from "@/data/products";

const SECTIONS = [
    { id: "dashboard", label: "Overview", endpoint: "/admin/dashboard" },
    { id: "products", label: "Products", endpoint: "/admin/products" },
    { id: "product-pages", label: "Product listing pages", endpoint: "/admin/product-pages" },
    { id: "veterinary-pages", label: "Veterinary Products", endpoint: "/admin/veterinary-pages" },
    { id: "categories", label: "Categories", endpoint: "/admin/categories" },
    { id: "animals", label: "Animal types", endpoint: "/admin/animal-categories" },
    { id: "orders", label: "Orders", endpoint: "/admin/orders" },
    { id: "reviews", label: "Reviews", endpoint: "/admin/reviews" },
    { id: "settings", label: "Site settings", endpoint: "/admin/settings" },
    { id: "hero-banners", label: "Home hero banners", endpoint: "/admin/hero-banners" },
    { id: "customers", label: "Customers", endpoint: "/admin/customers" },
    { id: "enquiries", label: "Enquiries", endpoint: "/admin/enquiries" },
    { id: "coupons", label: "Coupons", endpoint: "/admin/coupons" },
    { id: "blog", label: "Blog", endpoint: "/admin/blog" },
];

const ORDER_STATUSES = ["confirmed", "processing", "shipped", "delivered", "cancelled", "returned"];
const ENQUIRY_STATUSES = ["new", "in_progress", "resolved", "closed"];

const emptyProduct = {
    name: "", slug: "", category_id: "", short_description: "", description: "",
    product_form: "",
    sku: "", price: "", sale_price: "", mrp: "", discount_percent: 0, stock: 0, featured: false, new_arrival: false, status: true,
    seo_title: "", seo_description: "", seo_keywords: "",
    benefitsText: "", dosage: "", storage_instructions: "", ingredientsText: "",
    packSizesText: "",
    animal_category_ids: [], images: [], gallery_alt: "",
};
const emptyCategory = {
    name: "", slug: "", description: "", image: "", hero_title: "", benefitsText: "",
    why_title: "", whyPointsText: "", why_image: "", animalsText: "", status: true,
};
const emptyAnimalCategory = { name: "", slug: "", description: "", image: "", status: true };
const emptyProductPage = {
    title: "", meta_title: "", slug: "", description: "", product_form: "all", status: true,
    hero_title: "", hero_tagline: "", hero_button_text: "", hero_button_url: "", hero_image: "",
    products_title: "", products_description: "",
    why_title: "", why_points_text: "",
    faq_title: "", faq_items_text: "",
    intro_title: "", intro_subtitle: "", intro_paragraphs_text: "", intro_image: "",
    categories_title: "", categories_description: "", featured_title: "", featured_description: "",
    animal_slug: "",
    seo_title: "", seo_subtitle: "", seo_description: "", seo_paragraphs_text: "", seo_image: "",
    forms_title: "", forms_description: "",
};
const emptyCoupon = { code: "", type: "percent", value: "", minimum_order: "", maximum_discount: "", usage_limit: "", starts_at: "", expires_at: "", is_active: true };
const emptyBlog = { title: "", slug: "", excerpt: "", body: "", cover_image: "", status: "draft", published_at: "" };
const emptyHeroBanner = { image: "", destination_url: "", alt_text: "", sort_order: 0, is_active: true };
const defaultSiteSettings = { site_title: "Katharine Pharmaceuticals Private Limited, Jaipur", site_description: "Trader - Wholesaler / Distributor of Animal Feed Supplement, Mineral Mixture & Liquid Calcium offered by Katharine Pharmaceuticals Private Limited from Jaipur, Rajasthan, India", site_keywords: "", site_logo: "" };

function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function money(value) {
    return `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function date(value) {
    if (!value) return "—";
    const parsed = new Date(value);
    return Number.isNaN(parsed.valueOf()) ? value : parsed.toLocaleDateString("en-IN");
}

function Badge({ children }) {
    return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-700">{String(children || "—").replaceAll("_", " ")}</span>;
}

function Field({ label, name, value, onChange, type = "text", required = false, placeholder = "", min, step, maxLength, multiline = false }) {
    const common = {
        name,
        value: value ?? "",
        onChange,
        required,
        placeholder,
        min,
        step,
        maxLength,
        className: "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600",
    };

    return (
        <label className="block text-sm font-medium text-slate-700">
            {label}
            {multiline ? <textarea {...common} rows={4} /> : <input {...common} type={type} />}
        </label>
    );
}

const ADMIN_API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");
const ADMIN_API_ORIGIN = ADMIN_API_URL.replace(/\/api$/, "");

function adminImageUrl(value) {
    if (!value) return "";
    const path = String(value);
    const normalizedPath = (imagePath) => {
        const normalized = imagePath.replace(/^\/+/, "").replace(/^storage\//, "");
        if (normalized.startsWith("images/") || normalized.startsWith("logo")) return `/${normalized}`;
        if (!normalized.includes("/")) return `/images/${normalized}`;
        return `${ADMIN_API_ORIGIN}/api/media/${normalized}`;
    };

    if (/^(https?:)?\/\//i.test(path)) {
        try {
            const parsed = new URL(path);
            const storageIndex = parsed.pathname.indexOf("/storage/");
            if (storageIndex >= 0) return normalizedPath(parsed.pathname.slice(storageIndex + 1));
        } catch {
            return path;
        }
        return path;
    }
    return normalizedPath(path);
}

function ImageUploadField({ label, name, currentImage, accept = "image/jpeg,image/png,image/webp", multiple = false, helper }) {
    const [previews, setPreviews] = useState([]);

    useEffect(() => () => previews.forEach((preview) => URL.revokeObjectURL(preview.src)), [previews]);

    function handleChange(event) {
        const files = Array.from(event.target.files || []);
        setPreviews(files.map((file) => ({ src: URL.createObjectURL(file), name: file.name })));
    }

    const savedImages = Array.isArray(currentImage) ? currentImage : currentImage ? [currentImage] : [];
    const images = previews.length ? previews : savedImages.map((image) => ({
        src: adminImageUrl(typeof image === "string" ? image : image.path || image.url),
        name: typeof image === "string" ? "Current image" : image.alt_text || image.path?.split("/").pop() || "Current image",
    }));

    return (
        <label className="block text-sm font-medium text-slate-700">
            {label}
            <input name={name} type="file" multiple={multiple} accept={accept} onChange={handleChange} className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5" />
            {helper && <span className="mt-1 block text-xs font-normal text-slate-500">{helper}</span>}
            {images.length > 0 && <span className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{images.map((image, index) => <span key={`${image.src}-${index}`} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50"><img src={image.src} alt={image.name} className="h-24 w-full object-contain" /><span className="block truncate px-2 py-1 text-xs font-normal text-slate-500">{image.name}</span></span>)}</span>}
        </label>
    );
}

function DataTable({ children }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                {children}
            </table>
        </div>
    );
}

export default function AdminDashboard() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [section, setSection] = useState("dashboard");
    const [records, setRecords] = useState([]);
    const [categories, setCategories] = useState([]);
    const [animalCategories, setAnimalCategories] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(null);
    const [notice, setNotice] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [pendingStatuses, setPendingStatuses] = useState({});
    const [dashboardData, setDashboardData] = useState(null);
    const [siteSettings, setSiteSettings] = useState(defaultSiteSettings);

    const activeSection = useMemo(() => SECTIONS.find((item) => item.id === section), [section]);

    const loadSection = useCallback(async (activeId = section, page = currentPage) => {
        const config = SECTIONS.find((item) => item.id === activeId);
        if (!config) return;
        setLoading(true);
        try {
            if (activeId === "dashboard") {
                const response = await apiRequest(config.endpoint);
                setDashboardData(response.data || null);
                setRecords([]);
                setPagination(null);
                setNotice(null);
                return;
            }
            if (activeId === "settings") {
                const response = await apiRequest(config.endpoint);
                setSiteSettings({ ...defaultSiteSettings, ...(response.data || {}) });
                setRecords([]);
                setPagination(null);
                setNotice(null);
                return;
            }
            const paginated = ["orders", "customers", "enquiries", "reviews", "coupons", "blog"].includes(activeId);
            const response = await apiRequest(`${config.endpoint}${paginated ? `?page=${page}` : ""}`);
            const responseList = Array.isArray(response.data) ? response.data : [];
            setRecords(responseList);
            setPagination(response.meta || null);
            setNotice(null);
        } catch (error) {
            setNotice({ type: "error", text: error.message });
            setRecords([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }, [currentPage, section]);

    useEffect(() => {
        Promise.resolve().then(() => loadSection(section, currentPage));
    }, [currentPage, loadSection, section]);

    useEffect(() => {
        apiRequest("/admin/categories")
            .then((response) => setCategories(Array.isArray(response.data) ? response.data : []))
            .catch(() => setCategories([]));
        apiRequest("/admin/animal-categories")
            .then((response) => setAnimalCategories(Array.isArray(response.data) ? response.data : []))
            .catch(() => setAnimalCategories([]));
    }, []);

    function startCreate() {
        setEditing("new");
        setNotice(null);
        setFormValues(section === "products" ? { ...emptyProduct, category_id: categories[0]?.id || "" }
            : section === "categories" ? { ...emptyCategory }
                : section === "animals" ? { ...emptyAnimalCategory }
                : section === "product-pages" || section === "veterinary-pages" ? { ...emptyProductPage }
                : section === "coupons" ? { ...emptyCoupon }
                    : section === "hero-banners" ? { ...emptyHeroBanner }
                        : { ...emptyBlog });
    }

    function startEdit(record) {
        setEditing(record.id);
        setNotice(null);
        if (section === "products") {
            const fallback = localProducts.find((product) => product.slug === record.slug) || {};
            setFormValues({
                ...emptyProduct,
                ...record,
                category_id: record.category_id || record.category?.id || "",
                benefitsText: (Array.isArray(record.benefits) ? record.benefits : fallback.benefits || []).join("\n"),
                dosage: record.dosage ?? fallback.dosage ?? "",
                storage_instructions: record.storage_instructions ?? fallback.storage ?? "",
                ingredientsText: (record.ingredients || []).map((item) => [item.name, item.quantity].filter(Boolean).join(" | ")).join("\n"),
                packSizesText: (record.pack_sizes || []).join("\n"),
                animal_category_ids: (record.animal_categories || record.animalCategories || []).map((item) => item.id),
                images: record.images || [],
            });
        }
        else if (section === "categories") setFormValues({
            ...emptyCategory,
            ...record,
            benefitsText: (record.benefits || []).join("\n"),
            whyPointsText: (record.why_points || []).join("\n"),
            animalsText: (record.animals || []).join("\n"),
        });
        else if (section === "animals") setFormValues({ ...emptyAnimalCategory, ...record });
        else if (section === "product-pages" || section === "veterinary-pages") {
            const content = record.content || {};
            setFormValues({
                ...emptyProductPage, ...record, ...content,
                meta_title: record.meta_title || "",
                hero_title: content.hero_title || record.title || "",
                products_title: content.products_title || content.intro_title || "",
                products_description: content.products_description || (content.intro_paragraphs || []).join("\n"),
                intro_paragraphs_text: (content.intro_paragraphs || []).join("\n"),
                seo_paragraphs_text: (content.seo_paragraphs || []).join("\n"),
                why_points_text: normalizeWhyPoints(content.why_points).map((item) => `${item.title} | ${item.description}`).join("\n"),
                faq_items_text: normalizePageFaqs(content.faqs).map((item) => `${item.question} | ${item.answer}`).join("\n"),
            });
        }
        else if (section === "coupons") setFormValues({
            ...emptyCoupon,
            ...record,
            starts_at: record.starts_at ? record.starts_at.slice(0, 16) : "",
            expires_at: record.expires_at ? record.expires_at.slice(0, 16) : "",
        });
        else if (section === "hero-banners") setFormValues({ ...emptyHeroBanner, ...record });
        else setFormValues({ ...emptyBlog, ...record, published_at: record.published_at ? record.published_at.slice(0, 16) : "" });
    }

    function setField(name, value) {
        setFormValues((current) => ({ ...current, [name]: value }));
    }

    async function saveRecord(event) {
        event.preventDefault();
        setSaving(true);
        setNotice(null);

        try {
            const isNew = editing === "new";
            const endpoint = `${activeSection.endpoint}${isNew ? "" : `/${editing}`}`;
            let body = { ...formValues };
            let method = isNew ? "POST" : "PUT";
            let galleryImages = [];
            let galleryAlt = "";

            if (section === "hero-banners") {
                body = new FormData(event.currentTarget);
                body.set("is_active", formValues.is_active ? "1" : "0");
                const image = body.get("image");
                if (!(image instanceof File) || !image.size) body.delete("image");
                if (!isNew) { body.set("_method", "PUT"); method = "POST"; }
            }

            if (section === "products") {
                const submitted = new FormData(event.currentTarget);
                const image = submitted.get("image");
                galleryImages = submitted.getAll("gallery_images");
                galleryAlt = String(submitted.get("gallery_alt") || "");
                body = submitted;
                body.set("new_arrival", formValues.new_arrival ? "1" : "0");
                body.set("featured", formValues.featured ? "1" : "0");
                body.set("status", formValues.status ? "1" : "0");
                if (!(image instanceof File) || !image.size) body.delete("image");
                body.delete("gallery_images");
                body.delete("gallery_alt");
                body.delete("benefitsText");
                body.delete("benefits");
                body.set("benefits_present", "1");
                String(formValues.benefitsText || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((line, index) => {
                    body.set(`benefits[${index}]`, line);
                });
                body.delete("ingredientsText");
                body.delete("packSizesText");
                body.set("pack_sizes_present", "1");
                String(formValues.packSizesText || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((size, index) => {
                    body.set(`pack_sizes[${index}]`, size);
                });
                if (!isNew) {
                    body.set("_method", "PUT");
                    method = "POST";
                }
            }
            if (section === "product-pages" || section === "veterinary-pages") {
                const submitted = new FormData(event.currentTarget);
                const content = {
                    hero_title: formValues.hero_title,
                    hero_tagline: formValues.hero_tagline,
                    hero_button_text: formValues.hero_button_text,
                    hero_button_url: formValues.hero_button_url,
                    hero_image: formValues.hero_image,
                    intro_title: formValues.intro_title,
                    intro_subtitle: formValues.intro_subtitle,
                    intro_image: formValues.intro_image,
                    intro_paragraphs: String(formValues.intro_paragraphs_text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
                    categories_title: formValues.categories_title,
                    categories_description: formValues.categories_description,
                    featured_title: formValues.featured_title,
                    featured_description: formValues.featured_description,
                    animal_slug: formValues.animal_slug,
                    seo_title: formValues.seo_title,
                    seo_subtitle: formValues.seo_subtitle,
                    seo_description: formValues.seo_description,
                    seo_image: formValues.seo_image,
                    seo_paragraphs: String(formValues.seo_paragraphs_text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
                    forms_title: formValues.forms_title,
                    forms_description: formValues.forms_description,
                    products_title: formValues.products_title,
                    products_description: formValues.products_description,
                    why_title: formValues.why_title,
                    why_points: String(formValues.why_points_text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
                        const [title, ...description] = line.split("|");
                        return { title: title.trim(), description: description.join("|").trim() };
                    }).filter((item) => item.title || item.description),
                    faq_title: formValues.faq_title,
                    faqs: String(formValues.faq_items_text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
                        const [question, ...answer] = line.split("|");
                        return { question: question.trim(), answer: answer.join("|").trim() };
                    }).filter((item) => item.question || item.answer),
                };
                body = submitted;
                body.set("content", JSON.stringify(content));
                body.set("status", formValues.status ? "1" : "0");
                body.set("title", formValues.hero_title || formValues.title || formValues.slug.replaceAll("-", " ") || "Product page");
                body.set("meta_title", formValues.meta_title || "");
                body.set("slug", formValues.slug || "");
                body.set("product_form", formValues.product_form || "all");
                body.set("description", formValues.description || "");
                for (const field of ["hero_image", "intro_image", "seo_image"]) {
                    const image = submitted.get(field);
                    if (!(image instanceof File) || !image.size) body.delete(field);
                }
                if (!isNew) { body.set("_method", "PUT"); method = "POST"; }
            }

            if (section === "categories") {
                const submitted = new FormData(event.currentTarget);
                const image = submitted.get("image");
                const whyImage = submitted.get("why_image");
                body = submitted;
                body.set("status", formValues.status ? "1" : "0");
                if (!(image instanceof File) || !image.size) body.delete("image");
                if (!(whyImage instanceof File) || !whyImage.size) body.delete("why_image");
                for (const [field, text] of [["benefits", formValues.benefitsText], ["why_points", formValues.whyPointsText], ["animals", formValues.animalsText]]) {
                    body.delete(field);
                    body.set(`${field}_present`, "1");
                    String(text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((line, index) => {
                        body.set(`${field}[${index}]`, line);
                    });
                }
                if (!isNew) {
                    body.set("_method", "PUT");
                    method = "POST";
                }
            }

            if (section === "animals") {
                const submitted = new FormData(event.currentTarget);
                const image = submitted.get("image");
                body = submitted;
                body.set("status", formValues.status ? "1" : "0");
                if (!(image instanceof File) || !image.size) body.delete("image");
                if (!isNew) {
                    body.set("_method", "PUT");
                    method = "POST";
                }
            }
            if (section === "blog") {
                const submitted = new FormData(event.currentTarget);
                const coverImage = submitted.get("cover_image");
                body = submitted;
                if (!(coverImage instanceof File) || !coverImage.size) body.delete("cover_image");
                if (!body.get("published_at")) body.set("published_at", "");
                if (!isNew) {
                    body.set("_method", "PUT");
                    method = "POST";
                }
            }
            if (section === "coupons") {
                body.is_active = Boolean(formValues.is_active);
                body.starts_at = body.starts_at || null;
                body.expires_at = body.expires_at || null;
            }
            if (section === "blog" && !body.published_at) body.published_at = null;

            const response = await apiRequest(endpoint, { method, body });
            if (section === "products") {
                const productId = isNew ? response.data.id : editing;
                setEditing(productId);
                const ingredients = formValues.ingredientsText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
                    const [name, ...quantity] = line.split(/[|\t]/);
                    return { name: name.trim(), quantity: quantity.join("|").trim() || null };
                });
                await apiRequest(`/admin/products/${productId}/ingredients`, { method: "PUT", body: { ingredients } });
                await apiRequest(`/admin/products/${productId}/animal-categories`, {
                    method: "PUT",
                    body: { animal_category_ids: formValues.animal_category_ids.map(Number) },
                });
                for (const galleryImage of galleryImages) {
                    if (!(galleryImage instanceof File) || !galleryImage.size) continue;
                    const galleryBody = new FormData();
                    galleryBody.set("image", galleryImage);
                    if (galleryAlt) galleryBody.set("alt_text", galleryAlt);
                    await apiRequest(`/admin/products/${productId}/images`, { method: "POST", body: galleryBody });
                }
            }
            setEditing(null);
            setNotice({ type: "success", text: isNew ? "Record added." : "Changes saved." });
            await loadSection(section, currentPage);
            if (section === "categories") {
                const response = await apiRequest("/admin/categories");
                setCategories(Array.isArray(response.data) ? response.data : []);
            }
            if (section === "animals") {
                const response = await apiRequest("/admin/animal-categories");
                setAnimalCategories(Array.isArray(response.data) ? response.data : []);
            }
        } catch (error) {
            setNotice({ type: "error", text: error.message });
        } finally {
            setSaving(false);
        }
    }

    async function deleteRecord(record) {
        if (!window.confirm(`Delete ${record.name || record.title || record.code || "this record"}?`)) return;
        try {
            await apiRequest(`${activeSection.endpoint}/${record.id}`, { method: "DELETE" });
            setNotice({ type: "success", text: "Record deleted." });
            await loadSection(section, currentPage);
        } catch (error) {
            setNotice({ type: "error", text: error.message });
        }
    }

    async function deleteGalleryImage(image) {
        try {
            await apiRequest(`/admin/products/${editing}/images/${image.id}`, { method: "DELETE" });
            setFormValues((current) => ({ ...current, images: current.images.filter((item) => item.id !== image.id) }));
            setNotice({ type: "success", text: "Gallery image deleted." });
        } catch (error) {
            setNotice({ type: "error", text: error.message });
        }
    }

    async function saveStatus(record, status) {
        const endpoint = section === "orders"
            ? `/admin/orders/${record.id}/status`
            : section === "reviews"
                ? `/admin/reviews/${record.id}/status`
                : `/admin/enquiries/${record.id}`;
        try {
            await apiRequest(endpoint, { method: "PATCH", body: { status } });
            setNotice({ type: "success", text: "Status updated." });
            await loadSection(section, currentPage);
        } catch (error) {
            setNotice({ type: "error", text: error.message });
        }
    }

    async function saveSiteSettings(event) {
        event.preventDefault();
        setSaving(true);
        setNotice(null);
        try {
            const body = new FormData(event.currentTarget);
            const logo = body.get("site_logo");
            if (!(logo instanceof File) || !logo.size) body.delete("site_logo");
            const response = await apiRequest("/admin/settings", { method: "POST", body });
            setSiteSettings({ ...defaultSiteSettings, ...(response.data || {}) });
            setNotice({ type: "success", text: "Site settings saved." });
        } catch (error) {
            setNotice({ type: "error", text: error.message });
        } finally {
            setSaving(false);
        }
    }

    async function handleLogout() {
        await logout();
        router.replace("/admin/login");
    }

    const editable = ["products", "product-pages", "veterinary-pages", "categories", "animals", "coupons", "blog", "hero-banners"].includes(section);
    const title = activeSection?.label || "Admin";

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 md:px-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Katharine Pharma</p>
                        <h1 className="text-xl font-bold">Store administration</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-slate-600 sm:inline">{user?.name}</span>
                        <Link href="/" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">View store</Link>
                        <button onClick={handleLogout} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700">Sign out</button>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 md:px-8 lg:grid-cols-[230px_1fr]">
                <nav aria-label="Admin sections" className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1">
                    {SECTIONS.map((item) => (
                        <button key={item.id} onClick={() => { setSection(item.id); setCurrentPage(1); setEditing(null); setNotice(null); }}
                            className={`whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm font-semibold transition lg:block lg:w-full ${section === item.id ? "bg-[#113173] text-white" : "bg-white text-slate-700 hover:bg-slate-200"}`}>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <section className="min-w-0">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <p className="mt-1 text-sm text-slate-600">Manage store {title.toLowerCase()}.</p>
                        </div>
                        {editable && <button onClick={startCreate} className="rounded-xl bg-[#113173] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900">+ Add {section === "blog" ? "post" : section === "animals" ? "animal type" : section === "product-pages" ? "listing page" : section === "veterinary-pages" ? "veterinary page" : section === "hero-banners" ? "banner" : section.slice(0, -1)}</button>}
                    </div>

                    {notice && <p className={`mb-5 rounded-xl px-4 py-3 text-sm ${notice.type === "error" ? "bg-red-50 text-red-800" : "bg-emerald-50 text-emerald-800"}`} role="status">{notice.text}</p>}

                    {editing !== null && (
                        <form onSubmit={saveRecord} className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold">{editing === "new" ? "Add" : "Edit"} {section === "blog" ? "post" : section === "veterinary-pages" ? "Veterinary page" : section === "product-pages" ? "listing page" : section.slice(0, -1)}</h3>
                                <button type="button" onClick={() => setEditing(null)} className="text-sm text-slate-500 hover:text-slate-900">Close</button>
                            </div>
            {section === "products" && <ProductForm key={`${section}-${editing}`} values={formValues} categories={categories} animalCategories={animalCategories} setField={setField} onDeleteGalleryImage={deleteGalleryImage} />}
            {section === "categories" && <CategoryForm key={`${section}-${editing}`} values={formValues} setField={setField} />}
            {section === "animals" && <AnimalCategoryForm key={`${section}-${editing}`} values={formValues} setField={setField} />}
            {section === "product-pages" && <ProductPageForm key={`${section}-${editing}`} values={formValues} setField={setField} />}
            {section === "veterinary-pages" && <ProductPageForm key={`${section}-${editing}`} values={formValues} setField={setField} veterinaryPage />}
                            {section === "coupons" && <CouponForm values={formValues} setField={setField} />}
                            {section === "blog" && <BlogForm values={formValues} setField={setField} />}
            {section === "hero-banners" && <HeroBannerForm values={formValues} setField={setField} />}
                            <button disabled={saving} className="mt-5 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">{saving ? "Saving…" : "Save changes"}</button>
                        </form>
                    )}

                    {loading ? <div className="rounded-2xl bg-white p-12 text-center text-slate-500">Loading {title.toLowerCase()}…</div> : section === "dashboard" ? <DashboardOverview data={dashboardData} /> : section === "settings" ? <SiteSettingsForm settings={siteSettings} setField={setSiteSettings} onSave={saveSiteSettings} saving={saving} /> : <SectionTable section={section} records={records} categories={categories} onEdit={startEdit} onDelete={deleteRecord} onStatusSave={saveStatus} pendingStatuses={pendingStatuses} setPendingStatuses={setPendingStatuses} />}
                    {pagination?.last_page > 1 && (
                        <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm text-slate-600">
                            <span>Page {pagination.current_page} of {pagination.last_page} · {pagination.total} records</span>
                            <div className="flex gap-2">
                                <button disabled={currentPage <= 1} onClick={() => setCurrentPage((page) => page - 1)} className="rounded-lg border px-3 py-1.5 disabled:opacity-40">Previous</button>
                                <button disabled={currentPage >= pagination.last_page} onClick={() => setCurrentPage((page) => page + 1)} className="rounded-lg border px-3 py-1.5 disabled:opacity-40">Next</button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

function SiteSettingsForm({ settings, setField, onSave, saving }) {
    return (
        <form onSubmit={onSave} className="max-w-3xl space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <div>
                <h3 className="text-lg font-bold text-slate-900">Website identity and SEO</h3>
                <p className="mt-1 text-sm text-slate-500">These settings apply across the public website.</p>
            </div>
            <Field label="Site title" name="site_title" value={settings.site_title} required onChange={(event) => setField((current) => ({ ...current, site_title: event.target.value }))} />
            <Field label="Site description" name="site_description" value={settings.site_description} multiline onChange={(event) => setField((current) => ({ ...current, site_description: event.target.value }))} />
            <Field label="Site keywords (comma separated)" name="site_keywords" value={settings.site_keywords} multiline onChange={(event) => setField((current) => ({ ...current, site_keywords: event.target.value }))} />
            <ImageUploadField label="Site logo" name="site_logo" currentImage={settings.site_logo} helper="Choose a JPG, PNG or WebP image up to 2 MB. Leave empty to keep the current logo." />
            <button type="submit" disabled={saving} className="rounded-xl bg-[#113173] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-60">{saving ? "Saving…" : "Save site settings"}</button>
        </form>
    );
}

function DashboardOverview({ data }) {
    const cards = [
        ["Total sales", money(data?.total_sales)],
        ["Today's sales", money(data?.today_sales)],
        ["Total orders", data?.total_orders ?? 0],
        ["Pending orders", data?.pending_orders ?? 0],
        ["Processing orders", data?.processing_orders ?? 0],
        ["Delivered orders", data?.delivered_orders ?? 0],
        ["Cancelled orders", data?.cancelled_orders ?? 0],
        ["Customers", data?.total_customers ?? 0],
        ["Products", data?.total_products ?? 0],
        ["Low stock (≤10)", data?.low_stock_products ?? 0],
        ["Out of stock", data?.out_of_stock_products ?? 0],
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map(([label, value]) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
                </article>)}
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
                <DashboardChart data={data} title="Sales" valueKey="sales" color="bg-blue-600" currency />
                <DashboardChart data={data} title="Orders" valueKey="orders" color="bg-amber-500" />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-bold text-slate-900">Recent orders</h3>
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="text-xs uppercase text-slate-500"><tr><th className="py-2 pr-4">Order</th><th className="py-2 pr-4">Customer</th><th className="py-2 pr-4">Total</th><th className="py-2">Status</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">{data?.recent_orders?.length ? data.recent_orders.map((order) => <tr key={order.id}><td className="py-3 pr-4 font-semibold">{order.order_number}<span className="block text-xs font-normal text-slate-500">{date(order.created_at)}</span></td><td className="py-3 pr-4">{order.customer_name}</td><td className="py-3 pr-4">{money(order.grand_total)}</td><td className="py-3"><Badge>{order.status}</Badge></td></tr>) : <tr><td colSpan={4} className="py-8 text-center text-slate-500">No orders yet.</td></tr>}</tbody>
                        </table>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-bold text-slate-900">Top selling products</h3>
                    <div className="mt-4 divide-y divide-slate-100">{data?.top_products?.length ? data.top_products.map((product) => <div key={`${product.product_id}-${product.product_name}`} className="flex items-center justify-between gap-4 py-3">
                        <div className="min-w-0"><p className="truncate font-semibold text-slate-800">{product.product_name}</p><p className="text-xs text-slate-500">{money(product.sales_total)} sales</p></div>
                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">{product.units_sold} sold</span>
                    </div>) : <p className="py-8 text-center text-sm text-slate-500">No sales yet.</p>}</div>
                </section>
            </div>
        </div>
    );
}

function DashboardChart({ data, title, valueKey, color, currency = false }) {
    const points = data?.chart || [];
    const max = Math.max(...points.map((point) => Number(point[valueKey] || 0)), 1);
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">{title} <span className="font-normal text-slate-500">· last 7 days</span></h3>
            <div className="mt-5 grid h-40 grid-cols-7 items-end gap-2" role="img" aria-label={`${title}, last seven days`}>
                {points.map((point) => {
                    const value = Number(point[valueKey] || 0);
                    const height = value ? Math.max((value / max) * 100, 5) : 2;
                    return <div key={point.date} className="flex h-full min-w-0 flex-col items-center justify-end gap-2" title={`${point.date}: ${currency ? money(value) : value}`}>
                        <div className="flex w-full flex-1 items-end"><div className={`w-full rounded-t-md ${color}`} style={{ height: `${height}%` }} /></div>
                        <span className="text-[11px] text-slate-500">{point.label}</span>
                    </div>;
                })}
            </div>
            <p className="mt-2 text-xs text-slate-500">{currency ? "Order value in INR" : "Orders placed"}; cancelled and returned orders are excluded.</p>
        </section>
    );
}

function ProductForm({ values, categories, animalCategories, setField, onDeleteGalleryImage }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Product name" name="name" value={values.name} required onChange={(event) => {
                const name = event.target.value;
                setField("name", name);
                if (!values.id && (!values.slug || values.slug === slugify(values.name))) setField("slug", slugify(name));
            }} />
            <div><Field label="URL slug" name="slug" value={values.slug} required onChange={(event) => setField("slug", event.target.value)} /><p className="mt-1 text-xs text-slate-500">Auto-filled from the product name. You can edit it before saving.</p></div>
            <label className="block text-sm font-medium text-slate-700">Category
                <select name="category_id" value={values.category_id} onChange={(event) => setField("category_id", event.target.value)} required className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5">
                    <option value="">Choose a category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">Product form
                <select name="product_form" value={values.product_form || ""} onChange={(event) => setField("product_form", event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm">
                    <option value="">Choose form</option>
                    {["Liquid", "Powder", "Bolus", "Tablet", "Granules", "Gel"].map((form) => <option key={form} value={form.toLowerCase()}>{form}</option>)}
                </select>
            </label>
            <Field label="SKU" name="sku" value={values.sku} onChange={(event) => setField("sku", event.target.value)} />
            <Field label="Price" name="price" type="number" min="0" step="0.01" value={values.price} required onChange={(event) => setField("price", event.target.value)} />
            <Field label="Sale price" name="sale_price" type="number" min="0" step="0.01" value={values.sale_price} onChange={(event) => setField("sale_price", event.target.value)} />
            <Field label="MRP" name="mrp" type="number" min="0" step="0.01" value={values.mrp} onChange={(event) => setField("mrp", event.target.value)} />
            <Field label="Discount %" name="discount_percent" type="number" min="0" max="100" step="0.01" value={values.discount_percent} onChange={(event) => setField("discount_percent", event.target.value)} />
            <Field label="Stock" name="stock" type="number" min="0" step="1" value={values.stock} onChange={(event) => setField("stock", event.target.value)} />
            <Field label="Pack sizes (one per line)" name="packSizesText" value={values.packSizesText} multiline onChange={(event) => setField("packSizesText", event.target.value)} />
            <ImageUploadField label="Product image (JPG, PNG or WebP; max 2 MB)" name="image" currentImage={values.image} helper="Choose a file to see its preview before saving." />
            <label className="block text-sm font-medium text-slate-700">Animal types
                <select multiple value={(values.animal_category_ids || []).map(String)} onChange={(event) => setField("animal_category_ids", Array.from(event.target.selectedOptions, (option) => Number(option.value)))} className="mt-1.5 h-24 w-full rounded-xl border border-slate-300 px-3.5 py-2.5">
                    {animalCategories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
                <span className="mt-1 block text-xs font-normal text-slate-500">Hold Ctrl or Command to select more than one.</span>
            </label>
            <Field label="Gallery image description (applies to new images)" name="gallery_alt" value={values.gallery_alt} onChange={(event) => setField("gallery_alt", event.target.value)} />
            <ImageUploadField label="Add gallery images (select multiple; max 5 MB each)" name="gallery_images" multiple helper="Selected images appear here before you save." />
            <div className="flex gap-5 sm:col-span-2 lg:col-span-3">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(values.featured)} onChange={(event) => setField("featured", event.target.checked)} /> Featured</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(values.new_arrival)} onChange={(event) => setField("new_arrival", event.target.checked)} /> New arrival</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(values.status)} onChange={(event) => setField("status", event.target.checked)} /> Published</label>
            </div>
            <div className="sm:col-span-2 lg:col-span-3"><Field label="Short description" name="short_description" value={values.short_description} multiline onChange={(event) => setField("short_description", event.target.value)} /></div>
            <div className="sm:col-span-2 lg:col-span-3"><Field label="Description" name="description" value={values.description} multiline onChange={(event) => setField("description", event.target.value)} /></div>
            <div className="sm:col-span-2 lg:col-span-3"><Field label="Benefits (one per line)" name="benefitsText" value={values.benefitsText} multiline onChange={(event) => setField("benefitsText", event.target.value)} /></div>
            <div className="sm:col-span-2 lg:col-span-3"><Field label="Usage & Dosage" name="dosage" value={values.dosage} multiline onChange={(event) => setField("dosage", event.target.value)} /></div>
            <div className="sm:col-span-2 lg:col-span-3"><Field label="Storage instructions" name="storage_instructions" value={values.storage_instructions} multiline onChange={(event) => setField("storage_instructions", event.target.value)} /></div>
            <div className="sm:col-span-2 lg:col-span-3 mt-2 border-t border-slate-200 pt-4"><h3 className="font-semibold text-slate-800">Search engine details</h3><p className="mt-1 text-xs text-slate-500">Optional. Leave blank to use the product name and description.</p></div>
            <Field label="SEO title" name="seo_title" value={values.seo_title} maxLength={255} onChange={(event) => setField("seo_title", event.target.value)} />
            <div className="sm:col-span-2 lg:col-span-3"><Field label="SEO description" name="seo_description" value={values.seo_description} maxLength={1000} multiline onChange={(event) => setField("seo_description", event.target.value)} /></div>
            <div className="sm:col-span-2 lg:col-span-3"><Field label="SEO keywords (comma separated)" name="seo_keywords" value={values.seo_keywords} maxLength={2000} multiline onChange={(event) => setField("seo_keywords", event.target.value)} /></div>
            <div className="sm:col-span-2 lg:col-span-3">
                <Field label="Ingredients / composition (one per line; optional quantity after | or tab)" name="ingredientsText" value={values.ingredientsText} multiline onChange={(event) => setField("ingredientsText", event.target.value)} />
                {values.images?.length > 0 && <div className="mt-4"><p className="mb-2 text-sm font-semibold">Saved product gallery</p><div className="flex flex-wrap gap-3">{values.images.map((image) => <div key={image.id} className="w-28 overflow-hidden rounded-xl border border-slate-200 bg-white"><img src={adminImageUrl(image.path || image.url)} alt={image.alt_text || "Product gallery image"} className="h-24 w-full object-contain" /><div className="flex items-center justify-between gap-1 px-2 py-1"><span className="truncate text-xs text-slate-500">{image.alt_text || image.path?.split("/").pop() || "Image"}</span><button type="button" onClick={() => onDeleteGalleryImage(image)} className="shrink-0 font-bold text-red-700" aria-label="Delete gallery image">×</button></div></div>)}</div></div>}
            </div>
        </div>
    );
}

function CategoryForm({ values, setField }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category name" name="name" value={values.name} required onChange={(event) => { setField("name", event.target.value); if (!values.id) setField("slug", slugify(event.target.value)); }} />
            <Field label="URL slug" name="slug" value={values.slug} required onChange={(event) => setField("slug", event.target.value)} />
            <div className="sm:col-span-2"><Field label="Description" name="description" value={values.description} multiline onChange={(event) => setField("description", event.target.value)} /></div>
            <div className="sm:col-span-2"><Field label="Details page title" name="hero_title" value={values.hero_title} onChange={(event) => setField("hero_title", event.target.value)} /></div>
            <div className="sm:col-span-2"><Field label="Benefits (one per line)" name="benefitsText" value={values.benefitsText} multiline onChange={(event) => setField("benefitsText", event.target.value)} /></div>
            <ImageUploadField label="Category image" name="image" currentImage={values.image} helper="JPG, PNG or WebP, up to 2 MB. Leave empty to keep the current image." />
            <div className="sm:col-span-2"><Field label="Why Choose heading" name="why_title" value={values.why_title} onChange={(event) => setField("why_title", event.target.value)} /></div>
            <div className="sm:col-span-2"><Field label="Why Choose points (one per line)" name="whyPointsText" value={values.whyPointsText} multiline onChange={(event) => setField("whyPointsText", event.target.value)} /></div>
            <ImageUploadField label="Why Choose image" name="why_image" currentImage={values.why_image} helper="Optional JPG, PNG or WebP, up to 2 MB. Leave empty to keep the current image." />
            <div className="sm:col-span-2"><Field label="Suitable animals (one per line)" name="animalsText" value={values.animalsText} multiline onChange={(event) => setField("animalsText", event.target.value)} /></div>
            <label className="flex items-center gap-2 pt-7 text-sm"><input type="checkbox" checked={Boolean(values.status)} onChange={(event) => setField("status", event.target.checked)} /> Published</label>
        </div>
    );
}

function AnimalCategoryForm({ values, setField }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Animal type name" name="name" value={values.name} required onChange={(event) => { setField("name", event.target.value); if (!values.id) setField("slug", slugify(event.target.value)); }} />
            <Field label="URL slug" name="slug" value={values.slug} required onChange={(event) => setField("slug", event.target.value)} />
            <div className="sm:col-span-2"><Field label="Description" name="description" value={values.description} multiline onChange={(event) => setField("description", event.target.value)} /></div>
            <ImageUploadField label="Animal type image" name="image" currentImage={values.image} helper="JPG, PNG or WebP, up to 2 MB. Leave empty to keep the current image." />
            <label className="flex items-center gap-2 pt-7 text-sm"><input type="checkbox" checked={Boolean(values.status)} onChange={(event) => setField("status", event.target.checked)} /> Published</label>
        </div>
    );
}

function ProductPageForm({ values, setField, veterinaryPage = false }) {
    const [activeTab, setActiveTab] = useState("page");
    const tabs = veterinaryPage
        ? [["page", "Page settings"], ["hero", "Hero"], ["cattle", "Page content"]]
        : [["page", "Page settings"], ["hero", "Hero"], ["products", "Product section"], ["why", "Why Choose"], ["faq", "FAQs"]];
    const commonFieldClass = "sm:col-span-2";

    return <div>
        <div className="mb-5 flex flex-wrap gap-2 border-b border-slate-200 pb-3" role="tablist" aria-label="Page content sections">
            {tabs.map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${activeTab === id ? "bg-[#113173] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{label}</button>)}
        </div>
        <div className={activeTab === "page" ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
            <Field label="Meta title (browser tab and search results)" name="meta_title" value={values.meta_title} maxLength={255} onChange={(event) => setField("meta_title", event.target.value)} />
            <Field label="URL slug (page address)" name="slug" value={values.slug} required onChange={(event) => setField("slug", slugify(event.target.value))} />
            {!veterinaryPage && <label className="block text-sm font-medium text-slate-700">Products to show
                <select name="product_form" value={values.product_form} onChange={(event) => setField("product_form", event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5">
                    {["all", "liquid", "powder", "bolus", "tablet", "granules", "gel"].map((form) => <option key={form} value={form}>{form === "all" ? "All published products" : form[0].toUpperCase() + form.slice(1)}</option>)}
                </select>
            </label>}
            <label className="flex items-center gap-2 pt-7 text-sm"><input type="checkbox" checked={Boolean(values.status)} onChange={(event) => setField("status", event.target.checked)} /> Published</label>
            <p className={`${commonFieldClass} text-sm text-slate-600`}>Page URL: <strong>/{values.slug || "your-slug"}</strong>. Product table reads published products; composition and pack sizes come from each product record.</p>
        </div>
        <div className={activeTab === "hero" ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
            <p className={`${commonFieldClass} text-sm text-slate-600`}>These fields control the visible hero banner. SEO Meta title is under Page settings.</p>
            <Field label="Hero heading (shown on page)" name="hero_title" value={values.hero_title || values.title} onChange={(event) => setField("hero_title", event.target.value)} />
            <Field label="Hero tagline" name="hero_tagline" value={values.hero_tagline} onChange={(event) => setField("hero_tagline", event.target.value)} />
            <div className={commonFieldClass}><Field label="Hero description / subtitle" name="description" value={values.description} multiline onChange={(event) => setField("description", event.target.value)} /></div>
            <Field label="Hero button text" name="hero_button_text" value={values.hero_button_text} onChange={(event) => setField("hero_button_text", event.target.value)} />
            <Field label="Hero button URL" name="hero_button_url" value={values.hero_button_url} onChange={(event) => setField("hero_button_url", event.target.value)} />
            <ImageUploadField label="Hero image" name="hero_image" currentImage={values.hero_image} helper="Choose an image from your computer. Leave empty to keep the saved image." />
        </div>
        <div className={activeTab === "products" ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
            <p className={`${commonFieldClass} text-sm text-slate-600`}>Set the heading and description above the existing product table. Products, composition and pack sizes continue to come from the Products section.</p>
            <div className={commonFieldClass}><Field label="Product section heading" name="products_title" value={values.products_title} onChange={(event) => setField("products_title", event.target.value)} /></div>
            <div className={commonFieldClass}><Field label="Product section description" name="products_description" value={values.products_description} multiline onChange={(event) => setField("products_description", event.target.value)} /></div>
        </div>
        <div className={activeTab === "why" ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
            <p className={`${commonFieldClass} text-sm text-slate-600`}>Set the heading and cards shown in the Why Choose section. Enter each card as heading | description on its own line.</p>
            <Field label="Why Choose heading" name="why_title" value={values.why_title} onChange={(event) => setField("why_title", event.target.value)} />
            <div className={commonFieldClass}><Field label="Why Choose points (one per line: heading | description)" name="why_points_text" value={values.why_points_text} multiline onChange={(event) => setField("why_points_text", event.target.value)} /></div>
        </div>
        <div className={activeTab === "faq" ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
            <p className={`${commonFieldClass} text-sm text-slate-600`}>These fields control only the FAQ section. Enter each question and answer as question | answer on its own line.</p>
            <div className={commonFieldClass}><Field label="FAQ heading" name="faq_title" value={values.faq_title} onChange={(event) => setField("faq_title", event.target.value)} /></div>
            <div className={commonFieldClass}><Field label="FAQ items (one per line: question | answer)" name="faq_items_text" value={values.faq_items_text} multiline onChange={(event) => setField("faq_items_text", event.target.value)} /></div>
        </div>
        <div className={activeTab === "cattle" ? "grid gap-4 sm:grid-cols-2" : "hidden"}>
            <p className={`${commonFieldClass} text-sm text-slate-600`}>These fields control the page sections using the Veterinary Products page layout. Product cards are loaded from published Featured products for the animal type in the page URL slug.</p>
            <div className="sm:col-span-2 border-b border-slate-200 pb-2 font-semibold text-slate-800">Introduction</div>
            <Field label="Introduction heading" name="intro_title" value={values.intro_title} onChange={(event) => setField("intro_title", event.target.value)} />
            <Field label="Introduction subtitle" name="intro_subtitle" value={values.intro_subtitle} onChange={(event) => setField("intro_subtitle", event.target.value)} />
            <ImageUploadField label="Introduction image" name="intro_image" currentImage={values.intro_image} helper="Choose an image from your computer; leave empty to keep the saved image." />
            <div className="sm:col-span-2"><Field label="Introduction paragraphs (one per line)" name="intro_paragraphs_text" value={values.intro_paragraphs_text} multiline onChange={(event) => setField("intro_paragraphs_text", event.target.value)} /></div>
            <div className="sm:col-span-2 border-b border-slate-200 pb-2 pt-3 font-semibold text-slate-800">SEO content section</div>
            <Field label="SEO section heading" name="seo_title" value={values.seo_title} onChange={(event) => setField("seo_title", event.target.value)} />
            <Field label="SEO section subtitle" name="seo_subtitle" value={values.seo_subtitle} onChange={(event) => setField("seo_subtitle", event.target.value)} />
            <div className="sm:col-span-2"><Field label="SEO meta description" name="seo_description" value={values.seo_description} multiline maxLength={1000} onChange={(event) => setField("seo_description", event.target.value)} /></div>
            <ImageUploadField label="SEO section image" name="seo_image" currentImage={values.seo_image} helper="Choose an image from your computer; leave empty to keep the saved image." />
            <div className="sm:col-span-2"><Field label="SEO section paragraphs (one per line)" name="seo_paragraphs_text" value={values.seo_paragraphs_text} multiline onChange={(event) => setField("seo_paragraphs_text", event.target.value)} /></div>
        </div>
    </div>;
}

function CouponForm({ values, setField }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Coupon code" name="code" value={values.code} required onChange={(event) => setField("code", event.target.value.toUpperCase())} />
            <label className="block text-sm font-medium text-slate-700">Discount type
                <select name="type" value={values.type} onChange={(event) => setField("type", event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5"><option value="percent">Percentage</option><option value="fixed">Fixed amount</option></select>
            </label>
            <Field label="Value" name="value" type="number" min="0.01" step="0.01" value={values.value} required onChange={(event) => setField("value", event.target.value)} />
            <Field label="Minimum order" name="minimum_order" type="number" min="0" step="0.01" value={values.minimum_order} onChange={(event) => setField("minimum_order", event.target.value)} />
            <Field label="Maximum discount" name="maximum_discount" type="number" min="0" step="0.01" value={values.maximum_discount} onChange={(event) => setField("maximum_discount", event.target.value)} />
            <Field label="Usage limit" name="usage_limit" type="number" min="1" step="1" value={values.usage_limit} onChange={(event) => setField("usage_limit", event.target.value)} />
            <Field label="Starts at" name="starts_at" type="datetime-local" value={values.starts_at} onChange={(event) => setField("starts_at", event.target.value)} />
            <Field label="Expires at" name="expires_at" type="datetime-local" value={values.expires_at} onChange={(event) => setField("expires_at", event.target.value)} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(values.is_active)} onChange={(event) => setField("is_active", event.target.checked)} /> Active</label>
        </div>
    );
}

function BlogForm({ values, setField }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Post title" name="title" value={values.title} required onChange={(event) => { setField("title", event.target.value); if (!values.id) setField("slug", slugify(event.target.value)); }} />
            <Field label="URL slug" name="slug" value={values.slug} required onChange={(event) => setField("slug", event.target.value)} />
            <ImageUploadField label="Blog cover image" name="cover_image" currentImage={values.cover_image} helper="JPG, PNG or WebP, up to 2 MB. Leave empty to keep the current image." />
            <label className="block text-sm font-medium text-slate-700">Status
                <select name="status" value={values.status} onChange={(event) => setField("status", event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5"><option value="draft">Draft</option><option value="published">Published</option></select>
            </label>
            <div className="sm:col-span-2"><Field label="Excerpt" name="excerpt" value={values.excerpt} multiline onChange={(event) => setField("excerpt", event.target.value)} /></div>
            <div className="sm:col-span-2"><Field label="Article body" name="body" value={values.body} multiline required onChange={(event) => setField("body", event.target.value)} /></div>
            <Field label="Publish date" name="published_at" type="datetime-local" value={values.published_at} onChange={(event) => setField("published_at", event.target.value)} />
        </div>
    );
}

function HeroBannerForm({ values, setField }) {
    return <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2"><ImageUploadField label="Banner image" name="image" currentImage={values.image_url || values.image} helper="Landscape banner recommended. JPG, PNG or WebP, up to 5 MB. Leave empty to keep the current image." /></div>
        <Field label="Click destination URL (optional)" name="destination_url" value={values.destination_url} placeholder="https://medexa.in/shop or /shop" onChange={(event) => setField("destination_url", event.target.value)} />
        <Field label="Image description (alt text)" name="alt_text" value={values.alt_text} onChange={(event) => setField("alt_text", event.target.value)} />
        <Field label="Display order (smaller number appears first)" name="sort_order" type="number" min="0" value={values.sort_order} onChange={(event) => setField("sort_order", event.target.value)} />
        <label className="flex items-center gap-2 pt-7 text-sm font-medium text-slate-700"><input name="is_active" type="checkbox" checked={Boolean(values.is_active)} onChange={(event) => setField("is_active", event.target.checked)} /> Show this banner on homepage</label>
    </div>;
}

function SectionTable({ section, records, categories, onEdit, onDelete, onStatusSave, pendingStatuses, setPendingStatuses }) {
    const empty = <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">No {section} found. Add the first record to get started.</td></tr>;
    const actions = (record) => <div className="flex justify-end gap-2">{["products", "product-pages", "veterinary-pages", "categories", "animals", "coupons", "blog", "hero-banners"].includes(section) && <button onClick={() => onEdit(record)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50">Edit</button>}{["products", "product-pages", "veterinary-pages", "categories", "animals", "coupons", "blog", "hero-banners"].includes(section) && <button onClick={() => onDelete(record)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50">Delete</button>}</div>;

    if (section === "products") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Product</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3"><p className="font-semibold">{item.name}</p><p className="text-xs text-slate-500">{item.slug}</p></td><td className="px-4 py-3">{item.category?.name || categories.find((category) => category.id === item.category_id)?.name || "—"}</td><td className="px-4 py-3">{money(item.sale_price || item.price)}</td><td className="px-4 py-3">{item.stock}</td><td className="px-4 py-3"><Badge>{item.status ? "Published" : "Hidden"}</Badge></td><td className="px-4 py-3">{actions(item)}</td></tr>) : empty}</tbody></DataTable>;

    if (section === "categories") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Category</th><th className="px-4 py-3">Products</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3"><p className="font-semibold">{item.name}</p><p className="text-xs text-slate-500">{item.slug}</p></td><td className="px-4 py-3">{item.products_count ?? "—"}</td><td className="px-4 py-3"><Badge>{item.status ? "Published" : "Hidden"}</Badge></td><td className="px-4 py-3">{actions(item)}</td></tr>) : empty}</tbody></DataTable>;

    if (section === "animals") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Animal type</th><th className="px-4 py-3">Products</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3"><p className="font-semibold">{item.name}</p><p className="text-xs text-slate-500">{item.slug}</p></td><td className="px-4 py-3">{item.products_count ?? 0}</td><td className="px-4 py-3"><Badge>{item.status ? "Active" : "Hidden"}</Badge></td><td className="px-4 py-3">{actions(item)}</td></tr>) : empty}</tbody></DataTable>;

    if (section === "cattle-page") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Veterinary products page</th><th className="px-4 py-3">URL</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3 font-semibold">{item.title}</td><td className="px-4 py-3">/{item.slug}</td><td className="px-4 py-3"><Badge>{item.status ? "Published" : "Hidden"}</Badge></td><td className="px-4 py-3 text-right"><button onClick={() => onEdit(item)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50">Edit page</button></td></tr>) : <tr><td colSpan={4} className="px-5 py-12 text-center text-slate-500">Cattle feed supplements page could not be found. Run the Laravel migrations, then reload this section.</td></tr>}</tbody></DataTable>;

    if (section === "product-pages") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Page</th><th className="px-4 py-3">Product form</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3"><p className="font-semibold">{item.title}</p><p className="text-xs text-slate-500">/{item.slug}</p></td><td className="px-4 py-3"><Badge>{item.product_form}</Badge></td><td className="px-4 py-3"><Badge>{item.status ? "Published" : "Hidden"}</Badge></td><td className="px-4 py-3">{actions(item)}</td></tr>) : empty}</tbody></DataTable>;

    if (section === "veterinary-pages") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Veterinary page</th><th className="px-4 py-3">URL</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3 font-semibold">{item.title}</td><td className="px-4 py-3">/{item.slug}</td><td className="px-4 py-3"><Badge>{item.status ? "Published" : "Hidden"}</Badge></td><td className="px-4 py-3">{actions(item)}</td></tr>) : empty}</tbody></DataTable>;

    if (section === "hero-banners") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Banner</th><th className="px-4 py-3">Click destination</th><th className="px-4 py-3">Order</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3"><div className="flex items-center gap-3"><img src={adminImageUrl(item.image_url || item.image)} alt={item.alt_text || "Banner"} className="h-14 w-24 rounded object-cover" /><span className="max-w-xs truncate">{item.alt_text || "Homepage banner"}</span></div></td><td className="max-w-xs truncate px-4 py-3">{item.destination_url || "No link"}</td><td className="px-4 py-3">{item.sort_order}</td><td className="px-4 py-3"><Badge>{item.is_active ? "Active" : "Hidden"}</Badge></td><td className="px-4 py-3">{actions(item)}</td></tr>) : empty}</tbody></DataTable>;

    if (section === "orders") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Payment</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Update</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3 font-semibold">{item.order_number}</td><td className="px-4 py-3">{date(item.created_at)}</td><td className="px-4 py-3">{money(item.grand_total)}</td><td className="px-4 py-3"><Badge>{item.payment_status}</Badge></td><td className="px-4 py-3"><select value={pendingStatuses[item.id] ?? item.status} onChange={(event) => setPendingStatuses((state) => ({ ...state, [item.id]: event.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5">{ORDER_STATUSES.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select></td><td className="px-4 py-3"><button onClick={() => onStatusSave(item, pendingStatuses[item.id] ?? item.status)} className="rounded-lg bg-[#113173] px-3 py-1.5 text-xs font-semibold text-white">Save</button></td></tr>) : empty}</tbody></DataTable>;

    if (section === "enquiries") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Message</th><th className="px-4 py-3">Received</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Update</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3"><p className="font-semibold">{item.name}</p><p className="text-xs text-slate-500">{item.email} · {item.phone}</p></td><td className="px-4 py-3 capitalize">{item.type?.replaceAll("_", " ")}</td><td className="max-w-xs px-4 py-3"><span className="line-clamp-2">{item.message || "—"}</span></td><td className="px-4 py-3">{date(item.created_at)}</td><td className="px-4 py-3"><select value={pendingStatuses[item.id] ?? item.status} onChange={(event) => setPendingStatuses((state) => ({ ...state, [item.id]: event.target.value }))} className="rounded-lg border border-slate-300 px-2 py-1.5">{ENQUIRY_STATUSES.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select></td><td className="px-4 py-3"><button onClick={() => onStatusSave(item, pendingStatuses[item.id] ?? item.status)} className="rounded-lg bg-[#113173] px-3 py-1.5 text-xs font-semibold text-white">Save</button></td></tr>) : empty}</tbody></DataTable>;

    if (section === "customers") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Joined</th><th className="px-4 py-3">Role</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3"><p className="font-semibold">{item.name}</p><p className="text-xs text-slate-500">{item.email}</p></td><td className="px-4 py-3">{item.phone || "—"}</td><td className="px-4 py-3">{date(item.created_at)}</td><td className="px-4 py-3"><Badge>{item.role}</Badge></td></tr>) : empty}</tbody></DataTable>;

    if (section === "reviews") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Product</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Review</th><th className="px-4 py-3">Rating</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Moderate</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3 font-semibold">{item.product?.name || "Product removed"}</td><td className="px-4 py-3">{item.user?.name || "Customer"}<p className="text-xs text-slate-500">{date(item.created_at)}</p></td><td className="max-w-md px-4 py-3"><p className="font-semibold">{item.title || "Customer review"}</p><p className="mt-1 whitespace-pre-line text-slate-600">{item.body}</p></td><td className="px-4 py-3">{item.rating}/5</td><td className="px-4 py-3"><Badge>{item.status}</Badge></td><td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => onStatusSave(item, "approved")} disabled={item.status === "approved"} className="rounded-lg bg-green-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40">Approve</button><button onClick={() => onStatusSave(item, "rejected")} disabled={item.status === "rejected"} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 disabled:opacity-40">Reject</button></div></td></tr>) : empty}</tbody></DataTable>;

    if (section === "coupons") return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Discount</th><th className="px-4 py-3">Minimum order</th><th className="px-4 py-3">Uses</th><th className="px-4 py-3">State</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3 font-bold">{item.code}</td><td className="px-4 py-3">{item.type === "percent" ? `${item.value}%` : money(item.value)}</td><td className="px-4 py-3">{money(item.minimum_order)}</td><td className="px-4 py-3">{item.used_count}{item.usage_limit ? ` / ${item.usage_limit}` : ""}</td><td className="px-4 py-3"><Badge>{item.is_active ? "Active" : "Inactive"}</Badge></td><td className="px-4 py-3">{actions(item)}</td></tr>) : empty}</tbody></DataTable>;

    return <DataTable><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Post</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3">Publish date</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{records.length ? records.map((item) => <tr key={item.id}><td className="px-4 py-3"><p className="font-semibold">{item.title}</p><p className="text-xs text-slate-500">{item.slug}</p></td><td className="px-4 py-3">{date(item.updated_at)}</td><td className="px-4 py-3">{date(item.published_at)}</td><td className="px-4 py-3"><Badge>{item.status}</Badge></td><td className="px-4 py-3">{actions(item)}</td></tr>) : empty}</tbody></DataTable>;
}
