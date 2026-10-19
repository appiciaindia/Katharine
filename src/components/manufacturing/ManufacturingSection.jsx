import React from 'react';

const ManufacturingSection = ({ why }) => {
    const fallbackPoints = [
        { title: "Requirement-Based Consultation", description: "Discuss your product ideas, packaging preferences and expected quantities." },
        { title: "Product Range Planning", description: "Explore relevant animal nutrition product categories for your business." },
        { title: "Branding Coordination", description: "Discuss your brand name, packaging artwork and labelling requirements." },
        { title: "Transparent Order Discussions", description: "Review quotations, minimum quantities, production timelines and payment terms before confirming an order." },
    ];
    const points = Array.isArray(why?.points) ? why.points : fallbackPoints;
    return (
        <div className='px-3 lg:px-10 md:px-7 grid lg:grid-cols-2 gap-10'>
            <div className=" rounded-3xl bg-fuchsia-50 p-4 lg:p-8">
                <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold'>Quality & Regulatory Considerations</h2>
                <h3 className='lg:text-2xl text-xl font-semibold text-gray-800 my-3'>A Responsible Approach to Product Manufacturing</h3>
                <p>Product quality, documentation and regulatory compliance are important considerations when planning third-party manufacturing.</p>
                <p>Before placing an order, the product category, manufacturing facility, applicable licence requirements, labelling and quality documentation should be reviewed. Requirements can differ between veterinary medicines, animal feed supplements and other nutritional products.</p>
                <p>The manufacturing partner and brand owner should agree on the applicable specifications, testing responsibilities, batch documentation, packaging information and other statutory obligations before production begins.</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-4 lg:p-8">
                <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold'>{why?.title ?? "Why Choose Katharine Pharma?"}</h2>
                <h3 className='lg:text-2xl text-xl font-semibold text-gray-800 my-3'>{why?.subtitle ?? "A Business-Focused Approach to Manufacturing Enquiries"}</h3>
                <p>{why?.description ?? "Katharine Pharma aims to make third-party manufacturing enquiries easier to understand through a structured, requirement-focused approach."}</p>
                <ul className='pl-7 list-disc'>
                    {points.map((point, index) => <li key={`${index}-${point.title}`}><b>{point.title}: </b><span>{point.description}</span></li>)}
                    
                </ul>
            </div>
        </div>
    )
}

export default ManufacturingSection;
