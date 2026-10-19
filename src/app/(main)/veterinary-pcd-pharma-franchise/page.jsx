import AboutSection from '@/components/coman/AboutSection'
import BenefitSection from '@/components/coman/BenefitSection'
import FormBox from '@/components/coman/FormBox'
import HeroSection from '@/components/coman/HeroSection'
import ProductsListFaq from '@/components/coman/ProductsListFaq'
import React from 'react'

const page = () => {

    const herotext = {
        title:"Veterinary PCD Pharma Franchise in India",
        title2:"Start Your Animal Nutrition Business with Katharine Pharma",
        tagline:"Business Opportunity",
        para:"Partner with Katharine Pharma and explore business opportunities in the veterinary nutrition sector. Discover our range of animal nutrition and wellness products and enquire about becoming a franchise or distribution partner.",
        btnurl:"#booknow",
        btntext:"Apply for Franchise",
        btn2url:"/shop",
        btn2text:"Explore Products",
        img:"/images/fs-hero.png"
    }
    const aboutData = {
        title:"Veterinary PCD Pharma Franchise in India",
        subtitle:"Start Your Veterinary PCD Franchise Business with Katharine Pharma",
        para:[
            "The veterinary industry offers business opportunities in animal nutrition, feed supplements and animal wellness products. With increasing attention to animal nutrition and livestock care, distributors and entrepreneurs can explore opportunities in this sector.",
            "Katharine Pharma welcomes entrepreneurs, distributors, wholesalers and business professionals interested in the veterinary nutrition industry. Our Veterinary PCD Pharma Franchise programme provides an opportunity to explore the distribution of our animal nutrition and wellness products under mutually agreed business terms.",
            "Whether you are an established distributor or planning to enter the animal nutrition business, you can connect with our team to understand the available products, franchise requirements, territory options and business terms."
        ],
        img:"/images/become-a-distributor.png"
    }
    const benefitDate = {
        title:'Advantages of Being Our Veterinary PCD Franchise',
        subtitle:"Explore the Benefits of Partnering with Katharine Pharma",
        para:"A Veterinary PCD franchise provides a business framework for promoting and distributing products within an agreed territory. Katharine Pharma offers prospective partners an opportunity to discuss the following business benefits, subject to the agreed franchise terms.",
        chdata:[
            {
              title:"Wide Product Range",
              para:"Explore animal nutrition products across different categories, including calcium, minerals, vitamins, liver tonics and other nutritional supplements, subject to availability.",
              img:"/icons/products.png"
            },
            {
              title:"Territory-Based Opportunities",
              para:"Enquire about distribution opportunities in your preferred city, district or state. Any exclusive or monopoly rights will depend on the final agreement.",
              img:"/icons/cb3.png"
            },
            {
              title:"Business Partnership",
              para:"Build a business relationship with Katharine Pharma through clearly discussed product, distribution and commercial terms.",
              img:"/icons/business.png"
            },
            {
              title:"Enquiry and Partner Assistance",
              para:"Our team can help prospective partners understand the available products, application process and proposed business terms.",
              img:"/icons/cb1.png"
            },
        ]
    }
    const aboutTwo = {
        title:"Veterinary PCD Franchise: A Business Opportunity",
        subtitle:"Build Your Distribution Business with Katharine Pharma",
        para:[
            "The Veterinary PCD Pharma Franchise model allows a business partner to promote and distribute products under a company's brand, subject to a formal agreement. It provides an organised way to explore the veterinary nutrition market without developing a product portfolio independently.",
            "At Katharine Pharma, prospective franchise partners can enquire about product availability, business requirements, order quantities and distribution arrangements. The proposed partnership can be discussed according to the partner's location, business experience and commercial requirements."
        ],
        img:"/images/franchise-business.png"
    }

    const faqs = [
        {
            question: "What is a Veterinary PCD Pharma Franchise?",
            answer:
                "A Veterinary PCD Pharma Franchise is a business arrangement in which a company authorises a distributor or entrepreneur to promote and distribute its veterinary products under agreed terms. PCD stands for Propaganda Cum Distribution."
        },
        {
            question: "How can I apply for a Katharine Pharma franchise?",
            answer:
                "You can submit the franchise enquiry form on this page with your name, mobile number, business details and preferred location. Our team can then discuss the available opportunities and requirements."
        },
        {
            question: "Who can apply for a Veterinary PCD Pharma Franchise?",
            answer:
                "Distributors, wholesalers, retailers, entrepreneurs and existing veterinary or animal nutrition businesses can enquire. The final eligibility requirements depend on the proposed business arrangement and applicable regulations."
        },
        {
            question: "Is a monopoly franchise available?",
            answer:
                "Territory-based or exclusive distribution rights may be discussed, subject to availability and the final written agreement. Exclusivity should not be assumed until it is confirmed in writing."
        },
        {
            question: "Is GST registration required?",
            answer:
                "GST and other registration requirements depend on the nature of the business, turnover and applicable law. You should confirm the requirements for your proposed business before starting."
        },
    ];

  return (
    <div>
      <HeroSection title={herotext.title} tagline={herotext.tagline} title2={herotext.title2} btn2text={herotext.btn2text} btn2url={herotext.btn2url} btnUrl={herotext.btn2url} btntext={herotext.btntext} para={herotext.para} heroImg={herotext.img} />
      <AboutSection title={aboutData.subtitle} subtitle={aboutData.title} para={aboutData.para} img={aboutData.img}/>
      <BenefitSection title={benefitDate.title} subtitle={benefitDate.subtitle} para={benefitDate.para} bsdata={benefitDate.chdata} />
      <AboutSection title={aboutTwo.subtitle} subtitle={aboutTwo.title} para={aboutTwo.para} img={aboutTwo.img}/>
      <div className="grid lg:grid-cols-2 py-10 lg:py-20 md:py-14 px-3 md:px-7 lg:px-10">
                <FormBox/>
                <ProductsListFaq title={"FAQs About Liquid Animal Supplements"} faqs={faqs} />
            </div>
    </div>
  )
}

export default page
