import React from 'react';
import Button from '../Button';
import { FiArrowUpRight } from 'react-icons/fi';

const ManufacturingCTA = () => {
    return (
        <div className='p-3 lg:p-10 bg-[#0c213c] rounded-2xl text-white mx-3 my-5 lg:my-20 md:my-14 lg:mx-10 md:mx-7 lg:flex items-center justify-between'>
             <div className="lg:mr-10 lg:w-2/4">
                <h2 className='lg:text-4xl md:text-3xl text-2xl font-semibold leading-12 mb-2.5'>Start Planning Your Own Veterinary Product Brand</h2>
                <p>Explore third-party manufacturing opportunities for veterinary and animal nutrition products with Katharine Pharma. Share your requirements to discuss product options, packaging and order planning.</p>
            </div>
           <div className="xl:w-1/4 lg:w-2/4 lg:text-right mt-3.5 lg:mt-0">
             <Button variant='secondary' href={"#booknow"} className='flex items-center mt-3 bg-amber-400!'>
                <span> Request a Manufacturing Quote</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
            </Button>
           </div>
        </div>
    )
}

export default ManufacturingCTA;
