import React from 'react';

const ProductForms = ({
    title = "Choose the Right Supplement Form",
    description = "Explore animal nutrition and wellness products available in convenient formats to suit different nutritional and feeding requirements.",
}) => {

    const ProductForm = [
        {
            id: 1,
            name: "Bolus / Tablet Supplements",
            img: "/images/bolus-table.png",
            para: "Convenient supplement formats designed to provide targeted nutritional support as part of everyday animal care."
        },
        {
            id: 2,
            name: "Gel Supplements",
            img: "/images/gel-supplements.png",
            para: "Easy-to-use gel supplements designed to complement daily nutrition and provide convenient nutritional support."
        },
        {
            id: 3,
            name: "Powder Supplements",
            img: "/images/powder-supplements.png",
            para: "Powder-form nutritional supplements that can be conveniently incorporated into regular feed or feeding routines."
        },
        {
            id: 4,
            name: "Liquid Supplements",
            img: "/images/liquid-supplements.png",
            para: "Liquid nutritional supplements designed for convenient administration and everyday animal nutritional care."
        },
        {
            id: 5,
            name: "Granules Supplements",
            img: "/images/granules-feed-supplements.png",
            para: "Granule-form supplements designed to complement regular animal feed and support everyday nutritional needs."
        }
    ];

    return (
        <div className='py-10 lg:py-20 md:py-15 lg:px-10 md:px-6 px-3'>
            <div className=" mb-5">
                <div className="lg:w-1/2">
                    <span className='px-4 py-2.5 rounded-3xl border border-amber-300 text-amber-300'>Our Product Forms</span>
                    <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold my-4 mb-2'>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-2">
                {ProductForm.map((text) => {
                    return (
                        <div className='mt-3 rounded-2xl p-5 border-amber-100 border shadow-amber-100 bg-white' key={text.id}>
                            <img src={text.img} alt={text.name} className='rounded-2xl' />
                            <h5 className='font-bold text-xl mt-3'>{text.name}</h5>
                            <p>{text.para}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductForms;
