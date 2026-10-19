"use client";
import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import { Autoplay } from 'swiper/modules';

const Categories = () => {

    const categories = [
        {
            id: 1,
            name: "Animal Feed Supplement",
            img: "/images/animal-feed-supplement.webp",
            slug: "animal-feed-supplement",
            bg: "from-purple-100",
        },
        {
            id: 2,
            name: "Mineral Mixture",
            img: "/images/mineral-mixture.webp",
            slug: "mineral-mixture",
            bg: "from-green-100",
        },
        {
            id: 3,
            name: "Liquid Calcium",
            img: "/images/liquid-calcium.webp",
            slug: "liquid-calcium",
            bg: "from-yellow-100",
        },
        {
            id: 4,
            name: "Veterinary Supplements",
            img: "/images/veterinary-supplements.webp",
            slug: "veterinary-supplements",
            bg: "from-red-100",
        },
        {
            id: 5,
            name: "Chelated Calcium",
            img: "/images/chelated-calcium.webp",
            slug: "chelated-calcium",
            bg: "from-blue-100",
        },
        {
            id: 6,
            name: "Veterinary Feed Supplement",
            img: "/images/veterinary-feed-supplement.webp",
            slug: "veterinary-feed-supplement",
            bg: "from-pink-100",
        },
        {
            id: 7,
            name: "Veterinary Liver Tonic",
            img: "/images/veterinary-liver-tonic.webp",
            slug: "veterinary-liver-tonic",
            bg: "from-lime-200",
        },
    ]

    return (
        <div className='category-section xl:px-12.5 lg:px-8 md:px-4 px-3 py-5 lg:py-20 md:py-11'>
            <div className="cate-head  xl:flex justify-between items-center md:block">
                <div className="md:w-4/5">
                    <h3 className='font-bold md:text-3xl text-2xl mb-2'>Featured Categories</h3>
                    <p className=' md:text-[18px]'>Choose your necessary products from this feature categories.</p>
                </div>
                <Button href={"/caregories"} variant='outline' className='xl:w-1/5 md:w-auto my-5 xl:my-1'>
                    View All Categories
                </Button>
            </div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={2}
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    },
                }}

            >
                {categories.map((category) => {
                    return (
                        <SwiperSlide key={category.id}>
                            <Link href={`/caregories/${category.slug}`}>
                                <div className={`rounded-xl p-1 py-3.5 md:p-5 h-full md:mb-0 mb-3 text-center bg-linear-to-b to-white ${category.bg} shadow-md mt-5.5 group`}>
                                    <img src={category.img} alt={category.name} className='h-38 m-auto' />
                                    <h3 className='font-medium xl:text-[18px] md:text-[16px] text-[13px] group-hover:text-[#0c213c] ease-in-out duration-400'>{category.name} </h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
};

export default Categories;
