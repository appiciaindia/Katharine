"use client";

import Link from "next/link";
import React from "react";
import { useCatalogProducts } from "@/lib/catalog";

export default function FeaturedProducts({
  title = "Featured Cattle Nutrition Products",
  description = "Explore selected cattle feed supplements and nutritional products from Katharine Pharma.",
  animalSlug = "cattle",
}) {
  const { data: products, loading } = useCatalogProducts({ featured: true, animalSlug });

  return (
    <div className="px-2.5 lg:px-10 md:px-7">
      <div className="flex items-center justify-center">
        <div className="lg:w-1/2 text-center">
          <h2 className="font-bold text-2xl lg:text-4xl md:text-3xl texrt-[#0c213c]">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-5 gap-3 my-5 lg:my-7">
        {products.map((product) => (
          <div className="md:p-4 p-2.5 rounded-xl hover:bg-amber-100 ease-in-out duration-600 border-amber-200 border bg-emerald-50 text-center" key={product.id || product.slug}>
            <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
              <img src={product.image || "/logo.png"} alt={product.name} className="md:h-50 h-40 m-auto object-contain" onError={(event) => { event.currentTarget.src = "/logo.png"; }} />
            </Link>
            <h5 className="md:text-[18px] text-[#0c213c] font-semibold lg:text-xl my-2.5">{product.name}</h5>
            <p className="text-[14px] md:text-[16px] line-clamp-2">{product.shortDescription || product.short_description || ""}</p>
          </div>
        ))}
        {!loading && products.length === 0 && (
          <p className="col-span-full py-8 text-center text-slate-600">No featured products are available yet.</p>
        )}
      </div>
    </div>
  );
}
