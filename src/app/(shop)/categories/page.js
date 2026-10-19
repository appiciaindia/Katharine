"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FiChevronRight,
    FiArrowRight,
} from "react-icons/fi";

import { useCatalogCategories } from "@/lib/catalog";

export default function CategoriesPage() {
    const { data: categories, loading, error } = useCatalogCategories();

    return (
        <main className="min-h-screen bg-[#f7f9fc]">

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-360 mx-auto px-4 py-4">

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <Link
                            href="/"
                            className="hover:text-[#f89a18]"
                        >
                            Home
                        </Link>

                        <FiChevronRight size={16} />

                        <span className="text-[#0c213c] font-medium">
                            Categories
                        </span>

                    </div>

                </div>
            </div>

            {/* Hero */}
            <section className="bg-[#0c213c] text-white">
                <div className="max-w-360 mx-auto px-4 py-16 text-center">

                    <span className="inline-block bg-[#f89a18] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        Explore Our Products
                    </span>

                    <h1 className="text-3xl md:text-5xl font-bold">
                        Animal Nutrition Categories
                    </h1>

                    <p className="max-w-2xl mx-auto mt-4 text-white/80 leading-7">
                        Explore our complete range of animal nutrition
                        and wellness products designed for healthier animals.
                    </p>

                </div>
            </section>

            {/* Categories */}
            <section className="max-w-360 mx-auto px-4 py-12">

                <div className="text-center mb-10">

                    <h2 className="text-2xl md:text-3xl font-bold text-[#0c213c]">
                        Shop By Category
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Find the right nutritional solution for your animals.
                    </p>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

                    {error && (
                        <p className="col-span-full rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
                            The live categories are unavailable. Showing the saved category list for now.
                        </p>
                    )}

                    {categories.map((category) => (

                        <Link
                            key={category.slug}
                            href={`/categories/${category.slug}`}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                        >

                            {/* Image */}
                            <div className="relative h-48 md:h-56 bg-[#eef4f8] overflow-hidden">

                                {category.heroImage ? (
                                    <Image
                                        src={category.heroImage}
                                        alt={category.name}
                                        fill
                                        unoptimized={category.heroImage.startsWith("http")}
                                        onError={(event) => { event.currentTarget.src = "/logo.png"; }}
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-[#0c213c] font-semibold">
                                        {category.name}
                                    </div>
                                )}

                            </div>

                            {/* Content */}
                            <div className="p-5">

                                <h3 className="text-lg font-bold text-[#0c213c] group-hover:text-[#f89a18] transition-colors">
                                    {category.name}
                                </h3>

                                {category.description && (
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                        {category.description}
                                    </p>
                                )}

                                <div className="flex items-center gap-2 mt-4 text-[#f89a18] font-semibold text-sm">

                                    <span>
                                        View Products
                                    </span>

                                    <FiArrowRight
                                        className="group-hover:translate-x-1 transition-transform"
                                    />

                                </div>

                            </div>

                        </Link>

                    ))}

                    {!loading && !categories.length && (
                        <p className="col-span-full py-10 text-center text-gray-600">No product categories are available yet.</p>
                    )}

                </div>

            </section>

            {/* Bottom CTA */}
            <section className="max-w-360 mx-auto px-4 pb-14">

                <div className="bg-[#0c213c] rounded-2xl px-6 py-10 md:px-12 text-center text-white">

                    <h2 className="text-2xl md:text-3xl font-bold">
                        Looking for the Right Product?
                    </h2>

                    <p className="text-white/75 mt-3 max-w-2xl mx-auto">
                        Explore all our animal nutrition products and find
                        the right solution for your requirements.
                    </p>

                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 mt-6 bg-[#f89a18] hover:bg-[#d97f05] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Shop All Products
                        <FiArrowRight />
                    </Link>

                </div>

            </section>

        </main>
    );
}
