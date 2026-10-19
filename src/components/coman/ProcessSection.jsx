import React from 'react' ;

const ProcessSection = ({ title, para, psData }) => {
    return (
        <div className='lg:px-10 md:px-7 relative px-4 py-10 md:py-14 lg:py-20 bg-emerald-100'>
            <div className="flex justify-center text-center mb-6">
                <div className="lg:w-1/2">
                    <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl'>{title}</h2>
                    {para && (
                        <p>{para}</p>
                    )}
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {psData.map((item, index) => {
                    return (
                        <div className='rounded-xl p-4 bg-white text-center' key={index}>
                            <div className="flex justify-center items-center rounded-full bg-gray-600 text-white m-auto h-18 w-18 font-bold text-3xl">
                                {index + 1}
                            </div>
                            <h5 className='font-bold text-xl my-3'>{item.title}</h5>
                            <p>{item.para}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProcessSection ;
