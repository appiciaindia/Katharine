"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import blogs from "@/data/blogs";

const BlogDetails = ({ params }) => {
    const { slug } = use(params);

    const blog = blogs.find((item) => item.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#0c213c]">
                        Blog Not Found
                    </h1>

                    <Link
                        href="/blog"
                        className="inline-block mt-5 px-6 py-3 rounded-lg bg-[#f89a18] text-white font-semibold"
                    >
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    const recentBlogs = blogs
        .filter((item) => item.slug !== slug)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);

    return (
        <div className="lg:px-10 md:px-7 px-4 py-10 md:py-14 lg:py-20">

            {/* Blog Header */}
            <div className="text-center lg:w-3/5 mx-auto mt-4">

                <span className="inline-block font-medium px-4 py-2 rounded-full border border-[#f89a18] text-[#f89a18]">
                    {blog.category}
                </span>

                <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl my-5 text-[#0c213c] lg:leading-tight">
                    {blog.title}
                </h1>

                <span className="inline-block px-4 py-2 bg-orange-50 text-[#0c213c] font-semibold rounded-full">
                    {blog.date}
                </span>

            </div>

            {/* Main Content */}
            <div className="lg:flex justify-between mt-10">

                {/* Blog Content */}
                <div className="lg:w-2/3 lg:mr-8">

                    {/* Featured Image */}
                    <div className="relative w-full h-62. md:h-100 lg:h-125">
                        <Image
                            src={blog.img}
                            alt={blog.title}
                            fill
                            priority
                            className="rounded-2xl object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="mt-8 text-gray-700 leading-8">

                        {blog.content?.map((item, index) => (
                            <p
                                key={index}
                                className="mb-5 text-base md:text-lg"
                            >
                                {item}
                            </p>
                        ))}

                    </div>

                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3 xl:pl-10 lg:pl-0 mt-10 lg:mt-0">

                    <div className="lg:sticky lg:top-25">

                        {/* About */}
                        <div className="p-6 rounded-xl bg-[#f7f9fc] border border-gray-100">

                            <h5 className="text-2xl font-bold mb-3 text-[#0c213c]">
                                About Katharine Pharma
                            </h5>

                            <p className="text-gray-600 leading-7">
                                Katharine Pharma provides quality animal nutrition
                                and wellness products designed to support healthier,
                                stronger and more productive animals. Our product
                                range includes nutritional supplements for cattle,
                                goats, poultry, dogs and cats.
                            </p>

                        </div>

                        {/* Recent Blogs */}
                        <div className="mt-6 lg:mt-10 bg-[#f7f9fc] p-5 rounded-xl">

                            <div className="mb-4 flex items-center justify-between border-b-2 border-[#f89a18] pb-2">

                                <h4 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                                    Recent Blogs
                                </h4>

                                <Link
                                    href="/blog"
                                    className="text-[#f89a18] font-semibold hover:underline"
                                >
                                    View All
                                </Link>

                            </div>

                            <div>

                                {recentBlogs.map((item) => (
                                    <Link
                                        href={`/blog/${item.slug}`}
                                        key={item.slug}
                                        className="block"
                                    >
                                        <div className="flex gap-3 mt-4 border-b pb-3">

                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                width={100}
                                                height={80}
                                                className="rounded-xl h-20 w-24 object-cover shrink-0"
                                            />

                                            <div>

                                                <h6 className="text-sm md:text-base font-semibold text-[#0c213c] hover:text-[#f89a18] transition duration-300 line-clamp-2">
                                                    {item.title}
                                                </h6>

                                                <span className="text-sm text-gray-500">
                                                    {item.date}
                                                </span>

                                            </div>

                                        </div>
                                    </Link>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default BlogDetails;