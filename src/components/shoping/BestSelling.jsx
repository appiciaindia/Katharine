"use client"
import React from 'react';
import { HiOutlineArrowRight } from "react-icons/hi";
import ProductCard from '../ProductCard';
import Button from '../Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useCatalogProducts } from '@/lib/catalog';
import "swiper/css";
import "swiper/css/navigation";

const BestSelling = () => {
    const { data: products } = useCatalogProducts();

    return (
        <div className='xl:px-12.5 lg:px-8 md:px-4 px-2 new-arrivals'>
            <div className="cate-head  xl:flex justify-between items-center mb-8 md:flex block">
                <div className="md:w-4/5">
                    <h3 className='font-bold md:text-3xl mb-2 text-2xl'>Our Best Selling Products</h3>
                    <p className='md:text-[18px]'>Shop the products loved and trusted by our customers.</p>
                </div>
                <Button href={"/products"} variant='outline' className='xl:w-1/5 md:w-auto my-5 xl:my-1'>
                    <span>View All</span> <HiOutlineArrowRight className='ml-3' />
                </Button>
            </div>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={10}
                slidesPerView={2}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                        spaceBetween:20
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween:20
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween:20
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween:20
                    },
                }}
            >
                {products.slice(0, 8).map((product) => {
                    return (
                        <SwiperSlide key={product.id}>
                            <div className="h-full lg:mb-0 mb-20">
                                <ProductCard  {...product}></ProductCard>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default BestSelling;
