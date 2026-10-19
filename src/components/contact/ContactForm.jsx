import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { IoCall } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import FormBox from '../coman/FormBox';

const ContactForm = () => {
    return (
        <div className='px-3 md:px-8 lg:px-10 py-10 md:py-14 lg:py-20'>
            <div className='lg:flex items-center'>
                <div className='lg:w-2/5 xl:pr-10 md:pr-5'>
                    <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold '>Contact Information </h2>
                    <p>Connect with our team to discuss your business requirements.</p>
                    <div className='flex items-center border border-amber-200 rounded-xl mt-4 md:px-5 px-3 py-3.5'>
                        <div className="flex items-center justify-center rounded-full bg-red-600 text-white mr-4 h-18 w-18">
                            <IoCall className='text-4xl' />
                        </div>
                        <div className='flex-1'>
                            <h4 className='font-bold text-2xl'>Call Us</h4>
                            <a href="tel:+91 6350646120" className='text-xl font-medium text-[#0c213c]'>+91 6350646120</a><br />
                            <span>For product enquiries, orders, and business-related assistance.</span>
                        </div>
                    </div>
                    <div className='flex items-center border border-amber-200 rounded-xl mt-4 md:px-5 px-3 py-3.5'>
                        <div className="flex items-center justify-center rounded-full bg-blue-500 text-white mr-4 h-18 w-18">
                            <TfiEmail className='text-4xl' />
                        </div>
                        <div className='flex-1'>
                            <h4 className='font-bold text-2xl'>Email Id</h4>
                            <a href="mailto:info@katharinepharma.in" className='text-xl font-medium text-[#0c213c]'>info@katharinepharma.in</a><br />
                            <span>Send us your questions and our team will get back to you.</span>
                        </div>
                    </div>
                    <div className='flex items-center border border-amber-200 rounded-xl mt-4 md:px-5 px-3 py-3.5'>
                        <div className="flex items-center justify-center rounded-full bg-emerald-600 text-white mr-4 h-18 w-18">
                            <HiLocationMarker className='text-4xl' />
                        </div>
                        <div className='flex-1'>
                            <h4 className='font-bold text-2xl'>Company Location</h4>
                            <span>48-49, Jodla Power House, Sikar, Road Gurudev, Vihar-1 Jaipur - 302013</span>
                        </div>
                    </div>
                </div>
                <div className='lg:w-3/5 lg:pl-4 mt-8 lg:mt-0'>
                    <FormBox />
                </div>
            </div>
        </div>
    )
}

export default ContactForm;
