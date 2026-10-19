import React from 'react';

const BenefitSection = ({ title, para, subtitle, bsdata }) => {
    return (
        <div className='px-3 md:px-8 lg:px-14 pt-10 md:pt-14 lg:pt-20'>
            <div className="flex items-center justify-center">
                <div className="lg:w-3/4 mb-5 text-center">
                    {subtitle && (
                        <h4 className='md:text-2xl text-xl font-semibold text-amber-300'>{subtitle}</h4>
                    )}
                    <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl mb-2'>{title}</h2>
                    <p>{para}</p>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                    {
                        bsdata.map((item, index)=>{
                            return(
                                <div className="p-3 lg:p-5 rounded-2xl bg-blue-100 lg:flex items-center" key={index}>
                                    <img src={item.img} alt={item.title} />
                                    <div className="lg:ml-4 mt-3 lg:mt-0">
                                        <h5 className='text-xl font-semibold text-gray-800'>{item.title}</h5>
                                        <p>{item.para}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default BenefitSection;
