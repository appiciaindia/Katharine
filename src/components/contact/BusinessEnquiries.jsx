import React from 'react';
import Button from '../Button';
import { FiArrowUpRight } from 'react-icons/fi';

const BusinessEnquiries = () => {
  return (
    <div className='px-3 md:px-8 lg:px-10 mb-8 lg:mb-20 md:mb-14'>
      <div className='lg:flex'>
        <div className="lg:w-1/2 lg:px-8 md:px-6 md:py-6 py-4 lg:py-10 h-full  px-4 rounded-2xl bg-[linear-gradient(to_right,#ffe0fe,#ffe5fac9),url(/images/ps.png)] bg-center bg-cover">
            <h2 className='font-bold text-2xl lg:text-4xl md:text-3xl text-[#0c213c] mb-2'>For Business Enquiries</h2>
            <h5 className='md:text-xl text-[18px] font-medium mb-1'>Looking for a Business Partnership?</h5>
            <p className='text-[17px] mb-1'>Interested in becoming a distributor, franchise partner, or third-party manufacturing partner with Katharine Pharma?</p>
            <b>Connect with our team to discuss your business requirements.</b><br />
            <Button href={"/partner-with-us"} className='flex items-center mt-6'>
                <span>Partner With Us</span> <i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
            </Button>
        </div>
        <div className='rounded-3xl border border-amber-200 lg:w-1/2 lg:ml-10 mt-7 lg:mt-0 xl:h-80 lg:h-90 h-80'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.8259168764257!2d75.72008579999999!3d26.972411599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db320871e7399%3A0x3fa63324ed6d7776!2skatharine%20pharmaceuticals%20pvt%20ltd!5e0!3m2!1sen!2sin!4v1790407829547!5m2!1sen!2sin" width="100%" height="100%" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className='rounded-3xl'></iframe>
        </div>
      </div>
    </div>
  )
}

export default BusinessEnquiries;
