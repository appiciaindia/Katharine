import React from 'react';
import Button from '../Button';
import { FiArrowUpRight } from 'react-icons/fi';

const AboutSection = () => {
  return (
    <div className='lg:flex lg:py-20 md:py-14 py-10 px-3 lg:px-15 bg-[#eee] items-center'>
      <div className="lg:w-1/2">
        <span className='px-4 py-2 font-medium rounded-3xl border border-[#eb9d19]'>About Katharine</span>
        <h2 className='xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold my-2.5'>Better Nutrition for Healthier Animals</h2>
        <p>Katharine Pharma is focused on providing quality animal nutrition and veterinary products that support the nutritional and wellness needs of animals.</p>
        <p>We bring together a range of nutritional supplements and animal-care products for cattle, goats, poultry, dogs, cats, and other animals, making it easier for customers to find the products they need in one convenient online store.</p>
        <p>From mineral and calcium supplements to vitamins, liver tonics, feed supplements, digestive care, and animal wellness products, our goal is to make animal nutrition products easily accessible through a simple and convenient shopping experience.</p>
        <p>We believe that good animal care begins with proper nutrition. That's why we focus on offering useful products, clear product information, convenient online ordering, and dependable delivery to customers across India.</p>
        <Button href={"/about"} className='mt-5'>
            <span>Know More About Us</span><i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i>
        </Button>
      </div>
      <div className="lg:w-1/2 h-full mt-5 lg:mt-0">
        <img src="images/about.png" alt="About Company" className='h-full w-full rounded-2xl'/>
      </div>
    </div>
  )
}

export default AboutSection;
