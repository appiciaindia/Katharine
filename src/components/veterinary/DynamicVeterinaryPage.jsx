import Categories from "@/components/home/Categories";
import ProductForms from "@/components/home/ProductForms";
import FeaturedProducts from "@/components/veterinary/FeaturedProducts";
import ProductHero from "@/components/veterinary/ProductHero";
import ProductIntroduction from "@/components/veterinary/ProductIntroduction";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");
const API_ORIGIN = API_URL.replace(/\/api$/, "");

function resolvePageImage(path, fallback) {
    if (!path) return fallback;
    if (/^(https?:)?\/\//i.test(path) || path.startsWith("/")) return path;
    return `${API_ORIGIN}/api/media/${String(path).replace(/^storage\//, "")}`;
}

function textLines(value) {
    const lines = Array.isArray(value) ? value : String(value || "").split(/\r?\n/);
    return lines.map((line) => String(line || "").trim()).filter(Boolean);
}

function getAnimalForPage(pageSlug) {
    const slug = String(pageSlug || "");
    if (slug.startsWith("aqua-")) return { slug: "aqua", label: "Aqua" };
    if (slug.startsWith("pigeon-")) return { slug: "pigeon,pigeons", label: "Pigeon" };
    if (slug.startsWith("poultry-")) return { slug: "poultry", label: "Poultry" };
    if (slug.startsWith("bird-")) return { slug: "bird,birds", label: "Bird" };
    if (slug.startsWith("cattle-")) return { slug: "cattle", label: "Cattle" };
    const label = slug.replace(/-feed-supplements?$/, "").replaceAll("-", " ").trim() || "Veterinary";
    return { slug: label.toLowerCase().replaceAll(" ", "-"), label: label.replace(/\b\w/g, (letter) => letter.toUpperCase()) };
}

export default function DynamicVeterinaryPage({ page }) {
    const content = page?.content || {};
    const animal = getAnimalForPage(page?.slug);
    const animalSlug = content.animal_slug || animal.slug;
    return (
        <div>
            <ProductHero
                title={content.hero_title || page?.title || "Veterinary Products"}
                subTitle={page?.description || "Explore veterinary nutrition and feed supplements from Katharine Pharma."}
                heroImg={resolvePageImage(content.hero_image, "/images/cattle-feed-supplements.jpeg")}
                buttonText={content.hero_button_text || "Explore Products"}
                btnUrl={content.hero_button_url || "/shop"}
                tagline={content.hero_tagline || "Veterinary Products"}
            />
            <ProductIntroduction
                title={content.intro_title || "Veterinary Nutrition for Everyday Animal Care"}
                subtitle={content.intro_subtitle || "About Katharine Pharma"}
                img={resolvePageImage(content.intro_image, "/images/choose.png")}
                para={textLines(content.intro_paragraphs)}
            />
            <Categories title={content.categories_title || "Explore Our Product Categories"} description={content.categories_description || "Discover animal nutrition, feed supplements, vitamins and minerals for everyday animal care."} />
            <FeaturedProducts
                title={`Featured ${animal.label} Nutrition Products`}
                description={`Explore selected ${animal.label.toLowerCase()} feed supplements and nutritional products from Katharine Pharma.`}
                animalSlug={animalSlug}
            />
            {textLines(content.seo_paragraphs).length > 0 && <ProductIntroduction
                title={content.seo_title || `Veterinary ${animal.label} Feed Supplements`}
                subtitle={content.seo_subtitle || ""}
                img={resolvePageImage(content.seo_image, "/images/about.png")}
                para={textLines(content.seo_paragraphs)}
            />}
            <ProductForms title={content.forms_title || "Choose the Right Supplement Form"} description={content.forms_description || "Explore animal nutrition products available in convenient formats."} />
        </div>
    );
}
