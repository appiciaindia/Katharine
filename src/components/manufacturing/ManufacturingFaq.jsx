"use client";

import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";


const ManufacturingFaq = ({ title, items }) => {

    const [activeIndex, setActiveIndex] = useState(0)

    const defaultFaqs = [
        {
            question: "What is third-party manufacturing?",
            answer:
                "Third-party manufacturing is a business arrangement in which a company gets products manufactured by another manufacturer under its own brand name."
        },
        {
            question: "Which products are available for third-party manufacturing?",
            answer:
                "Product availability may include calcium supplements, mineral supplements, vitamin supplements, liver tonics, feed supplements and other animal nutrition products, subject to manufacturing capabilities."
        },
        {
            question: "Can I manufacture products under my own brand name?",
            answer:
                "Own-brand manufacturing may be available depending on product feasibility, packaging requirements and applicable regulatory conditions."
        },
        {
            question: "What is the minimum order quantity (MOQ)?",
            answer:
                "The minimum order quantity depends on the product, formulation, packaging type and manufacturing requirements. Contact our team for product-specific details."
        },
        {
            question: "Can I customise the product formulation?",
            answer:
                "Custom formulation requests can be discussed during the initial enquiry. Feasibility depends on the product category, technical requirements and applicable regulations."
        },
        {
            question: "How long does the manufacturing process take?",
            answer:
                "The manufacturing timeline depends on the product, order quantity, packaging and regulatory requirements. The estimated timeline can be shared after reviewing your requirements."
        },
        {
            question: "Do you provide packaging and labelling?",
            answer:
                "Packaging and labelling options can be discussed based on the product, brand requirements and applicable labelling regulations."
        },
        {
            question: "How can I request a manufacturing quotation?",
            answer:
                "You can submit the enquiry form with your contact details, product requirements, packaging preferences and estimated order quantity. Our team can review the details and respond."
        }
    ];
    // Only use legacy FAQs when no FAQ content has been saved for this page.
    const faqs = Array.isArray(items) ? items : defaultFaqs;

    return (
        <div className='pb-10 lg:pb-20 md:pb-14 px-1 md:px-7 lg:px-10'>
            <div className="lg:flex items-center justify-center mb-4">
                <div className="lg:w-1/2 text-center">
                    <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold'>{title ?? "Third-Party Manufacturing Pharma FAQs"}</h2>
                </div>
            </div>
            <div className="columns-1 lg:columns-2 gap-4">
                {faqs.map((item, index) => {
                    const openFaq = activeIndex === index;
                    return (
                        <div key={index} className=' border my-2 md:mx-3 mx-2 min-h-9 border-gray-400 rounded-xl shadow-gray-500 py-2 px-3'>
                            <h3 className='text-xl lg:text-2xl flex justify-between self-start h-fit' onClick={() => setActiveIndex(openFaq ? null : index)} aria-expanded={openFaq}><b className='pr-2'>{item.question}</b> <span>
                                {openFaq ? <FaMinus /> : <FaPlus />}
                            </span></h3>
                            {openFaq && (
                                <p>{item.answer}</p>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ManufacturingFaq;
