"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import LogoutButton from './LogoutButton';
import { usePathname } from 'next/navigation';

const AccountSidebar = () => {
    const accountList = [
        {
            id: '01',
            name: "Dashboard",
            icon: "/icons/dashboard.png",
            url:"/account"
        },
        {
            id: '02',
            name: "My Orders",
            icon: "/icons/package.png",
            url:"/account/my-order"
        },
        {
            id: '03',
            name: "Track Order",
            icon: "/icons/track.png",
            url:"/account/track-order"
        },
        {
            id: '04',
            name: "Wishlist",
            icon: "/icons/love.png",
            url:"/account/wishlist"
        },
        {
            id: '05',
            name: "My Profile",
            icon: "/icons/user1.png",
            url:"/account/profile"
        },
        {
            id: '06',
            name: "Manage Addresses",
            icon: "/icons/location.png",
            url:"/account/address"
        },
        {
            id:'07',
            name:"Payments",
            url:"/account/payments",
            icon:"/icons/payment.png"
        }
        
    ];
    const pathname = usePathname();

     const user = {
        name: "Vinod Kumar",
        email: "vinod3de@gmail.com",
        mob:"9876543210"
    }
   

    return (
        <div className="xl:w-1/5 lg:w-4/12 border border-blue-100 p-3 rounded-xl lg:sticky top-35">
            <div className="mb-2 flex items-center relative">
                <img src="/icons/user.png" alt="" />
                <div className="ml-2 flex-1">
                    <h5 className='font-semibold'>{user.name}</h5>
                    <p>{user.email.length > 20 ? user.email.slice(0, 20) + "..." : user.email}</p>
                </div>
                <div className="top-1 right-1 absolute text-blue-500 cursor-pointer">
                    <FaRegEdit />
                </div>
            </div>
            <div className="mt-7">
                <ul>
                    {accountList.map((item) => {
                       const activeItem = pathname === item.url;
                        return (
                            <li key={item.id}  ><Link href={item.url} className={`flex items-center mb-4 cursor-pointer rounded-xl border border-blue-100 p-3 ${activeItem ? "bg-gray-800 text-white" : ""} `}> <img src={item.icon} alt={item.name} className={`w-6 brightness-0 ${activeItem ? " brightness-[100] " : ""}`} /><span className='font-medium pl-3 hover:text-green-700'>{item.name}</span></Link></li>
                        )
                    })}
                    <li><LogoutButton/></li>
                </ul>
            </div>
        </div>
    )
}

export default AccountSidebar
