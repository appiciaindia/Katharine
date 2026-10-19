"use client"

import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ProductsListFaq = ({ title, faqs }) => {

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className='rounded-2xl bg-fuchsia-100 md:p-7 p-4 lg:ml-8 mt-7 lg:mt-0'>
            <h2 className='font-bold text-xl md:text-2xl lg:text-3xl mb-4.5'>{title}</h2>
            <div className="">
                {faqs.map((item, index) => {
                    const openFaq = activeIndex === index;
                    return (
                        <div key={index} className='border my-4 md:mx-3  min-h-9 border-gray-400 rounded-xl shadow-gray-500 '>
                            <h3 className={`rounded-xl py-2 px-3 text-xl flex justify-between self-start h-fit ${openFaq ? "bg-white":""}`} onClick={() => setActiveIndex(openFaq ? null : index)} aria-expanded={openFaq}><b className={`pr-2 ${openFaq ? "text-[#0c213c] bg-white":""}`}>{item.question}</b> <span>
                                {openFaq ? <i className='text-[18px] cursor-pointer'><FaMinus/></i> : <i className='text-[18px] cursor-pointer'><FaPlus /></i> }
                            </span></h3>
                            {openFaq && (
                                <p className='py-2 px-3'>{item.answer}</p>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductsListFaq;
