"use client";

import Link from 'next/link';
import React from 'react';
import Button from './Button';
import { FaRegHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useCart } from '@/context/CartContext';


const ProductCard = ({ name, image, id, slug, price, oldPrice, rating = 0, reviewCount = 0, reviews = 0, new_arrival = false }) => {

    const {addToCart } = useCart();
    const totalReviews = Number(reviewCount || reviews || 0);

    return (
        <div className='cart rounded-xl bg-white group overflow-hidden  shadow-2xs h-full'>
            <Link href={`/products/${slug}`}>
                <div className="cart-img relative bg-[#dbccf5fa]">
                    <img src={image} alt={name} onError={(event) => { event.currentTarget.src = "/logo.png"; }} className='object-cover transition-transform duration-300 group-hover:scale-105 md:h-50 h-30 m-auto' />
                    {oldPrice && (
                        <span className='md:px-3 px-2 py-1 rounded-3xl bg-pink-300 md:text-[14px] text-[12px] absolute md:top-3 top-1.5 md:right-3 right-2'>{Math.round(
                            ((oldPrice - price) / oldPrice) * 100
                        )}% Off</span>
                    )}
                    {new_arrival && <span className="absolute bottom-3 left-3 rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white">New Arrival</span>}
                    <div className="whislist absolute top-3 text-2xl left-3 text-[#0c213c]">
                        <FaRegHeart />
                    </div>
                </div>
            </Link>
            <div className="md:p-4 p-3 pt-0 overflow-hidden border-[#ebe7f2fa] border rounded-b-xl h-full">
                <Link href={`/products/${slug}`}>
                    <h3 className='font-semibold md:text-[20px] text-sm md:mb-3 mb-2 mt-1.5 hover:text-[#0c213c] line-clamp-2'>{name}</h3>
                </Link>
                {totalReviews > 0 && <Link href={`/products/${slug}#reviews`} className="mb-2 inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#0c213c]" aria-label={`Rated ${Number(rating || 0).toFixed(1)} out of 5 from ${totalReviews} reviews`}>
                    <FaStar className="text-amber-400" />
                    <span className="font-semibold">{Number(rating || 0).toFixed(1)}</span>
                    <span>({totalReviews} reviews)</span>
                </Link>}
                <div className="flex items-center gap-2 overflow-hidden">
                    <span className='md:text-xl text-sm font-semibold text-gray-950'>₹{price}</span>
                    {oldPrice && (
                        <span className='text-sm line-through text-gray-400'>₹{oldPrice}</span>
                    )}
                </div>
                <Button type='button' className='md:mt-4 mt-2.5 md:text-[16px] text-sm!' onClick={()=> addToCart({id,oldPrice,price,slug,name,image,rating,reviewCount: totalReviews})}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductCard;
