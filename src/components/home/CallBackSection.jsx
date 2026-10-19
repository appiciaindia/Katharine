"use client";

import React, { useState } from 'react';
import Button from '../Button';
import { FiArrowUpRight } from 'react-icons/fi';
import { apiRequest } from '@/lib/api';

const CallBackSection = () => {
    const [feedback, setFeedback] = useState("");
    const [isError, setIsError] = useState(false);
    const [pending, setPending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const form = new FormData(formElement);
        setPending(true);
        setFeedback("");
        setIsError(false);

        try {
            const response = await apiRequest('/enquiries', {
                method: 'POST',
                body: {
                    type: 'callback',
                    name: form.get('name'),
                    email: form.get('email'),
                    phone: form.get('phone'),
                    category: form.get('interest'),
                },
            });
            setFeedback(response.message);
            formElement.reset();
        } catch (error) {
            setFeedback(error.message);
            setIsError(true);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className='py-10 lg:py-20 md:py-14 px-3 md:px-7 lg:px-10'>
            <div className="lg:p-10 md:p-7 sm:p-4 p-3 md:bg-[linear-gradient(to_right,#f0eaea,transparent),url(/images/callback.png)] bg-[linear-gradient(to_bottom,#f0eaea,transparent),url(/images/callback.png)] bg-cover bg-center rounded-2xl md:flex justify-between items-center">
                <div className='lg:w-[38%] md:w-[43%]'>
                    <h2 className='font-bold text-2xl md:text-3xl xl:text-[44px] lg:text-4xl my-3'>Need Help? We’re Here for You</h2>
                    <p>Have questions about our products or need help choosing the right animal nutrition solution? Share your details and our team will get in touch with you.</p>
                    <div className="flex items-center mt-5">
                        <div className="text-center mr-5">
                            <img src="images/cb1.png" alt="Expert Assistance" className='m-auto' />
                            <h4 className='font-semibold lg:text-[18px] mt-3.5'>Expert Assistance</h4>
                        </div>
                        <div className="text-center mr-5">
                            <img src="images/cb2.png" alt="Expert Assistance" className='m-auto' />
                            <h4 className='font-semibold lg:text-[18px] mt-3.5'>Quick Response
                            </h4>
                        </div>
                        <div className="text-center">
                            <img src="images/cb3.png" alt="Expert Assistance" className='m-auto' />
                            <h4 className='font-semibold lg:text-[18px] mt-3.5'>Personalised Support
                            </h4>
                        </div>
                    </div>
                </div>
                <div className='p-4 xl:w-[30%] lg:w-[38%] md:w-[49%] bg-white rounded-2xl md:my-0 my-6'>
                    <h2 className='font-bold text-3xl text-[#0c213c] mb-3'>Request a Call Back</h2>
                    <p>Get in touch with our team to clarify your queries</p>
                    <form onSubmit={handleSubmit}>
                        <input required name="name" type="text" placeholder='Enter Your Name' className='w-full mt-4 py-2.5 px-8 border rounded-[5px] border-amber-300'/>
                        <input name="email" type="email" placeholder='Enter Your Email Id' className='w-full mt-4 py-2.5 px-8 border rounded-[5px] border-amber-300'/>
                        <input required name="phone" type="tel" placeholder='Enter Contact No.' className='w-full mt-4 py-2.5 px-8 border rounded-[5px] border-amber-300'/>
                        <select required name="interest" className='w-full mt-4 py-2.5 px-8 border rounded-[5px] border-amber-300'>
                            <option value="">Select Your Interest</option>
                            <option value="Product Enquiry">Product Enquiry</option>
                            <option value="Bulk Order">Bulk Order</option>
                            <option value="Become a Distributor">Become a Distributor</option>
                            <option value="Franchise">Franchise</option>
                            <option value="Third-Party Manufacturing">Third-Party Manufacturing</option>
                            <option value="Others">Others</option>
                        </select>
                        {feedback && <p role={isError ? 'alert' : 'status'} className={`mt-3 text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>{feedback}</p>}
                        <Button type='submit' disabled={pending} className='flex items-center mt-5'><span>{pending ? 'Sending…' : 'Request a Call Back'}</span> <i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i></Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CallBackSection;
