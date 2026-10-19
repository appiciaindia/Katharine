import DynamicVeterinaryPage from "@/components/veterinary/DynamicVeterinaryPage";
import { getVeterinaryPage, veterinaryPageMetadata } from "@/lib/product-page-metadata";

export async function generateMetadata() {
    return veterinaryPageMetadata("cattle-feed-supplements");
}

export default async function CattleFeedSupplementsPage() {
    const page = await getVeterinaryPage("cattle-feed-supplements");
    if (!page) return <main className="px-5 py-20 text-center">Veterinary page is unavailable. Please check the API connection.</main>;
    return <DynamicVeterinaryPage page={page} />;
}
