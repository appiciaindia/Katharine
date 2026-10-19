import React from 'react';
import Button from '../Button';
import { GoArrowRight } from "react-icons/go";
import { BsFillLeafFill } from "react-icons/bs";
import { SiWhatsapp } from 'react-icons/si';


const CtaSection = () => {
    return (
        <div className='my-5 lg:my-18 mx-2 lg:mx-12.5 md:mx-5'>
            <div className=' p-6 lg:p-12 md:p-10  rounded-3xl bg-[linear-gradient(transparent,#dbcbcbe3),url(/images/cta.png)] lg:bg-[url(/images/cta.png)] bg-cover bg-center '>
                <div className="flex">
                    <div className="lg:w-1/2 w-full">
                        <Button variant='outline' className='flex items-center '>
                            <BsFillLeafFill className='mr-2' />   <span className='md:text-[16px] text-[15px]'>Better Nutrition. Healthier Tomorrow.</span>
                        </Button>
                        <h2 className='font-bold xl:text-5xl lg:text-4xl md:text-3xl text-[27px] leading-9 xl:leading-14 my-4'>Give Them a <br /> <span className='text-[#f2971b]'>Healthier, Happier Life</span></h2>
                        <p className='text-[18px] lg:text-black'>Discover our premium animal nutrition products, specially formulated for better health, stronger growth, and a brighter tomorrow.</p>
                        <div className="md:flex items-center mt-5">
                            <Button href={"/products"} className='flex items-center'>
                                <span>Shop Now</span><GoArrowRight className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl' />
                            </Button>
                            <Button variant='outline' target='_blank' href={"https://wa.me/916350646120"} className='md:ml-3 md:mt-0 mt-7'>
                                <span>WhatsApp Chat</span><SiWhatsapp className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-emerald-600 text-white text-xl' />
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/3 w-0"></div>
                </div>
            </div>
        </div>
    )
}

export default CtaSection;
