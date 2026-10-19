import React from 'react'
import Button from '../Button'
import { FiArrowUpRight } from 'react-icons/fi'

const ProductHero = ({ title, subTitle, buttonText, btnUrl, heroImg, tagline }) => {
    return (
        <div className='lg:py-15 md:py-10 py-7 px-3 md:px-5 lg:px-10 bg-gray-200'>
            <div className="lg:flex items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <span className='text-[#0c213c] font-medium text-[18px]'>{tagline}</span>
                    <h2 className='font-bold lg:leading-12 my-2.5 lg:text-4xl md:text-3xl text-2xl'>{title}</h2>
                    <p>{subTitle}</p>
                    <Button href={btnUrl} className='lg:mt-7 mt-5 flex items-center'>
                        <span>{buttonText}</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
                    </Button>
                </div>
                <div className="lg:w-1/2">
                    <img src={heroImg} alt={tagline} className='rounded-2xl lg:w-[80%] m-auto' />
                </div>
            </div>
        </div>
    )
}

export default ProductHero
