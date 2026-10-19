"use client";
import React from 'react';
import Link from "next/link";
import { FiChevronRight, FiGrid, FiList } from "react-icons/fi";
import products from '@/data/products';
import ProductCard from '@/components/ProductCard';

const page = () => {

    const bestSellingProduct = products.filter((product)=> product.isBestSelling === true);

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
                            Best-Selling
                        </span>

                    </div>

                </div>
            </div>

            {/* Hero */}
            <section className="bg-[#0c213c] text-white">
                <div className="max-w-7xl mx-auto px-4 py-14 text-center">

                    <span className="inline-block bg-[#f89a18] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        🔥 Customer Favorites
                    </span>

                    <h1 className="text-3xl md:text-5xl font-bold">
                        Best-Selling Products
                    </h1>

                    <p className="max-w-2xl mx-auto mt-4 text-white/80 leading-7">
                        Explore our most popular animal nutrition products
                        loved by customers.
                    </p>

                </div>
            </section>

            {/* Products */}
            <section className="max-w-360 mx-auto px-4 py-10">

                {/* Top Bar */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#0c213c]">
                            Best-Selling Products
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {bestSellingProduct.length} products found
                        </p>
                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            className="p-2 rounded-lg border border-gray-200 text-[#0c213c] hover:text-[#f89a18] hover:border-[#f89a18]"
                        >
                            <FiGrid size={20} />
                        </button>

                        <button
                            type="button"
                            className="p-2 rounded-lg border border-gray-200 text-[#0c213c] hover:text-[#f89a18] hover:border-[#f89a18]"
                        >
                            <FiList size={20} />
                        </button>

                    </div>

                </div>

                {/* Product Grid */}
                {bestSellingProduct.length > 0 ? (

                   <div className='grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4'>
                     {
                        bestSellingProduct.map((product)=>{
                            return(
                                <ProductCard key={product.id} {...product} />
                            )
                        })
                     }
                   </div>

                ) : (

                    /* No Products */
                    <div className="bg-white rounded-xl p-12 text-center">

                        <h3 className="text-xl font-semibold text-[#0c213c]">
                            No Best-Selling Products Found
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Best-selling products will appear here.
                        </p>

                        <Link
                            href="/shop"
                            className="inline-block mt-5 bg-[#f89a18] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d97f05]"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                )}

            </section>

        </main>
  )
}

export default page
