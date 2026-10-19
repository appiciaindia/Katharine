import CategoryPage from "@/components/shoping/CategoryPage";
import { categories } from "@/data/categories";

export function generateStaticParams() {
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export default function Page({ params }) {
    return <CategoryPage params={params} />;
}