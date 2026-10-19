 "use client"
import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/navigation";
import "swiper/css"

const AnimalNutritionDivisions = () => {

    const AnimalDivisions = [
        {
            id: 1,
            name: "Cattle Products",
            title: "Cattle Nutrition & Supplements",
            img: "/images/cattle-products.png",
            para: "Explore our range of cattle nutrition products designed to complement the daily diet and nutritional requirements of cattle. Choose from different supplement categories and formats for convenient animal care.",
            button: "Explore Cattle Products",
            link: "/products/cattle"
        },
        {
            id: 2,
            name: "Goat Products",
            title: "Goat Nutrition & Supplements",
            img: "/images/goat-products.png",
            para: "Discover nutritional and wellness products for goats, including supplements designed to complement their everyday dietary requirements and overall nutritional care.",
            button: "Explore Goat Products",
            link: "/products/goat"
        },
        {
            id: 3,
            name: "Poultry Products",
            title: "Poultry Nutrition & Feed Supplements",
            img: "/images/poultry-products.png",
            para: "Explore our range of poultry nutrition and feed supplement products designed to complement regular feeding routines and support everyday nutritional management.",
            button: "Explore Poultry Products",
            link: "/products/poultry"
        },
        {
            id: 4,
            name: "Dog Products",
            title: "Dog Nutrition & Wellness",
            img: "/images/dog-products.png",
            para: "Find selected nutritional and wellness products for dogs to complement their everyday dietary needs and support convenient pet care.",
            button: "Explore Dog Products",
            link: "/products/dog"
        },
        {
            id: 5,
            name: "Cat Products",
            title: "Cat Nutrition & Wellness",
            img: "/images/cat-products.png",
            para: "Discover selected nutrition and wellness products for cats, making everyday nutritional care simple and convenient for pet owners.",
            button: "Explore Cat Products",
            link: "/products/cat"
        }
    ];

    return (
        <div className='lg:px-10 md:px-6 px-3 lg:py-20 md:py-14 py-10 bg-[#0c213c]'>
            <div className="grid xl:grid-cols-2 gap-10 bg-[#eee] rounded-2xl lg:p-7 md:p-5 p-3">
                <div>
                    <h2 className='font-bold lg:text-4xl md:text-3xl text-2xl mb-3'>Complete Nutrition for Different Animal Needs</h2>
                    <p>Katharine Pharma offers a range of animal nutrition and wellness products designed to complement the everyday nutritional requirements of different animals. Our product range covers cattle, goats, poultry, dogs, cats, and other animal-care needs, making it easier to explore suitable nutritional products in one place.</p>
                    <p>Our range includes mineral supplements, calcium supplements, vitamin supplements, liver tonics, feed supplements, digestive supplements, immunity support products, and other animal wellness products available in different convenient formats.</p>
                    <p>Every animal has different nutritional requirements depending on its age, diet, activity, and stage of life. Our animal-wise product divisions help customers easily discover products according to their specific animal category and nutritional needs.</p>
                </div>
                <div className="h-full">
                    <img src="images/cta-1.png" alt="Animal Nutrition" />
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
             className='mt-7'>
                {
                    AnimalDivisions.map((text) => {
                        return (
                            <SwiperSlide key={text.id}>
                                <div className='rounded-2xl bg-[#eee] mt-3' >
                                    <img src={text.img} alt={text.name} className='borde rounded-t-2xl h-50 w-full object-cover' />
                                    <div className="text p-3">
                                        <h5 className='font-bold text-xl'>{text.name}</h5>
                                        <p>{text.para}</p>
                                        <Button href={text.link} className='mt-5'>{text.button}</Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default AnimalNutritionDivisions;
