import React from 'react';

const PrivateLabel = () => {
    return (
        <div className='px-3 py-5 lg:py-20 md:py-14 lg:px-10 md:px-7 lg:flex lg:items-center'>
            <div className="lg:pr-13 lg:w-1/2">
                <h2 className='text-2xl md:text-3xl xl:text-4xl font-bold my-3'>Private Label Manufacturing</h2>
                <h5 className='xl:text-2xl text-xl font-bold text-amber-400 my-2.5'>Launch Products Under Your Own Brand Name</h5>
                <p>Private-label manufacturing allows eligible businesses to introduce products under their own brand identity through an agreed manufacturing arrangement.</p>
                <p>Depending on the selected product and manufacturing partner, the process may include:</p>
                <ul className='list-disc pl-8 my-3'>
                    <li>Product selection according to your business requirements.</li>
                    <li>Brand name and packaging artwork coordination.</li>
                    <li>Selection of available packaging sizes.</li>
                    <li>Product label and specification review.</li>
                    <li>Production planning and order coordination.</li>
                    <li>Packaging and dispatch arrangements as agreed.</li>
                </ul>
                <p>Whether you are launching your first product or expanding an existing portfolio, private-label planning begins with identifying your target market, product requirements and expected order volume.</p>
            </div>
            <div className="h-full lg:w-1/2 lg:mt-0 mt-6">
                <img src="images/private-label.jpg" alt="About Us" className='rounded-2xl h-full w-full object-cover' />
            </div>
        </div>
    )
}

export default PrivateLabel;
