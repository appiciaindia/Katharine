"use client";

import React from 'react';
import { HiOutlineArrowRight } from "react-icons/hi";
import ProductCard from '../ProductCard';
import { FiArrowUpRight } from "react-icons/fi";
import Button from '../Button';
import { useCatalogProducts } from '@/lib/catalog';

const FeaturedProducts = () => {
    const { data: products } = useCatalogProducts();
    const featuredProducts = products.some((product) => product.featured)
        ? products.filter((product) => product.featured)
        : products.slice(0, 5);

    return (
        <div className='xl:px-12.5 lg:px-8 md:px-4 px-2'>
            <div className="cate-head  xl:flex justify-between items-center md:mb-8 mb-0 md:flex block">
                <div className="md:w-4/5">
                    <h3 className='font-bold md:text-3xl text-2xl mb-2'>Featured Products</h3>
                    <p className='md:text-[18px]'>Discover our most popular and recommended products.</p>
                </div>
                <Button href={"/products"} variant='outline' className='xl:w-1/5 md:w-auto my-5 xl:my-1'>
                    <span>View All</span> <HiOutlineArrowRight className='ml-3' />
                </Button>
            </div>
            <div className='grid xl:grid-cols-5 md:grid-cols-2 grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2'>
                {featuredProducts.map((product) => {
                    return(
                       <div key={product.id} className='mt-3 '>
                         <ProductCard  {...product} ></ProductCard>
                       </div>
                    )
                })}
            </div>
            <div className="flex justify-center text-center mt-10">
                <Button href={"/products"}>
                    <span>View All Products</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
                </Button>
            </div>
        </div>
    )
}

export default FeaturedProducts;
