import React from 'react'
import Button from '../Button'
import { FiArrowUpRight } from 'react-icons/fi'

const HeroSection = ({ title, title2, para, tagline, btnUrl, btntext, btn2url, btn2text, heroImg }) => {
    return (
        <div className='lg:px-10 md:px-7 md:text-left text-center relative px-4 py-10 md:py-14 lg:py-20  lg:bg-[linear-gradient(to_right,#fbfbfbd1,#00000099))] bg-[linear-gradient(to_right,#fbfbfbd1,#bbaaaae3)] bg-cover flex'>
        <div className="hero-overlay">
            <img src={heroImg} alt="Hero Image" className='w-full h-full object-cover absolute top-0 left-0 z-[-1]' />
        </div>
            <div className="lg:w-1/2">
                {tagline && (
                    <span className='font-semibold text-[13px] text-emerald-400 p-2 bg-amber-50 rounded-[5px] text-uppercase'>{tagline}</span>
                )}
                <h2 className='text-xl md:text-3xl xl:text-5xl xl:leading-14 lg:text-4xl font-bold mt-3'>{title}</h2>
                {title2 && (
                    <h4 className='text-[17px] lg:text-2xl md:text-xl my-1 text-amber-300 font-semibold'>{title2}</h4>
                )}
                <p className="mt-3">{para}</p>
                <div className="flex flex-wrap items-center mt-6 md:justify-normal justify-center">
                    <Button href={btnUrl} className='flex items-center'><span>{btntext}</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i></Button>
                    {btn2url && (
                        <Button variant='secondary' href={btn2url} className='flex items-center ml-3 sm:mt-0 mt-3'><span>{btn2text}</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i></Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeroSection
