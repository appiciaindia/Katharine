import React from 'react';
import Button from '../Button';
import { FiArrowUpRight } from 'react-icons/fi';

const AboutHero = ({ title, heading, para, bannerBtn="" }) => {

    // if (!bannerBtn) return null;

    return (
        <div className='flex items-center lg:p-15 md:p-10 px-3 py-10 bg-[linear-gradient(to_right,#eeeaea,#0000004f),url(/images/about-hero.png)]'>
            <div className='xl:w-1/2 lg:w-3/5'>
                <span className='border border-[#0c213c] text-[#0c213c] font-medium rounded-3xl px-5 py-2.5'>{title}</span>
                <h1 className='text-2xl lg:text-4xl md:text-3xl font-bold my-2.5 lg:my-4'>{heading}</h1>
                <p>{para}</p>
                {bannerBtn === "true" && (
                    <Button href={"/products"} className='mt-5 border-'>
                    <span>Our Products</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
                </Button>
                )}
            </div>
        </div>
    )
}

export default AboutHero;
