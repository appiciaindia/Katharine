import React from 'react';
import Button from '../Button';
import { FiArrowUpRight } from 'react-icons/fi';

const BusinessSolutions = () => {

    const BusinessSolution = [
        {
            id: 1,
            name: "Franchise Business",
            img: "/images/franchise-business.png",
            para: "Join Katharine Pharma as a franchise partner and build your business with our animal nutrition and veterinary products.",
            button: "Learn More",
            link: "/franchise"
        },
        {
            id: 2,
            name: "Third-Party Manufacturing",
            img: "/images/third-party-manufacturing.png",
            para: "Get quality animal nutrition products manufactured for your own brand and business requirements.",
            button: "Learn More",
            link: "/third-party-manufacturing"
        },
        {
            id: 3,
            name: "Katharine Online Store",
            img: "/images/katharine-online-store.png",
            para: "Shop animal nutrition and veterinary products conveniently through our online store.",
            button: "Shop Now",
            link: "/shop"
        },
        {
            id: 4,
            name: "Become a Distributor",
            img: "/images/become-a-distributor.png",
            para: "Partner with Katharine Pharma and bring our animal nutrition products to your local market.",
            button: "Learn More",
            link: "/become-a-distributor"
        }
    ];

    return (
        <div className='px-3 lg:px-10 md:px-6 py-10 lg:py-20 md:py-14'>
            <div className="flex">
                <div className="md:w-1/2">
                    <h2 className='font-bold text-2xl lg:text-4xl md:text-3xl lg:mb-5 mb-3'>Our Business Solutions</h2>
                    <p>Explore business opportunities and services with Katharine Pharma.</p>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                {BusinessSolution.map((item) => {
                    return (
                        <div className="rounded-2xl bg-[#eee] mt-3.5" key={item.id}>
                            <img src={item.img} alt={item.name} className='h-50 w-full object-cover rounded-t-2xl'/>
                            <div className="p-3">
                                <h5 className='font-bold xl:text-xl  mb-2.5'>{item.name}</h5>
                                <p>{item.para}</p>
                                <Button href={item.link} className='mt-4'><span>{item.button}</span> <i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i></Button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default BusinessSolutions;
