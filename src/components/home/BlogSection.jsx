"use client"
import blogs from '@/data/blogs';
import React from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import BlogCard from '../blog/BlogCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";

const BlogSection = () => {
    return (
        <div className=' lg:px-10 md:px-6 px-3'>
            <div className="flex justify-center">
                <div className="lg:w-1/2 text-center mb-5">
                    <span className='rounded-3xl border border-amber-300 text-amber-300 px-5 py-2.5 font-medium'>Our Blogs</span>
                    <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl my-4'>Animal Nutrition & Care Insights</h2>
                    <p>Discover useful tips, expert insights, and helpful information about animal nutrition, supplements, feeding, and everyday animal care.</p>
                </div>
            </div>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                }}
            >
            {blogs.map((item)=>{
                return(
                    <SwiperSlide className='mb-3'>
                        <BlogCard blog={item} key={item.id}></BlogCard>
                    </SwiperSlide>
                )
            })}
            </Swiper>
        </div>
    )
}

export default BlogSection;
