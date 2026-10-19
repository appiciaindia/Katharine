import React from 'react';

const ManufacturingBenefits = () => {
    return (
        <div className='px-3 lg:px-10 md:px-7'>
            <div className="lg:flex items-center justify-center text-center">
                <div className="xl:w-1/2 lg:w-3/5 mb-3">
                    <h2 className='lg:text-4xl text-2xl md:text-3xl font-bold text-gray-900'>Why Consider Third-Party Manufacturing?</h2>
                    <h4 className='text-2xl font-bold text-amber-400 my-2.5'>A Flexible Business Model for Growing Brands</h4>
                    <p>Third-party manufacturing can help businesses plan their product portfolios without independently establishing a manufacturing facility.</p>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-amber-50 xl:flex text-center xl:text-left items-center border border-gray-200">
                    <img src="/icons/factory.png" alt="Factory"  className='m-auto'/>
                    <div className="ml-3">
                        <h5 className='text-xl font-bold text-gray-800'>No Need to Establish Your Own Factory</h5>
                        <p>Work through an agreed manufacturing arrangement instead of independently setting up production infrastructure.</p>
                    </div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 xl:flex text-center xl:text-left items-center border border-gray-200">
                    <img src="/images/business.png" alt="Business Development"  className='m-auto'/>
                    <div className="ml-3">
                        <h5 className='text-xl font-bold text-gray-800'>Focus on Business Development</h5>
                        <p>Concentrate on customer relationships, marketing and distribution while production is handled according to the agreed arrangement.</p>
                    </div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 xl:flex text-center xl:text-left items-center border border-gray-200">
                    <img src="/icons/earning.png" alt="Factory"  className='m-auto'/>
                    <div className="ml-3">
                        <h5 className='text-xl font-bold text-gray-800'>Planned Investment</h5>
                        <p>Evaluate manufacturing costs, order quantities and packaging expenses before placing an order.</p>
                    </div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 xl:flex text-center xl:text-left items-center border border-gray-200">
                    <img src="/icons/brand.png" alt="Brand"  className='m-auto'/>
                    <div className="ml-3">
                        <h5 className='text-xl font-bold text-gray-800'>Your Own Brand Identity</h5>
                        <p>Build your brand through agreed private-label and packaging arrangements.</p>
                    </div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 xl:flex text-center xl:text-left items-center border border-gray-200">
                    <img src="/icons/products.png" alt="Product Range" className='m-auto' />
                    <div className="ml-3">
                        <h5 className='text-xl font-bold text-gray-800'>Product Range Expansion</h5>
                        <p>Explore additional products to complement your existing animal nutrition portfolio.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManufacturingBenefits;
