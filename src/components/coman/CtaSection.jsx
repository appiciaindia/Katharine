import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import Button from '../Button';

const CtaSection = ({title,subtitle, para, btntext, btnurl, btntext2, btnurl2}) => {
    return (
        <div className='p-3 lg:p-10 bg-[#0c213c] rounded-2xl text-white mx-3 lg:mx-10 md:mx-7 lg:flex items-center justify-between'>
            <div className="lg:mr-10 lg:w-2/4">
                <h2 className='lg:text-4xl md:text-3xl text-2xl font-semibold leading-12 mb-2.5'>{title}</h2>
                <h5 className='font-bold text-2xl text-fuchsia-300'>{subtitle}</h5>
                <p>{para}</p>
            </div>
            <div className="xl:w-1/4 lg:w-2/4 mt-3.5 lg:mt-0 text-center">
                <Button variant='secondary' href={btnurl} className='flex items-center mt-3 bg-amber-400!'>
                    <span>{btntext}</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
                </Button>
                <Button variant='outline' href={btnurl2} className='flex items-center mt-3 border-amber-50 '>
                    <span className='text-white'>{btntext2}</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
                </Button>
            </div>
        </div>
    )
}

export default CtaSection;
