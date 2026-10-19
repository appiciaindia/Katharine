"use client";
import React, { useState } from 'react';
import Button from '../Button';
import { FiArrowUpRight } from "react-icons/fi";
import ProductCard from '../ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const Hero = () => {


    const products = [
        {
            id: 1,
            name: "Animal Liquid Chelated Calcium Kathcal Gold 5 liter",
            slug: "animal-liquid-chelated-calcium-kathcal-gold-5-liter",
            image: "/images/kathcal-gold-5-ltr.webp",
            price: 270,
            oldPrice: 320,
        },
        {
            id: 2,
            name: "Chelated Liquid Calcium Ch Brutcal 2 LTR",
            slug: "chelated-liquid-calcium-ch-brutcal-2-ltr",
            image: "/images/ch-brutcal-2-ltr.webp",
            price: 104,
            oldPrice: 130,
        },
        {
            id: 3,
            name: "Veterinary Anti Mastitis Powder UC Tonic 250 GM",
            slug: "veterinary-anti-mastitis-powder-uc-tonic-250-gm",
            image: "/images/uc-tonic-mastitis-powder-250-gm.webp",
            price: 180,
            oldPrice: 220,
        },
    ]

    return (
        <div className='hero-section group md:pt-45 pt-20 shadow-2xs md:px-10 px-4 md:flex items-center justify-between bg-linear-to-b from-[#0c213c] to-white'>
            <div className="hero-overlay absolute lg:top-45 md:top-35  top-31 left-[50%] translate-[-50%] text-center w-full">
                <h2 className='xl:text-[130px] lg:text-[90px] md:text-[60px] text-4xl font-bold uppercase text-[#ffffffcd] md:opacity-10 opacity-5'>Animal Nutrition</h2>
            </div>
            <div className="hero-left xl:w-[35%] lg:w-[38%] md:w-[60%] pb-8 lg:pb-0 w-full md:text-left text-center">
                <h6 className='text-xl font-medium md:text-black text-white'>Exclusive offer <span className='px-3 py-1 rounded-3xl bg-pink-300 text-[14px]'>25% OFF</span></h6>
                <h1 className='xl:text-5xl lg:text-4xl font-bold xl:leading-14 md:text-black text-white lg:leading-11 md:text-3xl text-3xl md:my-4 my-2'>Better Nutrition for Healthier Animals</h1>
                <p className='md:text-black text-blue-100'>Premium veterinary and animal feed supplements designed to support healthy growth, nutrition, strength, and overall animal wellness.</p>
                <Button href={"/shop"} className='classes mt-5'><span>Shop Now</span> <i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i></Button>
            </div>
            <div className="hero-center xl:w-[42%] lg:w-[35%] md:w-[40%] relative z-10">
                <img src="/images/hero-img.png" alt="hero image" />
            </div>
            <div className="hero-right xl:w-[23%] lg:w-[27%] hidden lg:block xl:ml-10 lg:ml-3">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}

                >
                    {products.map((product) => {
                        return (
                            <SwiperSlide>
                                <ProductCard key={product.id} {...product}>

                                </ProductCard>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default Hero;
