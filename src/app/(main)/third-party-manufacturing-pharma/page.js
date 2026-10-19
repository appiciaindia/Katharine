import ThirdPartyManufacturingPage from "@/components/manufacturing/ThirdPartyManufacturingPage";
import { productPageMetadata } from "@/lib/product-page-metadata";

export async function generateMetadata() {
    return productPageMetadata("third-party-manufacturing-pharma");
}

export default function Page() {
    return <ThirdPartyManufacturingPage />;
}
