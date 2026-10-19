import React from 'react';
import Button from '../Button';
import { FiArrowUpRight } from "react-icons/fi";
import { FaGift, FaTruckMoving} from "react-icons/fa";

const OfferBanner = () => {
    return (
        <div className='px-3 lg:px-12.5 md:px-5 py-10 lg:py-18 md:py-13 grid md:grid-cols-2 gap-5'>
            <div className="xl:flex items-end justify-center py-8 px-5 rounded-xl bg-emerald-100">
                <div className="xl:w-1/2">
                    <Button type='button' variant='outline' className='flex items-center border-b-fuchsia-500' >
                        <span>Welcome Offer</span><FaGift className='mx-2' />
                    </Button>
                    <h4 className='lg:text-[35px] text-2xl font-bold capitalize lg:leading-11 leading-9 lg:my-2.5 my-1.5'>Get <span className='text-[#0c213c]'>10% OFF</span> on my first order</h4>
                    <p className='lg:text-xl md:text-[14px] text-[15px] text-gray-700'>Premium Animal Health & Nutrition Products</p>
                    <Button href={"/products"} className='flex mt-5'>
                        <span>Shop Now</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
                    </Button>
                </div>
                <div className="xl:w-1/2">
                    <img src="images/cta-1.png" alt="Katharine Pharma" className='xl:h-full md:h-50'/>
                </div>
            </div>
            <div className="xl:flex items-end justify-center pt-8 px-5 rounded-xl bg-fuchsia-300">
                <div className="xl:w-1/2 pb-8">
                    <Button type='button' variant='outline' className='flex items-center' >
                        <span>Pan India</span><FaTruckMoving className='mx-2' />
                    </Button>
                    <h4 className='lg:text-[35px] text-2xl font-bold capitalize lg:leading-11 leading-9 lg:my-2.5 my-1.5'>Free Delivery on Orders <span className='text-[#0c213c]'>Over ₹5000</span></h4>
                    <p className='lg:text-xl md:text-[14px] text-[15px] text-gray-700'>Get your favorite veterinary and animal nutrition products delivered anywhere in India.</p>
                    <Button href={"/products"} className='flex mt-5 bg-amber-600'>
                        <span>Shop Now</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
                    </Button>
                </div>
                <div className="xl:w-1/2">
                    <img src="images/hero-img.png" alt="Katharine Pharma" className='xl:h-full md:h-50'/>
                </div>
            </div>
        </div>
    )
}

export default OfferBanner;
