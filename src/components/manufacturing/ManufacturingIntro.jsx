import React from 'react';

const ManufacturingIntro = ({ title, paragraphs }) => {
    const fallbackParagraphs = [
        "Third-party manufacturing provides businesses with an opportunity to introduce veterinary and animal nutrition products under their own brand without setting up their own manufacturing facility.",
        "Katharine Pharma offers a business-oriented approach to third-party manufacturing enquiries for companies, distributors, entrepreneurs and businesses looking to develop their own product portfolio.",
        "Whether you are planning to introduce a new animal nutrition brand or expand your existing product range, the right manufacturing arrangement can help you plan production, packaging and product availability according to your business requirements.",
        "Our aim is to make the enquiry and product planning process straightforward, with a focus on understanding your product specifications, packaging preferences and expected order quantities.",
    ];
    // Keep the legacy copy only for pages that have never saved intro content.
    // An intentionally empty or edited array must not be replaced by defaults.
    const introParagraphs = Array.isArray(paragraphs) ? paragraphs : fallbackParagraphs;
    return (
        <section className='px-3 py-8 lg:py-16 md:py-12 lg:px-10 md:px-7'>
            <div className="mx-auto max-w-5xl">
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold my-3'>{title ?? "Veterinary Third Party Manufacturing in India"}</h2>
                <div className="space-y-3 text-slate-700">{introParagraphs.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}</div>
            </div>
        </section>
    )
}

export default ManufacturingIntro;
