import DynamicProductPage from "@/components/manufacturing/DynamicProductPage";
import { productPageMetadata } from "@/lib/product-page-metadata";

export async function generateMetadata() {
    return productPageMetadata("liquid-products");
}

export default function LiquidProductsPage() {
    return <DynamicProductPage slug="liquid-products" />;
}
