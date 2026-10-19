"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaPhoneAlt } from 'react-icons/fa';
import Button from './Button';
import { BsWhatsapp } from 'react-icons/bs';
import { MdDownload, MdOutlineMenuOpen } from 'react-icons/md';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { useSiteSettings } from '@/lib/site-settings';

const HeaderMain = () => {

    const [menuBar, setMenuBar] = useState(false);
    const [drop, setDrop] = useState(null);
    const { siteTitle, siteLogo } = useSiteSettings();

    const handleDropdown = (name) => {
        setDrop((current) => current === name ? null : name);
    }

    const handleOnclick = () => {
        setMenuBar((open) => !open)
    }

    const closeNavigation = () => {
        setMenuBar(false);
        setDrop(null);
    };

    return (
        <div>
            <div className='md:flex items-center justify-between px-2.5 lg:px-10 md:px-4 py-2'>
                <div className="mb-2 md:mb-0 md:w-1/2 flex md:text-left text-center items-center lg:text-[18px] md:text-[15px] text-[14px]">
                    <span>We are available 24/7, Need help?</span><a href="tel:+91 6350646120" className='md:justify-baseline justify-center flex items-center ml-3 font-semibold'><FaPhoneAlt className='mr-1 text-[#f29c1a]' /><span className='text-[#0c213c]'>+91 6350646120</span></a>
                </div>
                <div className="md:w-1/2 flex items-center md:justify-end justify-center">
                    <Button variant='outline' className='border-emerald-600 text-emerald-400 flex items-center mr-3.5'>
                        <span>WhatsApp</span><BsWhatsapp className='mx-1.5' />
                    </Button>
                    <Button href={"/"} target='_blank' className='flex items-center'>
                        <span>Product List</span> <MdDownload className='mx-1.5 text-white text-xl' />
                    </Button>
                </div>
            </div>
            <div className='px-2.5 lg:px-10 md:px-4 py-2 bg-[#0c213c] flex items-center justify-between'>
                <Link href={"/"} aria-label={siteTitle}>
                    <img src={siteLogo} alt={siteTitle} className='md:w-40 w-32' />
                </Link>
                <div className={`z-[70] lg:static lg:block lg:h-auto lg:w-auto lg:overflow-visible lg:bg-transparent lg:p-0 ${menuBar ? "fixed inset-0 z-[70] block h-dvh w-full overflow-y-auto bg-[#0c213c] p-5" : "hidden"}`}>
                    <ul className={`lg:flex items-center flex-1 justify-end xl:gap-10 lg:gap-4 text-white xl:text-[18px] text-[14px] font-normal ${menuBar ? "block" : "flex"}`}>
                        <li className='py-2.5'><Link href={"/"} className='hover:text-[#eb9d19] ease-in-out duration-150' onClick={closeNavigation}>Home</Link></li>
                        <li className='py-2.5'><Link href={"/about"} className='hover:text-[#eb9d19] ease-in-out duration-150' onClick={closeNavigation}>About Us</Link></li>
                        <li className='relative group py-2.5' onMouseEnter={() => setDrop("veterinary")} onMouseLeave={() => setDrop(null)}><span className='inline-flex items-center hover:text-[#eb9d19] ease-in-out duration-150'><span>Veterinary Products</span><button type="button" aria-label="Toggle Veterinary Products" aria-expanded={drop === "veterinary"} onClick={() => handleDropdown("veterinary")} className="ml-1.5"><FaChevronDown /></button></span>
                            {drop === "veterinary" &&
                                <div className="relative z-[80] block w-full rounded-xl border-b-gray-500 bg-white p-2 text-[#3d3d3d] shadow-lg lg:absolute lg:left-0 lg:top-full lg:flex lg:w-60">
                                    <ul className='w-full'>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/cattle-feed-supplements"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Cattle Feed Supplement</Link></li>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/poultry-feed-supplements"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Poultry Feed Supplement</Link></li>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/aqua-feed-supplements"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Aqua Feed Supplement</Link></li>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/pigeon-feed-supplements"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Pigeon Feed Supplement</Link></li>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/bird-feed-supplements"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Birds Feed Supplement</Link></li>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className='relative group py-2.5' onMouseEnter={() => setDrop("third")} onMouseLeave={() => setDrop(null)}><span className='inline-flex items-center hover:text-[#eb9d19] ease-in-out duration-150'><Link href={"/third-party-manufacturing-pharma"} onClick={closeNavigation}>Third Party Manufacturing</Link><button type="button" aria-label="Toggle product forms" aria-expanded={drop === "third"} onClick={() => handleDropdown("third")} className="ml-1.5"><FaChevronDown /></button></span>
                            {drop === "third" &&
                                <div className="relative z-[80] block w-full rounded-xl border-b-gray-500 bg-white p-2 text-[#3d3d3d] shadow-lg lg:absolute lg:left-0 lg:top-full lg:flex lg:w-60">
                                    <ul className='w-full'>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/powder-product-list"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Powder Product List</Link></li>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/liquid-products"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Liquid Product List</Link></li>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/granules-product-list"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Granules Product List</Link></li>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/bolus-and-tablets-product-list"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Bolus & Tablets Product List</Link></li>
                                        <li className='rounded-md hover:bg-[#e2d5f8fa]'><Link href={"/gel-product-list"} onClick={closeNavigation} className='px-3.5 py-2 text-[15px] block'>Gel Product List</Link></li>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className='relative group py-2.5' onMouseEnter={() => setDrop("fran")} onMouseLeave={() => setDrop(null)}><span className='inline-flex items-center hover:text-[#eb9d19] ease-in-out duration-150'><Link href={"/franchise"} onClick={closeNavigation}>Franchise</Link><button type="button" aria-label="Toggle Franchise" aria-expanded={drop === "fran"} onClick={() => handleDropdown("fran")} className="ml-1.5"><FaChevronDown /></button></span>
                            {drop === "fran" &&
                                <div className="relative z-[80] block w-full rounded-xl border-b-gray-500 bg-white p-2 text-[#3d3d3d] shadow-lg lg:absolute lg:left-0 lg:top-full lg:flex lg:w-60">
                                    <ul className='w-full'>
                                        <li className='text-[15px] px-3.5 py-2 rounded-md hover:bg-[#e2d5f8fa]'>
                                            <Link href={"/veterinary-pcd-pharma-franchise"} onClick={closeNavigation}>Veterinary PCD Franchise</Link></li>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className='py-2.5'><Link href={"/blog"} className='hover:text-[#eb9d19] ease-in-out duration-150' onClick={closeNavigation}>Blog</Link></li>
                        <li className='py-2.5'><Link href={"/shop"} className='hover:text-[#eb9d19] ease-in-out duration-150' onClick={closeNavigation}>Shop</Link></li>
                        <li className='py-2.5'><Link href={"/contact"} className='hover:text-[#eb9d19] ease-in-out duration-150' onClick={closeNavigation}>Contact Us</Link></li>
                    </ul>
                    <button type="button" aria-label="Close menu" className={`close-btn h-12.5 w-12.5 items-center justify-center rounded-full bg-white absolute z-10 cursor-pointer top-3.5 right-3.5 text-[#0c213c] text-2xl ${menuBar ? "flex lg:hidden" : "hidden"}`} onClick={() => setMenuBar(false)}>
                        <AiOutlineClose />
                    </button>
                </div>
                    <Button type='button' variant='outline' className='lg:hidden lg:ml-0 md:pl-5 text-white border-white pl-2.5! ml-1.5' onClick={handleOnclick}>
                    <span className='md:inline hidden'>Menu</span><MdOutlineMenuOpen className='md:ml-1 text-[20px]' />
                </Button>
            </div>
        </div>
    )
}

export default HeaderMain;

