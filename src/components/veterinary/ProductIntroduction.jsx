import React from 'react';

const ProductIntroduction = ({ title, subtitle, img, para }) => {
    return (
        <div className='px-3 md:px-8 lg:px-14 pt-10 md:pt-14 lg:pt-20'>
            <div className='lg:flex items-center'>
                <div className="lg:w-1/2 ">
                    <img src={img} alt={subtitle} className='rounded-3xl lg:w-[80%]' />
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <span className='font-semibold text-[18px] text-[#0c213c]'>{subtitle}</span>
                    <h2 className='font-bold lg:leading-12 my-2.5 lg:text-4xl md:text-3xl text-2xl'>{title}</h2>
                    {(Array.isArray(para) ? para : []).map((item, index) => {
                        return (
                            <p key={index} className='text-[17px] mb-2'>{item}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductIntroduction;
