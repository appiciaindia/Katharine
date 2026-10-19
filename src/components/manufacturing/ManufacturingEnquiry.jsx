"use client";

import Button from '../Button';
import { FiArrowUpRight } from 'react-icons/fi';
import React, { useState } from 'react';
import { apiRequest } from '@/lib/api';


const ManufacturingEnquiry = () => {
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
                    type: 'manufacturing',
                    name: form.get('name'),
                    company: form.get('company'),
                    email: form.get('email'),
                    phone: form.get('phone'),
                    category: form.get('category'),
                    product_form: form.get('product_form'),
                    message: form.get('message'),
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
        <div className='py-10 lg:py-20 md:py-14 px-3 md:px-7 lg:px-10' id="booknow">
            <div className="lg:p-10 md:p-7 sm:p-4 p-3 md:bg-[linear-gradient(to_right,#f0eaea,transparent),url(/images/callback.png)] bg-[linear-gradient(to_bottom,#f0eaea,transparent),url(/images/callback.png)] bg-cover bg-center rounded-2xl lg:flex justify-between items-center">
                <div className='lg:w-[35%]'>
                    <h2 className='font-bold text-2xl md:text-3xl xl:text-[44px] lg:text-4xl my-3'>Bulk Manufacturing Enquiry</h2>
                    <h3 className='text-2xl font-semibold text-emerald-500 my-3'>Discuss Your Third-Party Manufacturing Requirements</h3>
                    <p>Looking to launch your own veterinary or animal nutrition brand? Share your requirements with Katharine Pharma. Our team can review your enquiry and discuss the next steps based on product availability and manufacturing feasibility.</p>
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
                <div className='p-4 xl:w-[50%] lg:w-[45%] lg:mt-0 bg-white rounded-2xl my-6'>
                    <h2 className='font-bold md:text-3xl text-2xl text-[#0c213c] mb-3'>Request a Manufacturing Quote</h2>
                    <p>Get in touch with our team to clarify your queries</p>
                    <form onSubmit={handleSubmit}>
                        <div className='grid md:grid-cols-2 gap-x-4'>
                            <input required type="text" name='name' placeholder='Enter Your Name' className='w-full mt-4 py-2.5 px-3 border rounded-[5px] border-amber-300' />
                            <input type="text" name='company' placeholder='Enter Your Company Name' className='w-full mt-4 py-2.5 px-3 border rounded-[5px] border-amber-300' />
                            <input type="email" name='email' placeholder='Enter Your Email Id' className='w-full mt-4 py-2.5 px-3 border rounded-[5px] border-amber-300'  />
                            <input required type="tel" name='phone' placeholder='Enter Contact No.' className='w-full mt-4 py-2.5 px-3 border rounded-[5px] border-amber-300' />
                            <select required name="category" className='w-full mt-4 py-2.5 px-3 border rounded-[5px] border-amber-300'>
                                <option value="">Select Product Category</option>
                                <option value="Calcium Supplements">Calcium Supplements</option>
                                <option value="Mineral Supplements">Mineral Supplements</option>
                                <option value="Vitamin Supplements">Vitamin Supplements</option>
                                <option value="Liver Tonics">Liver Tonics</option>
                                <option value="Feed Supplements">Feed Supplements</option>
                                <option value="Digestive Supplements">Digestive Supplements</option>
                                <option value="Animal Wellness Products">Animal Wellness Products</option>
                            </select>
                            <select name="product_form" className='w-full mt-4 py-2.5 px-3 border rounded-[5px] border-amber-300'>
                                <option value="">Select Product Form</option>
                                <option value="Liquid">Liquid</option>
                                <option value="Syrup">Syrup</option>
                                <option value="Powder">Powder</option>
                                <option value="Bolus">Bolus</option>
                                <option value="Tablet">Tablet</option>
                            </select>
                           
                        </div>
                        <textarea required name="message" rows="3" placeholder='Please describe your product requirements' className='w-full mt-4 py-2.5 px-3 border rounded-[5px] border-amber-300'  >
                            </textarea>
                        {feedback && <p role={isError ? 'alert' : 'status'} className={`mt-3 text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>{feedback}</p>}
                        <Button type='submit' disabled={pending} className='flex items-center mt-5'><span>{pending ? 'Sending…' : 'Submit Now'}</span> <i className='inline-flex items-center justify-center ml-2.5 w-8 h-8 rounded-full bg-white text-[#0c213c] text-xl'><FiArrowUpRight /></i></Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManufacturingEnquiry
