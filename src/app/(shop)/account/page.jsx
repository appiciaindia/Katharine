"use client"

import Dashboard from '@/components/account/Dashboard';
import React from 'react';


const page = () => {

    const user = {
        name: "Vinod Kumar",
        email: "vinod3de@gmail.com",
        mob: "9876543210"
    }

    return (

        <Dashboard userName={user.name} userMail={user.email} mob={user.mob} />

    )
}

export default page;
