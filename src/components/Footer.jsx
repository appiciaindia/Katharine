import Link from 'next/link';
import React from 'react';
import { FaAngleRight, FaInstagram } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';
import Button from './Button';
import { BsFacebook } from 'react-icons/bs';
import { IoLogoWhatsapp, IoLogoYoutube } from 'react-icons/io5';

const Footer = () => {
  return (
    <div className='mx-2.5 lg:mx-3 md:mx-5 rounded-2xl bg-[#0c213c] text-white relative mb-3'>
      <div className="lg:flex items-start md:px-5 lg:px-7 lg:py-12 py-8 px-4">
        <div className="left-0 lg:bottom-0 md:bottom-10 bottom-35 lg:w-125 md:w-80 absolute md:opacity-30 opacity-10">
        <img src="images/footer.png" alt="Katharine" />
      </div>
      <div className="xl:w-[30%] lg:w-[27%] ">
        <img src="/logo.png" alt="logo" />
        <p className='mt-2'>Katharine is committed to providing quality animal nutrition and veterinary products designed to support healthier, stronger, and happier animals.</p>
      </div>
      <div className="lg:w-[40%] lg:pl-5 grid md:grid-cols-2 my-5 lg:my-0">
        <div>
          <h4 className='xl:font-bold lg:font-semibold xl:text-2xl text-xl font-semibold text-[#eee] '>Quick Links</h4>
          <ul className='mt-5'>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/"}><FaAngleRight /> <span>Home</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/about"}><FaAngleRight /> <span>About Us</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/products"}><FaAngleRight /> <span>Products</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/categories"}><FaAngleRight /> <span>Categories</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/blog"}><FaAngleRight /> <span>Blogs</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/contact"}><FaAngleRight /> <span>Contact Us</span> </Link></li>
          </ul>
        </div>
        <div>
          <h4 className='xl:font-bold lg:font-semibold xl:text-2xl text-xl font-semibold text-[#eee] '>Customer Support</h4>
          <ul className='mt-5'>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/faqs"}><FaAngleRight /> <span>FAQs</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/shipping-policy"}><FaAngleRight /> <span>Shipping Policy</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/account/track-order"}><FaAngleRight /> <span>Track Your Order</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/help-center"}><FaAngleRight /> <span>Help Center</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/terms-and-condition"}><FaAngleRight /> <span>Terms & Conditions</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/privacy-policy"}><FaAngleRight /> <span>Privacy Policy</span> </Link></li>
            <li><Link className='flex items-center py-1 text-[17px]' href={"/return-and-refund-policy"}><FaAngleRight /> <span>Return & Refund Policy</span> </Link></li>
          </ul>
        </div>
      </div>
      <div className="xl:w-[30%] lg:w-[33%] lg:pl-5 md:w-full">
        <h4 className='xl:font-bold lg:font-semibold xl:text-2xl text-xl font-semibold text-[#eee] mb-5'>Subscribe to Our Newsletter</h4>
        <p className='text-[18px]'>Get the latest updates, new products, exclusive offers and expert tips.</p>
        <form action="#">
          <div className="flex rounded-3xl bg-white p-0.5 mt-6">
            <label htmlFor="email" className='flex items-center bg-transparent w-full px-4'>
              <TfiEmail className='mr-3 text-xl text-gray-600' />
              <input type="email" placeholder='Enter Your Email Id' className='xl:w-auto lg:w-25 md:w-auto w-35 placeholder:text-gray-900 py-3 outline-0 text-black' />
            </label>
            <Button type='submit'>
              Subscribe
            </Button>
          </div>
          <div className="flex items-center mt-3 text-gray-400">
            <input type="checkbox" className='h-4 w-4 mr-2' />
            <span>I agree to receive updates and offers.</span>
          </div>
        </form>
        <h4 className='mt-3 text-2xl font-semibold mb-3'>Follow Us</h4>
        <ul className='flex items-center'>
          <li className='mr-4'><a href="#" className='flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-2xl'><BsFacebook /></a></li>
          <li className='mr-4'><a href="#" className='flex items-center justify-center h-10 w-10 rounded-full bg-conic/decreasing from-amber-600 via-red-600  to-fuchsia-500 text-2xl '><FaInstagram /></a></li>
          <li className='mr-4'><a href="#" className='flex items-center justify-center h-10 w-10 rounded-full bg-emerald-500 text-2xl'><IoLogoWhatsapp /></a></li>
          <li className='mr-4'><a href="#" className='flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-2xl'><IoLogoYoutube /></a></li>
        </ul>
      </div>
      </div>
      <div className="copy-right bg-gray-200 flex-wrap md:text-left text-center md:justify-center  flex items-center lg:justify-between text-black relative z-20 rounded-b-2xl px-5 py-2.5">
        <p>© 2026 Katharine Pharma. All rights reserved.</p>
        <ul className='grid grid-cols-5 gap-2 lg:mx-0 mx-3'>
          <li className='h-full bg-white rounded-md p-1 flex items-center justify-center'><img src="/images/mastercard.jpg" alt="master card" className='w-10' /></li>
          <li className='h-full bg-white rounded-md p-1 flex items-center justify-center'><img src="/images/paypal.jpg" alt="paypal" className='w-10' /></li>
          <li className='h-full bg-white rounded-md p-1 flex items-center justify-center'><img src="/images/visa.jpg" alt="visa" className='w-10' /></li>
          <li className='h-full bg-white rounded-md p-1 flex items-center justify-center'><img src="/images/rupay.jpg" alt="rupay" className='w-10' /></li>
          <li className='h-full bg-white rounded-md p-1 flex items-center justify-center'><img src="/images/upi.jpg" alt="upi" className='w-10' /></li>
        </ul>
        <p>Designed & Developed <a href="https://appicia.com/" target="_blank" rel="noopener noreferrer" title="Website Design Company in Gurgaon" className='font-semibold text-[18px] text-[#0c213c]'> Appicia Technologies </a></p>
      </div>
    </div>
  )
}

export default Footer;
