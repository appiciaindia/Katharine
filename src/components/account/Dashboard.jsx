
"use client"
import React from 'react';
import Button from '../Button';
import Link from 'next/link';
import { TbEditFilled } from 'react-icons/tb';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../ProductCard';
import { Autoplay } from 'swiper/modules';
import "swiper/css"

const Dashboard = ({ userName, userMail, mob }) => {

    const orderResponse = {
        "success": true,
        "data": [
            {
                "order_id": "#KP12345678",
                "date": "2026-10-06",
                "items": 3,
                "total_amount": 2499,
                "status": "Delivered"
            },
            {
                "order_id": "#KP12345679",
                "date": "2026-09-28",
                "items": 2,
                "total_amount": 1299,
                "status": "Shipped"
            },
            {
                "order_id": "#KP12345680",
                "date": "2026-09-20",
                "items": 1,
                "total_amount": 699,
                "status": "Processing"
            }
        ]
    }

    const statusStyles = {
        Delivered: "bg-green-100 text-green-700",
        Shipped: "bg-blue-100 text-blue-700",
        Processing: "bg-yellow-100 text-yellow-700",
        Pending: "bg-gray-100 text-gray-700",
        Cancelled: "bg-red-100 text-red-700",
    };

    const products = [
        {
            id: 1,
            name: "Animal Liquid Chelated Calcium Kathcal Gold 5 liter",
            slug: "animal-liquid-chelated-calcium-kathcal-gold-5-liter",
            image: "/images/kathcal-gold-5-ltr.webp",
            price: 270,
            oldPrice: 320,
        },
        {
            id: 2,
            name: "Chelated Liquid Calcium Ch Brutcal 2 LTR",
            slug: "chelated-liquid-calcium-ch-brutcal-2-ltr",
            image: "/images/ch-brutcal-2-ltr.webp",
            price: 104,
            oldPrice: 130,
        },
        {
            id: 3,
            name: "Veterinary Anti Mastitis Powder UC Tonic 250 GM",
            slug: "veterinary-anti-mastitis-powder-uc-tonic-250-gm",
            image: "/images/uc-tonic-mastitis-powder-250-gm.webp",
            price: 180,
            oldPrice: 220,
        },
    ]

    return (
        <div>
            <div className='border border-blue-100  rounded-2xl shadow-amber-500 grid md:my-0 my-5 md:grid-cols-2'>
                <div className="p-4">
                    <h2 className='text-2xl lg:text-4xl  md:text-3xl mb-3 font-bold'>Welcome Back <span className='text-blue-900'>{userName}</span></h2>
                    <p>Manage your account and enjoy a better shopping experience with Katharine Pharma.</p>
                    <Button href={"/shop"} className='pr-5! mt-3'>Show Now</Button>
                </div>
                <div className=" from-blue-100 to-white bg-linear-to-l px-3 rounded-r-2xl">
                    <img src="/images/footer.png" alt="Katharine Pharma" className='h-full object-cover' />
                </div>
            </div>

            <div className="grid xl:grid-cols-4 grid-cols-2 gap-x-2 gap-y-3">
                <div className="md:flex md:text-left text-center items-center border border-blue-100 p-2 rounded-xl md:mt-5 mt-0">
                    <div className="h-20 w-20 bg-amber-200 flex items-center justify-center rounded-full m-auto">
                        <img src="/icons/package.png" alt="My Orders" className='brightness-0 w-12.5 ' />
                    </div>
                    <div className="md:ml-4 mt-2 md:mt-0">
                        <h5 className='font-bold text-[16px]'>My Orders</h5>
                        <h3 className='text-2xl lg:text-3xl md:text-3xl font-bold'>05</h3>
                        <Link href={"#"} className='text-blue-400 font-medium'>View Orders →</Link>
                    </div>
                </div>
                <div className="md:flex md:text-left text-center items-center border border-blue-100 p-2 rounded-xl md:mt-5 mt-0">
                    <div className="h-20 w-20 bg-red-200 flex items-center justify-center rounded-full m-auto">
                        <img src="/icons/love.png" alt="My Orders" className='brightness-0 w-12.5' />
                    </div>
                    <div className="md:ml-4 mt-2 md:mt-0">
                        <h5 className='font-bold text-[16px]'>Wishlist</h5>
                        <h3 className='text-2xl lg:text-3xl md:text-3xl font-bold'>05</h3>
                        <Link href={"#"} className='text-blue-400 font-medium'>View Wishlist →</Link>
                    </div>
                </div>
                <div className="md:flex md:text-left text-center items-center border border-blue-100 p-2 rounded-xl md:mt-5 mt-0">
                    <div className="h-20 w-20 bg-green-200 flex items-center justify-center rounded-full m-auto">
                        <img src="/icons/location.png" alt="My Orders" className='brightness-0 w-12.5' />
                    </div>
                    <div className="md:ml-4 mt-2 md:mt-0">
                        <h5 className='font-bold text-[16px]'>Addresses</h5>
                        <h3 className='text-2xl lg:text-3xl md:text-3xl font-bold'>02</h3>
                        <Link href={"#"} className='text-blue-400 font-medium'>Manage Addresses</Link>
                    </div>
                </div>
                <div className="md:flex md:text-left text-center items-center border border-blue-100 p-2 rounded-xl md:mt-5 mt-0">
                    <div className="h-20 w-20 bg-blue-200 flex items-center justify-center rounded-full m-auto">
                        <img src="/icons/package.png" alt="My Orders" className='brightness-0 w-12.5' />
                    </div>
                    <div className="md:ml-4 mt-2 md:mt-0">
                        <h5 className='font-bold text-[16px]'>Offers</h5>
                        <h3 className='text-2xl lg:text-3xl md:text-3xl font-bold'>03</h3>
                        <Link href={"#"} className='text-blue-400 font-medium'>View Offers →</Link>
                    </div>
                </div>
            </div>

            <div className="p-3 rounded-2xl border border-blue-100 mt-5 ">
                <div className="flex justify-between">
                    <h3 className='text-xl lg:text-2xl font-bold'>Recent Orders</h3>
                    <Link href={"#"} className='text-blue-400 font-medium'>View All Orders </Link>
                </div>
                <div className="max-w-[100vw] overflow-auto">
                    <table className='xl:w-full md:w-screen w-[180vw] mt-3'>
                        <thead>
                            <tr className='text-left'>
                                <th className='p-1.5 bg-blue-100 rounded-tl-lg'>Order Id</th>
                                <th className='p-1.5 bg-blue-100'>Date</th>
                                <th className='p-1.5 bg-blue-100'>Items</th>
                                <th className='p-1.5 bg-blue-100'>Total Amount</th>
                                <th className='p-1.5 bg-blue-100'>Status</th>
                                <th className='p-1.5 bg-blue-100 rounded-tr-lg text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderResponse.data.map((item, index) => {

                                    const itemstatus = item.status === "Shipped"

                                    return (
                                        <tr key={index} className='border border-blue-100'>
                                            <td className='p-1.5'>{item.order_id}</td>
                                            <td className='p-1.5'>{item.date}</td>
                                            <td className='p-1.5'>{item.items} Items</td>
                                            <td className='p-1.5'>₹ {item.total_amount}</td>
                                            <td className={`p-1.5`}> <span className={`py-1 px-3 rounded-2xl ${statusStyles[item.status] || "bg-gray-100 text-gray-700"}`}>{item.status}</span></td>
                                            <td className='p-1.5 text-center'><Button href={"/"} variant='outline' className='py-1! pr-4!'>View Details</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="xl:flex mt-5">
                <div className="xl:w-7/12 p-4 border border-blue-100 rounded-2xl">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mr-3">
                            <img src="/icons/track.png" alt="track" className='brightness-0 w-13' />
                        </div>
                        <div className="flex-1">
                            <h4 className='font-bold text-xl md:text-2xl'>Track Your Order 📦</h4>
                            <p>Enter your order number to check your latest delivery status.</p>
                        </div>
                    </div>
                    <form action="#" className='mt-3'>
                        <div className="md:flex items-center md:m-3 md:mt-0 mt-5">
                            <input type="text" placeholder='Enter Your Order Number' className='w-full flex-1 border border-blue-100 p-2.5 outline-0 mr-7 rounded-lg' />
                            <button type='submit' className='px-5 py-2.5 md:mt-0 mt-3.5 rounded-lg bg-orange-500 cursor-pointer font-medium hover:bg-gray-800 duration-300 ease-in-out text-white'>Track Order</button>
                        </div>
                    </form>
                    <div className="grid md:grid-cols-5 mt-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center h-15 w-15 rounded-full bg-green-600 m-auto">
                                <img src="/icons/cart.png" alt="Order Placed" className='m-auto w-7' />
                            </div>
                            <h5 className='font-bold mt-2'>Order Placed</h5>
                        </div>
                        <div className="text-center relative md:mt-0 mt-5">
                            <div className="flex items-center justify-center h-15 w-15 rounded-full bg-blue-50 m-auto">
                                <img src="/icons/package.png" alt="Order Placed" className='m-auto w-7 brightness-0' />
                            </div>
                            <div className="top-0 absolute -left-6.25 md:block hidden">
                                <img src="/icons/arrows.png" alt="arrows" className='h-13' />
                            </div>
                            <h5 className='font-bold mt-2'>Processing</h5>
                        </div>
                        <div className="text-center relative md:mt-0 mt-5">
                            <div className="flex items-center justify-center h-15 w-15 rounded-full bg-blue-50 m-auto">
                                <img src="/icons/track.png" alt="Order Placed" className='m-auto w-7 brightness-0' />
                            </div>
                            <div className="top-0 absolute -left-6.25 md:block hidden">
                                <img src="/icons/arrows.png" alt="arrows" className='h-13' />
                            </div>
                            <h5 className='font-bold mt-2'>Shipped</h5>
                        </div>
                        <div className="text-center relative md:mt-0 mt-5">
                            <div className="flex items-center justify-center h-15 w-15 rounded-full bg-blue-50 m-auto">
                                <img src="/icons/location.png" alt="Order Placed" className='m-auto w-7 brightness-0' />
                            </div>
                            <div className="top-0 absolute -left-6.25 md:block hidden">
                                <img src="/icons/arrows.png" alt="arrows" className='h-13' />
                            </div>
                            <h5 className='font-bold mt-2'>Out for Delivery</h5>
                        </div>
                        <div className="text-center relative md:mt-0 mt-5">
                            <div className="flex items-center justify-center h-15 w-15 rounded-full bg-blue-50 m-auto">
                                <img src="/icons/achievement.png" alt="Order Placed" className='m-auto w-7 brightness-0' />
                            </div>
                            <div className="top-0 absolute -left-6.25 md:block hidden">
                                <img src="/icons/arrows.png" alt="arrows" className='h-13' />
                            </div>
                            <h5 className='font-bold mt-2'>Delivered</h5>
                        </div>
                    </div>
                </div>
                <div className="xl:w-5/12 p-4 border lg:ml-4 mt-5 lg:mt-0 border-blue-100 rounded-2xl">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mr-3">
                            <img src="/icons/user.png" alt="track" className='w-13' />
                        </div>
                        <div className="flex-1">
                            <h4 className='font-bold text-xl md:text-2xl'>Account Information</h4>
                            <p>Manage Your Personal Details here</p>
                        </div>
                    </div>
                    <ul className='mt-5'>
                        <li className='flex items-center text-sm justify-between p-2 border border-blue-100'><span>Full Name</span><span>{userName}</span><TbEditFilled className='text-blue-500 text-xl cursor-pointer' /></li>
                        <li className='flex items-center text-sm justify-between p-2 border border-blue-100'><span>Email Address</span><span>{userMail}</span><TbEditFilled className='text-blue-500 text-xl cursor-pointer' /></li>
                        <li className='flex items-center text-sm justify-between p-2 border border-blue-100'><span>Mobile Number</span><span>+91 {mob}</span><TbEditFilled className='text-blue-500 text-xl cursor-pointer' /></li>
                    </ul>
                </div>
            </div>

            <div className="xl:flex mt-5">
                <div className="xl:w-7/12 p-4 border border-blue-100 rounded-2xl">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mr-3">
                            <img src="/icons/location.png" alt="track" className='brightness-0 w-13' />
                        </div>
                        <div className="flex-1">
                            <h4 className='font-bold text-xl md:text-2xl'>Manage Addresses</h4>
                            <p>View and Manage Your Addresses</p>
                        </div>
                    </div>
                    <div className="md:flex mt-3 gap-x-2">
                        <div className="md:w-1/2 border p-4 md:mt-0 mt-4 border-blue-100 rounded-2xl w-full">
                            <div className="flex justify-between items-center mb-4">
                                <span className='bg-orange-400 px-3 py-1 rounded-2xl text-white font-medium'>Default</span>
                                <div className="gap-x-3 flex">
                                    <TbEditFilled className='text-blue-500 text-xl cursor-pointer' />
                                    <FaRegTrashCan className='text-red-600 text-xl cursor-pointer' />
                                </div>
                            </div>
                            <h5 className='font-bold'>{userName}</h5>
                            <p> House No. 123, Sector 45 <br />
                                Gurugram, Haryana – 122003 <br />
                                Mobile: +91 9876543210</p>
                        </div>
                        <div className="md:w-1/2 border p-4 md:mt-0 mt-4 border-blue-100 rounded-2xl w-full">
                            <div className="flex justify-between items-center mb-4">
                                <span className=' font-medium'>Office Address</span>
                                <div className="gap-x-3 flex">
                                    <TbEditFilled className='text-blue-500 text-xl cursor-pointer' />
                                    <FaRegTrashCan className='text-red-600 text-xl cursor-pointer' />
                                </div>
                            </div>
                            <h5 className='font-bold'></h5>
                            <p> Katharine Pharma Pvt. Ltd. <br />
                                Plot No. 12, Udyog Vihar <br />
                                Gurugram, Haryana – 122016</p>
                        </div>
                    </div>
                    <Button variant='outline' type='button' className='mt-3 w-full cursor-pointer'>+ Add New Address</Button>
                </div>
                <div className="xl:w-5/12 p-4 border lg:ml-4 mt-5 lg:mt-0 border-blue-100 rounded-2xl">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={2}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}

                    >
                        {products.map((product) => {
                            return (
                                <SwiperSlide>
                                    <ProductCard key={product.id} {...product}>

                                    </ProductCard>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
