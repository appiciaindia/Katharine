import BlogDetails from "@/components/blog/BlogDetails";
import blogs from "@/data/blogs";

export function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function Page({ params }) {
    return <BlogDetails params={params} />;
}