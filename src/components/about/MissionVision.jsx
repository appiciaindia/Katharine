import React from 'react';

const MissionVision = () => {
    return (
        <div className='px-3 lg:px-10 md:px-6 grid lg:grid-cols-2 gap-5 mb-10 lg:mb-20 md:mb-14'>
            <div className="p-5 bg-amber-500 text-white rounded-2xl">
                <img src="images/mission.png" alt="Our Mission" className='w-20'/>
                <h4 className='text-2xl md:text-3xl font-bold my-3'>Our Mission</h4>
                <h5 className='text-xl md:text-2xl font-bold
                mb-3'>Making Better Animal Nutrition Accessible</h5>
                <span>Our mission is to make animal nutrition and veterinary products easier to discover, understand, and purchase.</span>
                <ul>
                    <li>Offering a diverse range of animal nutrition products</li>
                    <li>Providing clear and useful product information</li>
                    <li>Creating a simple online shopping experience</li>
                    <li>Supporting customers with product and order enquiries</li>
                </ul>
            </div>
            <div className="p-5 bg-[#0c213c] text-white rounded-2xl">
                <img src="images/vision.png" alt="Our Mission" className='w-20' />
                <h4 className='text-2xl md:text-3xl font-bold my-3'>Our Vision</h4>
                <h5 className='text-xl md:text-2xl font-bold
                mb-3'>Building a Trusted Animal Nutrition Brand</h5>
                <p className='mb-3'>Our vision is to build a trusted platform for animal nutrition and wellness products by combining quality-focused products, convenient shopping, useful information, and customer-oriented service.</p>
                <p>We aim to create a platform that serves both individual customers and businesses looking for reliable animal nutrition solutions.</p>
            </div>
        </div>
    )
}

export default MissionVision;
