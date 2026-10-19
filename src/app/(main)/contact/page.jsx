import AboutHero from '@/components/coman/AboutHero';
import BusinessEnquiries from '@/components/contact/BusinessEnquiries';
import ContactForm from '@/components/contact/ContactForm';
import React from 'react' ;

const page = () => {
  return (
    <div>
      <AboutHero title={"Contact Us"} heading={"Get in Touch with Katharine Pharma"} para={"Have questions about our animal nutrition products, orders, or business opportunities? Connect with Katharine Pharma today for reliable assistance and support."} bannerBtn='false'/>
      <ContactForm/>
      <BusinessEnquiries/>
    </div>
  )
}

export default page ;
