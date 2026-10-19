"use client";

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState } from "react";
import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaTrash,
  FaStar,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa";

const wishlistResponse = {
  success: true,

  data: [
    {
      id: 1,
      name: "Mineral Plus",
      slug: "mineral-plus",
      category: "Mineral Supplements",
      image: "/images/mineral-mixture.webp",
      price: 899,
      mrp: 1099,
      rating: 4.8,
      reviews: 124,
      stock: true,
    },

    {
      id: 2,
      name: "Calcium Supplement",
      slug: "calcium-supplement",
      category: "Calcium Supplements",
      image: "/images/mineral-mixture.webp",
      price: 699,
      mrp: 849,
      rating: 4.7,
      reviews: 98,
      stock: true,
    },

    {
      id: 3,
      name: "Liver Tonic",
      slug: "liver-tonic",
      category: "Liver Tonics",
      image: "/images/mineral-mixture.webp",
      price: 499,
      mrp: 599,
      rating: 4.6,
      reviews: 76,
      stock: true,
    },

    {
      id: 4,
      name: "Vitamin Supplement",
      slug: "vitamin-supplement",
      category: "Vitamin Supplements",
      image: "/images/mineral-mixture.webp",
      price: 799,
      mrp: 999,
      rating: 4.8,
      reviews: 145,
      stock: true,
    },

    {
      id: 5,
      name: "Digestive Supplement",
      slug: "digestive-supplement",
      category: "Digestive Supplements",
      image: "/images/mineral-mixture.webp",
      price: 599,
      mrp: 749,
      rating: 4.5,
      reviews: 63,
      stock: false,
    },

    {
      id: 6,
      name: "Immunity Supplement",
      slug: "immunity-supplement",
      category: "Immunity Supplements",
      image: "/images/mineral-mixture.webp",
      price: 749,
      mrp: 899,
      rating: 4.7,
      reviews: 89,
      stock: true,
    },
  ],
};

export default function Wishlist() {
  const [products, setProducts] = useState(wishlistResponse.data);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const removeFromWishlist = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  };

  const getDiscount = (price, mrp) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <FaHeart />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#113173]">
                My Wishlist
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Save your favorite products and buy them whenever you need.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff360a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e82f08] transition"
        >
          Continue Shopping
          <FaArrowRight />
        </Link>

      </div>

      {/* Wishlist Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Wishlist Items
          </p>

          <h2 className="text-2xl font-bold text-[#113173] mt-1">
            {products.length}
          </h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            In Stock
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-1">
            {products.filter((product) => product.stock).length}
          </h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Out of Stock
          </p>

          <h2 className="text-2xl font-bold text-red-500 mt-1">
            {products.filter((product) => !product.stock).length}
          </h2>
        </div>

      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}
          <div className="relative flex-1">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search wishlist products..."
              className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#0293fd] focus:ring-1 focus:ring-[#0293fd]"
            />

          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="lg:w-64 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#0293fd]"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Wishlist Products */}
      {filteredProducts.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredProducts.map((product) => {

            

            return (
              <ProductCard key={product.id} slug={product.slug} name={product.name} price={product.price} id={product.id} image={product.image} oldPrice={product.mrp} rating={product.rating} reviewCount={product.reviews} />
            );
          })}

        </div>

      ) : (

        /* Empty State */
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-12 md:p-16 text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-red-50 text-red-400 flex items-center justify-center text-3xl">
            <FaHeart />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#113173]">
            Your Wishlist is Empty
          </h2>

          <p className="mt-2 max-w-md mx-auto text-sm text-gray-500">
            You haven&apos;t saved any products yet. Explore our animal nutrition
            products and add your favorites to your wishlist.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-6 rounded-lg bg-[#ff360a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e82f08] transition"
          >
            <FaShoppingCart />
            Start Shopping
          </Link>

        </div>

      )}

    </div>
  );
}
