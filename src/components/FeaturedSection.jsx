import React from 'react';

const FeaturedSection = () => {
    return (
        <div className='py-8 px-3 lg:py-15 lg:px-10'>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="md:flex md:text-left text-center md:p-5 items-center rounded-xl bg-emerald-100 p-2.5">
                    <img src="images/fea1.png" className='md:w-15 m-auto' alt="Reliable Delivery" />
                    <div className="flex-1 md:ml-2.5 md:mt-0 mt-3.5">
                        <h5 className='md:font-bold font-semibold text-[15px] md:text-xl'>Fast & Reliable Delivery</h5>
                        <span className='text-gray-700'>Delivered safely to your doorstep</span>
                    </div>
                </div>
                <div className="md:flex md:text-left text-center md:p-5 items-center rounded-xl bg-amber-100 p-2.5">
                    <img src="images/fea2.png" className='md:w-15 m-auto' alt="Reliable Delivery" />
                    <div className="flex-1 md:ml-2.5 md:mt-0 mt-3.5">
                        <h5 className='md:font-bold font-semibold text-[15px] md:text-xl'>Best Prices & Offers</h5>
                        <span className='text-gray-700'>Great deals on every order</span>
                    </div>
                </div>
                <div className="md:flex md:text-left text-center md:p-5 items-center rounded-xl bg-fuchsia-100 p-2.5">
                    <img src="images/fea3.png" className='md:w-15 m-auto' alt="Reliable Delivery" />
                    <div className="flex-1 md:ml-2.5 md:mt-0 mt-3.5">
                        <h5 className='md:font-bold font-semibold text-[15px] md:text-xl'>Easy Returns</h5>
                        <span className='text-gray-700'>Hassle-free return policy</span>
                    </div>
                </div>
                <div className="md:flex  md:text-left text-center md:p-5 items-center rounded-xl bg-blue-100 p-2.5">
                    <img src="images/fea4.png" className='md:w-15 m-auto' alt="Reliable Delivery" />
                    <div className="flex-1 md:ml-2.5 md:mt-0 mt-3.5">
                        <h5 className='md:font-bold font-semibold text-[15px] md:text-[18px]'>Premium Quality Products</h5>
                        <span className='text-gray-700'>Trusted nutrition for better health</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedSection;
