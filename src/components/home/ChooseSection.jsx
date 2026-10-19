import React from 'react' ;

const ChooseSection = () => {
    return (
        <div className='lg:px-10 md:px-6 px-3 lg:py-20 md:py-14 py-10 bg-[#eee]'>
        <div className="flex justify-center">
            <div className="lg:w-3/5 text-center xl:mb-8 lg:mb-5 md:mb-3">
                <span className='px-4 py-2.5 rounded-3xl border border-amber-300 text-amber-300'>Why Choose Us</span>
                <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold my-3'>Your Trusted Destination for Animal Nutrition</h2>
                <p>At Katharine Pharma, we aim to make quality animal nutrition and wellness products easier to discover, understand, and purchase through a convenient online shopping experience.</p>
            </div>
        </div>
            <div className="lg:flex items-center justify-between">
                <div className="xl:w-1/3 lg:w-2/5 md:w-full">
                    <div className="flex items-center my-5 lg:my-8">
                        <div className="flex items-center justify-center md:h-30 md:w-30 h-20 w-20 rounded-xl bg-white">
                            <img src="images/ch1.png" alt="Quality-Focused Products" />
                        </div>
                        <div className="flex-1 ml-3.5">
                            <h5 className='font-bold md:text-xl text-[18px]'>Quality-Focused Products</h5>
                            <p>We focus on offering animal nutrition and wellness products selected with attention to quality and everyday nutritional requirements.</p>
                        </div>
                    </div>
                    <div className="flex items-center my-5 lg:my-8">
                        <div className="flex items-center justify-center md:h-30 md:w-30 h-20 w-20 rounded-xl bg-white">
                            <img src="images/ch2.png" alt="Products for Different Animals" />
                        </div>
                        <div className="flex-1 ml-3.5">
                            <h5 className='font-bold md:text-xl text-[18px]'>Products for Different Animals</h5>
                            <p>Explore products across multiple animal categories, including cattle, goats, poultry, dogs, and cats.</p>
                        </div>
                    </div>
                </div>
                <div className="h-full xl:w-1/3 px-6 lg:w-1/5">
                    <img src="images/choose.png" alt="Why Choose" className='rounded-3xl'/>
                </div>
                <div className=" xl:w-1/3 lg:w-2/5 md:w-full">
                    <div className="flex items-center my-5 lg:my-8">
                        <div className="flex items-center justify-center md:h-30 md:w-30 h-20 w-20 rounded-xl bg-white">
                            <img src="images/ch3.png" alt="Wide Product Range" />
                        </div>
                        <div className="flex-1 ml-3.5">
                            <h5 className='font-bold md:text-xl text-[18px]'>Wide Product Range</h5>
                            <p>From mineral and calcium supplements to vitamins, liver tonics, feed and digestive supplements, find different nutritional solutions in one place.</p>
                        </div>
                    </div>
                    <div className="flex items-center my-5 lg:my-8">
                        <div className="flex items-center justify-center md:h-30 md:w-30 h-20 w-20 rounded-xl bg-white">
                            <img src="images/ch4.png" alt="Convenient Delivery" />
                        </div>
                        <div className="flex-1 ml-3.5 ">
                            <h5 className='font-bold md:text-xl text-[18px]'>Convenient Delivery</h5>
                            <p>Get your selected products delivered conveniently to your doorstep across India.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseSection ;
