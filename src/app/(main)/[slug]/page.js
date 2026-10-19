import DynamicProductPage from "@/components/manufacturing/DynamicProductPage";
import DynamicVeterinaryPage from "@/components/veterinary/DynamicVeterinaryPage";
import { getVeterinaryPage, productPageMetadata, veterinaryPageMetadata } from "@/lib/product-page-metadata";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const veterinaryMetadata = await veterinaryPageMetadata(slug);
    if (Object.keys(veterinaryMetadata).length) return veterinaryMetadata;
    return productPageMetadata(slug);
}

export default async function AdminCreatedProductPage({ params }) {
    const { slug } = await params;
    const veterinaryPage = await getVeterinaryPage(slug);
    if (veterinaryPage) return <DynamicVeterinaryPage page={veterinaryPage} />;
    return <DynamicProductPage slug={slug} />;
}
