import React from 'react';

const Become = ({ title, subtitle, para, bsdata }) => {
    return (
        <div className='rounded-xl p-4 bg-emerald-100'>
            <h2 className='font-bold text-2xl lg:text-3xl'>{title}</h2>
            <h4 className='text-xl font-bold text-amber-400 lg:text-2xl my-3'>{subtitle}</h4>
            <p>{para}</p>
            <div>
                {bsdata.map((item, index) => {
                    return (
                        <div className="p-3 bg-white rounded-xl mt-2.5" key={index}>
                            <h5 className='font-bold'>{item.title}</h5>
                            <p>{item.para}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Become;