"use client"
import React from 'react';
import { HiOutlineArrowRight } from "react-icons/hi";
import ProductCard from '../ProductCard';
import Button from '../Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation  } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import { useCatalogProducts } from '@/lib/catalog';

const NewArrivals = () => {
    const { data: products } = useCatalogProducts();

    return (
        <div className='xl:px-12.5 lg:px-8 md:px-4 px-2  new-arrivals'>
            <div className="cate-head  xl:flex justify-between items-center md:mb-8 mb-5 md:flex block">
                <div className="md:w-4/5">
                    <h3 className='font-bold md:text-3xl mb-2 text-2xl'>New Arrivals</h3>
                    <p className='md:text-[18px]'>Explore our latest products and newly added nutrition solutions.</p>
                </div>
                <Button href={"/products"} variant='outline' className='xl:w-1/5 md:w-auto md:mt-5 md:mb-5 mt-4 xl:my-1'>
                    <span>View All</span> <HiOutlineArrowRight className='ml-3' />
                </Button>
            </div>

            <Swiper
                modules={[Autoplay, Navigation ]}
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
                {products.filter((product) => product.new_arrival).slice(0, 8).map((product) => {
                    return (
                        <SwiperSlide key={product.id}>
                            <div className="h-full lg:mb-0 mb-20">
                                <ProductCard  {...product}></ProductCard>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            {!products.some((product) => product.new_arrival) && <p className="py-6 text-center text-sm text-gray-500">New products will appear here soon.</p>}

        </div>
    )
}

export default NewArrivals;
