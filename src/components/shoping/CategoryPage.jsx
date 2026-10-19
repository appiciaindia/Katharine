"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { use } from "react";

import {
    FiSearch,
    FiChevronRight,
    FiGrid,
    FiList,
    FiCheck,
} from "react-icons/fi";
import { FaCat, FaCow, FaDog, FaPaw } from "react-icons/fa6";
import { GiChicken, GiGoat } from "react-icons/gi";

import { useCatalogCategories, useCatalogProducts } from "@/lib/catalog";
import ProductCard from "../ProductCard";

const animalTypes = [
    "Cattle",
    "Goat",
    "Poultry",
    "Dog",
    "Cat",
];

const getAnimalIcon = (label) => {
    const animal = String(label).trim().toLowerCase();

    if (animal.includes("cattle") || animal.includes("cow")) return FaCow;
    if (animal.includes("goat")) return GiGoat;
    if (animal.includes("poultry") || animal.includes("chicken") || animal.includes("bird")) return GiChicken;
    if (animal.includes("dog")) return FaDog;
    if (animal.includes("cat")) return FaCat;

    return FaPaw;
};

export default function CategoryPage({ params }) {

    const { slug } = use(params);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useCatalogCategories();
    const { data: products, loading: productsLoading, error: productsError } = useCatalogProducts({ categorySlug: slug });
    const category = categories.find(
        (item) => item.slug === slug
    );
    const categoryAnimals = Array.isArray(category?.animals) ? category.animals : animalTypes;

    const [search, setSearch] = useState("");
    const [animal, setAnimal] = useState("");
    const [sort, setSort] = useState("default");
    const [view, setView] = useState("grid");

    const categoryProducts = useMemo(() => {

        let data = [...products];

        if (search) {
            data = data.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if (animal) {
            data = data.filter((product) =>
                product.animalTypes?.includes(animal)
            );
        }

        if (sort === "low") {
            data.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );
        }

        if (sort === "high") {
            data.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );
        }

        if (sort === "name") {
            data.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        return data;

    }, [products, search, animal, sort]);

    if (!category) {
        if (categoriesLoading) {
            return <div className="min-h-[60vh] flex items-center justify-center text-gray-600">Loading category…</div>;
        }

        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Category Not Found
                    </h1>

                    <Link
                        href="/categories"
                        className="inline-block mt-5 bg-[#113173] text-white px-6 py-3 rounded-xl"
                    >
                        View Categories
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#f8fbff]">

            {/* Breadcrumb */}

            <div className="mx-auto px-4 pt-5">

                <div className="flex items-center gap-2 text-sm text-gray-500">

                    <Link href="/">
                        Home
                    </Link>

                    <FiChevronRight />

                    <Link href="/categories">
                        Categories
                    </Link>

                    <FiChevronRight />

                    <span className="text-[#113173] font-medium">
                        {category.name}
                    </span>

                </div>

            </div>


            {/* Hero */}

            <section className="mt-4">

                <div className="relative overflow-hidden bg-linear-to-r from-[#eaf5ff] to-[#fff8e9]">

                    <div className="mx-auto px-3 lg:px-12.5 md:px-5 py-10 lg:py-18 md:py-13">

                        <div className="grid lg:grid-cols-2 gap-8 items-center">

                            <div>

                                <h1 className="text-4xl md:text-5xl font-bold text-[#113173]">
                                    {category.name}
                                </h1>

                                <h2 className="text-xl md:text-2xl font-semibold mt-3 text-[#113173]">
                                    {category.title}
                                </h2>

                                <p className="mt-3 text-gray-600 max-w-xl leading-7">
                                    {category.description}
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7">

                                    {category.benefits.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-[#0c213c]">
                                                <FiCheck />
                                            </div>

                                            <span className="text-sm font-semibold text-[#113173]">
                                                {item}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                            </div>


                            <div className="relative">

                                <img
                                    src={category.heroImage}
                                    alt={category.name}
                                    className="w-full h-80 object-cover rounded-3xl"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Main Content */}

            <section className="lg:px-12.5 md:px-5 py-10 lg:py-18 md:py-13 mx-auto px-4">

                <div className="grid lg:grid-cols-[290px_1fr] gap-7">

                    {(categoriesError || productsError) && (
                        <p className="lg:col-span-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
                            The live catalog is unavailable. Showing the saved product list for now.
                        </p>
                    )}


                    {/* Sidebar */}

                    <aside className="bg-white rounded-2xl border border-gray-100 p-5 h-fit">

                        <h3 className="text-lg font-bold text-[#113173]">
                            Categories
                        </h3>

                        <div className="mt-4 space-y-1">

                            {categories.map((item) => (

                                <Link
                                    key={item.slug}
                                    href={`/categories/${item.slug}`}
                                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm ${item.slug === slug
                                            ? "bg-blue-50 text-[#0c213c] font-semibold"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >

                                    <span>
                                        {item.name}
                                    </span>

                                    <FiChevronRight />

                                </Link>

                            ))}

                        </div>


                        {/* Animal Filter */}

                        <div className="border-t mt-5 pt-5">

                            <h3 className="text-lg font-bold text-[#113173]">
                                Filter by Animal Type
                            </h3>

                            <div className="mt-4 space-y-4">

                                {categoryAnimals.map((item) => (

                                    <label
                                        key={item}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >

                                        <input
                                            type="radio"
                                            name="animal"
                                            checked={animal === item}
                                            onChange={() =>
                                                setAnimal(
                                                    animal === item
                                                        ? ""
                                                        : item
                                                )
                                            }
                                            className="w-4 h-4"
                                        />

                                        <span className="text-sm text-gray-700">
                                            {item}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>


                        {/* Price */}

                        <div className="border-t mt-5 pt-5">

                            <h3 className="text-lg font-bold text-[#113173]">
                                Price Range
                            </h3>

                            <div className="flex gap-2 mt-4">

                                <input
                                    type="number"
                                    placeholder="₹ 0"
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                />

                                <input
                                    type="number"
                                    placeholder="₹ 5000"
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                />

                            </div>

                        </div>

                    </aside>


                    {/* Products */}

                    <div>

                        {/* Toolbar */}

                        <div className="xl:flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

                            <div>

                                <h2 className="text-2xl font-bold text-[#113173] xl:mb-0 mb-3">
                                    {category.name}
                                    <span className="text-gray-400 text-base ml-2">
                                    ({productsLoading ? "…" : categoryProducts.length} Products)
                                    </span>
                                </h2>

                            </div>


                            <div className="md:flex items-center gap-3">

                                {/* Search */}

                                <div className="relative">

                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="md:w-52 border my-3 md:my-0 w-full bg-white rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#0c213c]"
                                    />

                                </div>


                                {/* Sort */}

                                <select
                                    value={sort}
                                    onChange={(e) =>
                                        setSort(e.target.value)
                                    }
                                    className="border bg-white rounded-xl px-3 py-2.5 text-sm "
                                >

                                    <option value="default">
                                        Default
                                    </option>

                                    <option value="low">
                                        Price Low to High
                                    </option>

                                    <option value="high">
                                        Price High to Low
                                    </option>

                                    <option value="name">
                                        Name
                                    </option>

                                </select>


                                <button
                                    onClick={() =>
                                        setView("grid")
                                    }
                                    className={`p-3 rounded-lg md:mx-0 mx-3 ${view === "grid"
                                            ? "bg-blue-50 text-[#0c213c]"
                                            : "bg-white"
                                        }`}
                                >
                                    <FiGrid />
                                </button>

                                <button
                                    onClick={() =>
                                        setView("list")
                                    }
                                    className={`p-3 rounded-lg ${view === "list"
                                            ? "bg-blue-50 text-[#0c213c]"
                                            : "bg-white"
                                        }`}
                                >
                                    <FiList />
                                </button>

                            </div>

                        </div>


                        {/* Product Grid */}

                        {categoryProducts.length > 0 ? (

                            <div
                                className={
                                    view === "grid"
                                        ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
                                        : "grid grid-cols-1 gap-5"
                                }
                            >

                                {categoryProducts.map(
                                    (product) => (

                                        <ProductCard
                                            key={product.id}
                                            {...product}
                                        />

                                    )
                                )}

                            </div>

                        ) : (

                            <div className="bg-white rounded-2xl p-12 text-center">

                                <div className="text-5xl mb-4">
                                    🔍
                                </div>

                                <h3 className="text-xl font-bold text-[#113173]">
                                    No Products Found
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Try another search or animal type.
                                </p>

                            </div>

                        )}


                        {/* Why Choose */}

                        <div className="mt-8 grid md:grid-cols-2 gap-5">

                            <div className="rounded-2xl overflow-hidden bg-white border">

                                <img
                                    src={category.whyImage}
                                    alt={category.whyTitle}
                                    className="w-full h-64 object-cover"
                                />

                            </div>


                            <div className="bg-[#eef7ff] rounded-2xl p-7">

                                <h2 className="text-2xl font-bold text-[#113173]">
                                    {category.whyTitle}
                                </h2>

                                <div className="mt-5 space-y-4">

                                    {category.whyPoints.map((item) => (

                                        <div
                                            key={item}
                                            className="flex items-center gap-3"
                                        >

                                            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-green-600">
                                                <FiCheck />
                                            </div>

                                            <span className="text-gray-700">
                                                {item}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>


                        {/* Suitable Animals */}

                        <div className="mt-5 bg-white rounded-2xl border p-6">

                            <h2 className="text-2xl font-bold text-[#113173]">
                                Suitable For All Animals
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">

                                {categoryAnimals.map((animal) => {
                                    const AnimalIcon = getAnimalIcon(animal);
                                    return (
                                        <div key={animal} className="rounded-xl bg-gray-50 p-4 text-center">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#113173]">
                                                <AnimalIcon aria-hidden="true" className="h-8 w-8" />
                                            </div>
                                            <p className="mt-2 font-semibold text-[#113173]">{animal}</p>
                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}
