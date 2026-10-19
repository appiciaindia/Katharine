"use client";

import Link from 'next/link';
import { IoCall } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import "swiper/css";
import { MdOutlineMenuOpen } from "react-icons/md";
import Button from './Button';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';
import { useSiteSettings } from '@/lib/site-settings';

const Header = () => {

    const [onScroll, setOnScroll] = useState(false);
    const [menuBar, setMenuBar] = useState(false);
    const [drop, setDrop] = useState(false);

    const handleOnclick = () => {
        setMenuBar(!menuBar)
    }

    const { cartCount, setIsCartOpen } = useCart();
    const { siteTitle, siteLogo } = useSiteSettings();

    const handleDropdown = () => {
        setDrop(!drop)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setOnScroll(true);
            } else {
                setOnScroll(false);
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    return (
            <header className='relative z-50'>
            <div className="top-bar flex items-center justify-between md:px-12.5 px-4 md:py-2 py-1 bg-[#eee]">
                <div className="top-bar-left xl:w-1/2 lg:w-1/2 md:flex items-center w-3/4 text-[13px]">
                    We are available 24/7, Need help? <a href="tel:+916350646120" className='text-[#0c213c] md:pl-3 font-medium flex items-center'><IoCall /><span>+91 6350646120</span></a>
                </div>
                <div className="top-bar-right lg:w-1/2 xl:w-1/2 w-1/4 text-right">
                    <ul className='flex items-center justify-end gap-x-5 font-medium text-[#3d3d3d] xl:text-[15px] lg:text-[13px]'>
                        <li><Link href={"/about"} className='lg:inline-block hidden'>About Us</Link></li>
                        <li><Link href={"/account/my-order"} className='lg:inline-block hidden'>Track Order</Link></li>
                        <li><Link href={"/account"} className='lg:inline-block hidden'>My Account</Link></li>
                        <li><Link href={"/blog"} className='lg:inline-block hidden'>Blogs</Link></li>
                        <li><Link href={"/contact"} className='lg:inline-block hidden'>Contact Us</Link></li>
                        <li><Link href={"/login"} className='flex items-center'><FaRegUser className='pr-1 text-[#0c213c]' /><span>Login</span></Link></li>
                    </ul>
                </div>
            </div>
            <div className={`menu flex items-center justify-between xl:px-12 md:px-5 px-2 z-[60] lg:px-8 py-2 lg:py-1 ease-in-out duration-700 scroll-smooth bg-[#0c213c] ${onScroll ? "fixed top-0 left-0 w-full" : "relative"}`}>
                <div className="logo ">
                    <Link href={"/"} aria-label={siteTitle}>
                        <img src={siteLogo} alt={siteTitle} className='xl:w-42.5 lg:w-25 w-30' />
                    </Link>
                </div>
                <div className={`menu-list z-[70] lg:static lg:block lg:h-auto lg:w-auto lg:overflow-visible lg:bg-transparent lg:p-0 ${menuBar ? "fixed inset-0 z-[70] block h-dvh w-full overflow-y-auto bg-[#0c213c] p-5" : "hidden"}`}>
                    <div className={`close-btn h-12.5 w-12.5 items-center justify-center rounded-full bg-white absolute z-10 cursor-pointer top-3.5 right-3.5 text-[#0c213c] text-2xl ${menuBar ? "flex lg:hidden" : "hidden"}`} onClick={() => setMenuBar(false)}>
                        <AiOutlineClose />
                    </div>
                    <ul className={` flex lg:flex-row flex-col lg:items-center items-start xl:gap-3 lg:gap-2 xl:font-medium lg:font-medium xl:text-[18px] lg:text-[15px] text-white`}>
                        <li className='relative group lg:py-6 py-1.25 lg:inline-block block lg:w-auto w-full'><span className='hover:bg-[#f8f8f9ee] hover:text-[#0c213c] rounded-3xl xl:px-3 lg:px-2 py-1.25 inline-flex items-center'><span>Categories</span><FaChevronDown className='ml-2' onClick={handleDropdown} /></span>
                            <div className={`lg:flex invisible h-0 group-hover:h-auto group-hover:p-4 text-[#3d3d3d] lg:w-150 w-full justify-between border-b-gray-500 bg-white md:relative lg:absolute lg:top-18 top-2.5  left-2 rounded-xl group-hover:visible ${drop ? "visible h-auto p-4" : ""}`}>
                                <div className='lg:w-1/2'>
                                    <ul>
                                        {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => {
                                            return (
                                            <li key={category.slug} className='text-[15px] rounded-md hover:bg-[#e2d5f8fa]'><Link href={`/categories/${category.slug}`} className='block px-3.5 py-2' onClick={() => setMenuBar(false)}>{category.name}</Link></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className='lg:w-1/2'>
                                    <ul>
                                        {categories.slice(Math.ceil(categories.length / 2)).map((category) => {
                                            return (
                                            <li key={category.slug} className='text-[15px] rounded-md hover:bg-[#e2d5f8fa]'><Link href={`/categories/${category.slug}`} className='block px-3.5 py-2' onClick={() => setMenuBar(false)}>{category.name}</Link></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link href={"/products"} onClick={() => setMenuBar(false)} className='hover:bg-[#f8f8f9ee] hover:text-[#0c213c] rounded-3xl xl:px-3 lg:px-2 py-1.25'>Products</Link>
                        </li>
                        <li>
                            <Link href={"/best-selling"} onClick={() => setMenuBar(false)} className='hover:bg-[#f8f8f9ee] hover:text-[#0c213c] rounded-3xl xl:px-3 lg:px-2 py-1.25'>Best-Selling</Link>
                        </li>
                        <li><Link href={"/franchise"} onClick={() => setMenuBar(false)} className='hover:bg-[#f8f8f9ee] hover:text-[#0c213c] rounded-3xl xl:px-4 lg:px-3 py-1.25'>Franchise</Link></li>
                    </ul>
                </div>
                <div className="menu-right flex items-center justify-end">
                    <div className="search-bar min-w-0 xl:ml-7 lg:ml-2">
                        <SearchBox />
                    </div>
                    <div className="add-cart lg:mx-5 md:ml-4 md:mr-0 text-white">
                        <Link href={"/signup"}>
                            <div className='flex items-center pt-0.5 pb-1.5 px-3.5 bg-transparent hover:bg-[#c5c5d3b2] rounded-3xl'>
                                <FaRegUser className='text-[22px] mt-1' />
                                <div className='ml-1.5 md:block hidden'>
                                    <small>Sign in / Register</small><br />
                                    <strong className='text-[13px] -mt-0.75 block'>Orders & Account</strong>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="cart-icon text-xl text-white flex items-center ">
                        <Link href={"#"} className='md:h-10 md:w-10 rounded-full relative bg-transparent hover:bg-[#e8e0f379] flex items-center justify-center ' onClick={() => setIsCartOpen(true)}><FaCartArrowDown />{cartCount > 0 && (
                            <span className="absolute md:-top-2 top-2 -right-2 w-5 h-5 rounded-full bg-[#ff360a] text-white text-xs flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}</Link>
                        <Button type='button' className='lg:hidden lg:ml-0 md:pl-5 pl-2.5! ml-1.5' onClick={handleOnclick}>
                            <span className='md:inline hidden'>Menu</span><MdOutlineMenuOpen className='md:ml-1 text-[20px]' />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
