"use client";

import React from "react";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCatalogCategories } from "@/lib/catalog";

const colors = [
    "bg-[#e9f9ef]",
    "bg-[#d2effd]",
    "bg-[#feebd2]",
    "bg-[#fef5dd]",
    "bg-[#effaea]",
];

export default function Categories({
    title = "Explore Our Product Categories",
    description = "Discover a wide range of animal nutrition, feed supplements, vitamins, minerals, and wellness products for everyday animal care.",
}) {
    const { data: categories } = useCatalogCategories();

    return (
        <section className="lg:px-10 md:px-6 px-2.5 py-10 lg:py-20 md:py-15">
            <div className="xl:w-1/2 lg:w-3/5 mb-5 lg:mb-8 md:mb-6">
                <h2 className="font-bold lg:text-4xl text-3xl my-3">{title}</h2>
                <p>{description}</p>
            </div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    480: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1200: { slidesPerView: 4, spaceBetween: 20 },
                }}
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={category.id || category.slug}>
                        <div className={`lg:p-5 p-3 border-amber-200 text-center rounded-2xl ${colors[index % colors.length]}`}>
                            <Link
                                href={`/categories/${category.slug}`}
                            >
                                <div className="">
                                    <img src={category.heroImage} alt={category.name} onError={(event) => { event.currentTarget.src = "/logo.png"; }} className="w-full object-cover rounded-2xl h-50" />
                                </div>
                                <div className="min-w-0 flex-1 mt-3">
                                    <h3 className="font-bold lg:text-xl text-[16px] my-3">{category.name}</h3>
                                    <p>{category.description}</p>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
