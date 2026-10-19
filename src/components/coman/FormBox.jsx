"use client";

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import Button from '../Button';
import { IoIosSend } from 'react-icons/io';

const FormBox = () => {
    const [feedback, setFeedback] = useState("");
    const [isError, setIsError] = useState(false);
    const [pending, setPending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPending(true);
        setFeedback("");
        setIsError(false);
        const formElement = event.currentTarget;
        const form = new FormData(formElement);

        try {
            const response = await apiRequest('/enquiries', {
                method: 'POST',
                body: {
                    type: 'contact',
                    name: form.get('name'),
                    email: form.get('email'),
                    phone: form.get('phone'),
                    category: form.get('subject'),
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
        <div className='p-5 lg:p-7 bg-blue-100 rounded-2xl'>
            <h3 className='lg:text-3xl text-2xl font-bold text-[#0c213c] mb-1'>Send Us a Message</h3>
            <h6 className='text-xl font-medium'>Have a Question? Let’s Talk.</h6>
            <p>Fill out the form below and our team will contact you regarding your enquiry.</p>
            <form onSubmit={handleSubmit}>
                <div className='grid md:grid-cols-2 gap-x-5'>
                    <div className='mt-3'>
                        <label htmlFor="name" className='block'>Full Name*</label>
                        <input required id="name" type="text" placeholder='Enter Your Name' name='name' className='bg-white px-4 py-2 rounded-[5px] w-full mt-1' />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" placeholder='Enter Your Email Id' name='email' className='bg-white px-4 py-2 rounded-[5px] w-full mt-1' />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="phone">Mobile Number*</label>
                        <input required id="phone" type="tel" placeholder='Enter Mobile Number' name='phone' className='bg-white px-4 py-2 rounded-[5px] mt-1 w-full' />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="subject">Subject*</label>
                        <select required id="subject" name="subject" className='bg-white px-4 py-2 rounded-[5px] w-full mt-1'>
                            <option value="">Select your enquiry</option>
                            <option value="Product Enquiry">Product Enquiry</option>
                            <option value="Order Enquiry">Order Enquiry</option>
                            <option value="Bulk Order">Bulk Order</option>
                            <option value="Become a Distributor">Become a Distributor</option>
                            <option value="Franchise Business">Franchise Business</option>
                            <option value="Third-Party Manufacturing">Third-Party Manufacturing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className='mt-3'>
                    <label htmlFor="message">Your Message*</label>
                    <textarea required id="message" name="message" rows={4} placeholder='Write your message here...' className='bg-white px-4 py-2 rounded-[5px] w-full mt-1'></textarea>
                </div>
                {feedback && <p role={isError ? 'alert' : 'status'} className={`mt-3 text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>{feedback}</p>}
                <Button type='submit' disabled={pending} className='mt-5 pr-7 cursor-pointer'>
                    <IoIosSend className='mr-2 text-xl' /> <span className='pr-2'>{pending ? 'Sending…' : 'Send Message'}</span>
                </Button>
            </form>
        </div>
    )
}

export default FormBox;
