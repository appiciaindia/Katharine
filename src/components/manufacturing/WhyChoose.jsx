import React from 'react';

const WhyChoose = ({ title, whyList = [] }) => {
    return (
        <div className=''>
            <h2 className='font-bold text-xl md:text-3xl lg:text-4xl mb-3'>{title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {whyList.map((item, index) => {
                    return (
                        <div className="text-center bg-blue-100 rounded-2xl p-4" key={index}>
                            <img src={item.img} alt={item.title} className='m-auto' />
                            <div className="mt-2">
                                <h4 className='text-xl font-bold'>{item.title}</h4>
                                {item.subtitle && <p className="mt-1 text-sm text-slate-700">{item.subtitle}</p>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WhyChoose;
