"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";
import { useCatalogCategories, useCatalogProducts } from "@/lib/catalog";

export default function ProductsPage() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");
    const { data: products, loading, error } = useCatalogProducts();
    const { data: catalogCategories } = useCatalogCategories();

    const categories = ["All", ...catalogCategories.map((item) => item.name)];

    // Filter + Search + Sort
    const filteredProducts = useMemo(() => {

        let result = [...products];

        // Search
        if (search.trim()) {
            result = result.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        // Category
        if (category !== "All") {
            result = result.filter(
                (product) => product.category === category
            );
        }

        // Sort
        if (sort === "price-low") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "price-high") {
            result.sort((a, b) => b.price - a.price);
        }

        if (sort === "name") {
            result.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        return result;

    }, [products, search, category, sort]);

    return (
        <main className="bg-[#f8faff] min-h-screen">

            {/* Hero */}
            <section className="bg-[#113173] py-14 md:py-20 px-3 lg:px-10 md:px-6">
                <div className="container mx-auto px-4">

                    <div className="max-w-3xl">

                        <span className="text-[#0293fd] font-semibold">
                            KATHARINE PHARMA
                        </span>

                        <h1 className="text-white text-3xl md:text-5xl font-bold mt-2">
                            Our Products
                        </h1>

                        <p className="text-white/80 mt-4 text-sm md:text-lg">
                            Explore quality animal nutrition and veterinary
                            supplements designed for healthier animals.
                        </p>

                    </div>

                </div>
            </section>


            {/* Products Section */}
            <section className="py-10 md:py-14 md:px-8 px-0">

                <div className="container mx-auto px-4">

                    {/* Search + Sort */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">

                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">

                            <FiSearch
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-11 pr-4 outline-none focus:border-[#0293fd]"
                            />

                        </div>


                        {/* Sort */}
                        <div className="flex items-center gap-3">

                            <span className="hidden md:block text-gray-600">
                                Sort By:
                            </span>

                            <select
                                value={sort}
                                onChange={(e) =>
                                    setSort(e.target.value)
                                }
                                className="h-12 bg-white border border-gray-200 rounded-xl px-4 outline-none w-full md:w-auto"
                            >
                                <option value="default">
                                    Default
                                </option>

                                <option value="price-low">
                                    Price: Low to High
                                </option>

                                <option value="price-high">
                                    Price: High to Low
                                </option>

                                <option value="name">
                                    Name: A-Z
                                </option>
                            </select>

                        </div>

                    </div>


                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-8">

                        {categories.map((item) => (

                            <button
                                key={item}
                                type="button"
                                onClick={() =>
                                    setCategory(item)
                                }
                                className={`whitespace-nowrap px-5 py-2.5 rounded-full border transition ${
                                    category === item
                                        ? "bg-[#113173] text-white border-[#113173]"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-[#0293fd]"
                                }`}
                            >
                                {item}
                            </button>

                        ))}

                    </div>


                    {error && (
                        <p className="mb-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
                            The live catalog is unavailable. Showing the saved product list for now.
                        </p>
                    )}

                    {/* Result Count */}
                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#113173]">
                                All Products
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {loading ? "Loading catalog…" : `${filteredProducts.length} products found`}
                            </p>
                        </div>
                    </div>
                    {/* Product Grid */}
                    {loading ? (
                        <Loader inline label="Loading products…" />
                    ) : filteredProducts.length > 0 ? (

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-2.5 md:gap-6">

                            {filteredProducts.map((product) => (

                                <div
                                    key={product.id}
                                    className="mt-3"
                                >
                                    <ProductCard
                                        {...product}
                                    />
                                </div>

                            ))}

                        </div>

                    ) : (

                        /* No Products */
                        <div className="bg-white rounded-2xl py-16 text-center">

                            <div className="text-5xl mb-4">
                                🔍
                            </div>

                            <h3 className="text-xl font-semibold text-[#113173]">
                                No Products Found
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Try another search or category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setCategory("All");
                                }}
                                className="mt-5 px-6 py-3 rounded-xl bg-[#113173] text-white"
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
}
