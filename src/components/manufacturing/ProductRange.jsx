import React from 'react';

const ProductRange = () => {
    return (
        <div className='px-3 py-5 lg:py-10 md:py-6 lg:px-10 md:px-7 lg:mx-20 mx-3 md:mx-6  bg-gray-200 rounded-3xl'>
            <h2 className='lg:text-4xl text-2xl md:text-3xl font-bold'>What Is Third-Party Manufacturing?</h2>
            <h4 className='font-bold lg:text-2xl text-gray-900 text-xl my-3.5'>Build Your Own Brand Without Setting Up a Factory</h4>
            <p className='text-[17px]'>Third-party manufacturing, also known as contract manufacturing, is a business arrangement in which a manufacturer produces products for another company under an agreed brand name and commercial arrangement.</p>
            <p className='text-[17px]' >In this model, the brand owner focuses on branding, marketing, sales and distribution, while the manufacturing partner undertakes the agreed production and packaging responsibilities
            For businesses entering the veterinary and animal nutrition market, this model can provide an alternative to investing in their own manufacturing infrastructure.</p>
            <div className="grid md:grid-cols-2 gap-10 mt-5">
                <div className=" rounded-xl border border-emerald-600 p-4 lg:flex items-center">
                    <img src="/images/business.png" alt="Business" />
                    <div className="lg:ml-5 lg:mt-0 mt-2.5">
                        <h5 className='font-semibold text-2xl text-gray-900 my-1'>Your Business</h5>
                    <p>Brand identity, marketing, sales strategy and distribution.</p>
                    </div>
                </div>
                <div className=" rounded-xl border border-b-gray-900 p-4 lg:flex items-center">
                    <img src="/images/manufacturing.png" alt="Manufacturing" />
                    <div className="lg:ml-5 lg:mt-0 mt-2.5">
                        <h5 className='font-semibold text-2xl text-gray-900 my-1'>Manufacturing Partner</h5>
                    <p>Agreed product production, packaging and associated documentation.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductRange;
