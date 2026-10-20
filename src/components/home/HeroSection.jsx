"use client"
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { FiArrowUpRight } from 'react-icons/fi';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { RiBox3Line } from 'react-icons/ri';
import { FaCartArrowDown } from 'react-icons/fa';
import { PiTruckFill } from 'react-icons/pi';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css"
import { apiRequest } from '@/lib/api';

const HeroSection = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        apiRequest('/hero-banners')
            .then((response) => setBanners(Array.isArray(response.data) ? response.data : []))
            .catch(() => setBanners([]));
    }, []);

    const heroContent = [
        {
            id: 1,
            title: "Better Nutrition for Healthier Animals",
            bg_img: "/images/about-hero.png",
            para: "Quality animal nutrition and veterinary products designed to support healthy growth, strength, vitality, and overall animal wellness."
        },
        {
            id: 2,
            title: "Complete Nutrition for Better  Animal Care",
            bg_img: "/images/cta.png",
            para: "Discover quality nutritional supplements formulated for the everyday nutritional needs of cattle, goats, poultry, pets, and other animals."
        },
        {
            id: 3,
            title: "Quality Products. Healthier Animals. ",
            bg_img: "/images/hero-3.png",
            para: "Explore Katharine Pharma's range of animal nutrition, feed supplements, vitamins, minerals, calcium supplements, and wellness products."
        },
    ]

    return (
        <>
            <div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={4}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    {(banners.length ? banners : heroContent).map((text) => {
                        const image = text.image_url || text.image || text.bg_img;
                        const isBanner = Boolean(text.image_url || text.image);
                        const slide = <div className={isBanner ? "relative min-h-[420px] w-full overflow-hidden bg-slate-100 md:min-h-[520px] lg:min-h-[600px]" : "flex items-center py-10 bg-center linear-gradient(to right, #daf1e0c7, #daf1e0c7) lg:linear-gradient(to right, #daf1e0, #02231100) lg:py-20 lg:pb-20 pb-13 lg:px-15 md:px-5 px-4"} style={isBanner ? undefined : { backgroundImage: `linear-gradient(to right, #daf1e0, #02231100), url("${image}")` }}>
                            {isBanner ? <img src={image} alt={text.alt_text || "Katharine Pharma banner"} className="absolute inset-0 h-full w-full object-cover" /> : null}
                            {!isBanner && <div className="xl:w-1/2 lg:w-4/6">
                                <h2 className='font-bold xl:text-6xl text-3xl lg:text-5xl xl:leading-17 text-[#0c213c] my-3.5'>{text.title}</h2>
                                <p className='md:text-[18px]'>{text.para}</p>
                                <div className="flex text-center mt-4">
                                    <div className="w-1/4 text-center"><div className='flex items-center justify-center md:h-20 md:w-20 h-13 w-13 rounded-full bg-white m-auto'><AiFillSafetyCertificate className='md:text-5xl text-2xl text-[#0c213c]' /></div><h5 className='font-semibold mt-2 text-[#0c213c] md:text-[17px] text-[12px]'>Quality Products</h5></div>
                                    <div className="w-1/4"><div className='flex items-center justify-center md:h-20 md:w-20 h-13 w-13 rounded-full bg-white m-auto'><RiBox3Line className='md:text-5xl text-2xl text-[#0c213c]' /></div><h5 className='font-semibold mt-2 text-[#0c213c] md:text-[17px] text-[12px]'>Wide Product Range</h5></div>
                                    <div className="w-1/4"><div className='flex items-center justify-center md:h-20 md:w-20 h-13 w-13 rounded-full bg-white m-auto'><FaCartArrowDown className='md:text-5xl text-2xl text-[#0c213c]' /></div><h5 className='font-semibold mt-2 text-[#0c213c] md:text-[17px] text-[12px]'>Easy Online Shopping</h5></div>
                                    <div className="w-1/4"><div className='flex items-center justify-center md:h-20 md:w-20 h-13 w-13 rounded-full bg-white m-auto'><PiTruckFill className='md:text-5xl text-2xl text-[#0c213c]' /></div><h5 className='font-semibold mt-2 text-[#0c213c] md:text-[17px] text-[12px]'>Pan India Delivery</h5></div>
                                </div>
                                <Button href={"/shop"} className='classes mt-6'><span>Shop Now</span> <i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i></Button>
                            </div>}
                        </div>;
                        return (
                            <SwiperSlide key={text.id}>
                                {isBanner && text.destination_url ? <a href={text.destination_url} className="block">{slide}</a> : slide}
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    )
}

export default HeroSection;
