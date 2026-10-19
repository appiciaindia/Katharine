import AboutSection from '@/components/coman/AboutSection';
import Become from '@/components/coman/Become';
import BenefitSection from '@/components/coman/BenefitSection';
import CtaSection from '@/components/coman/CtaSection';
import FormBox from '@/components/coman/FormBox';
import HeroSection from '@/components/coman/HeroSection';
import ProcessSection from '@/components/coman/ProcessSection';
import ProductsListFaq from '@/components/coman/ProductsListFaq';
import Categories from '@/components/home/Categories';
import React from 'react';

const page = () => {

    const heroText = {
        title: "Veterinary Pharma Franchise & Distribution Opportunities",
        title2: "Build Your Business in the Growing Animal Nutrition & Veterinary Sector",
        tagline: "START YOUR BUSINESS WITH KATHARINE PHARMA",
        para: "Partner with Katharine Pharma and explore business opportunities in animal nutrition and veterinary products. Choose from our product portfolio and discuss franchise or distribution opportunities for your preferred territory.",
        btntext: "Get Franchise Now",
        btnurl: "#booknow",
        btntext2: "Explore Products",
        btnurl2: "/shop",
        img: "/images/franchise-hero.webp"
    }

    const abouttext = {
        title: "Join the Katharine Pharma Franchise Network",
        para: [
            "Katharine Pharma is focused on providing animal nutrition and wellness products for different animal-care requirements. Our portfolio includes nutritional supplements and veterinary products designed for cattle, goats, poultry, dogs, cats and other animals, according to product availability.",
            "We are inviting distributors, entrepreneurs, wholesalers and business professionals to explore partnership opportunities with Katharine Pharma.",
            "Whether you are already working in the veterinary or animal nutrition sector or planning to start a new business, you can connect with our team to discuss available products, territories and business requirements."
        ],
        subtitle: "Best Low-Cost Franchise",
        img: "/images/franchise-business.png",
    }

    const whytext = {
        titel: "Why Choose Katharine Pharma Franchise?",
        subtitle: "Why Partner with Katharine Pharma?",
        para: "Our franchise and distribution model is designed to help business partners explore the animal nutrition market with a structured product portfolio and business support.",
        chData: [
            {
                title: "Wide Product Range",
                para: "Explore multiple categories of animal nutrition and wellness products.",
                img: "/icons/products.png",
            },
            {
                title: "Business Opportunity",
                para: "Build a business around veterinary and animal nutrition products according to your market.",
                img: "/icons/earning.png",
            },
            {
                title: "Territory-Based Partnership",
                para: "Discuss your preferred city, district or territory with our team.",
                img: "icons/business.png",
            },
            {
                title: "Product Information",
                para: "Get relevant information about products, formulations, packaging and categories.",
                img: "/icons/product-information.png",
            },
            {
                title: "Marketing Assistance",
                para: "Available promotional and marketing materials can be discussed as part of the partnership.",
                img: "/icons/ch1.png",
            },
            {
                title: "Partner Support",
                para: "Get assistance during the enquiry, product selection and ordering process.",
                img: "icons/business.png",
            },
        ]
    }

    const proText = {

        title: "Start Your Business Journey in 3 Simple Steps",
        data: [
            {
                title: "Submit Your Enquiry",
                para: "Share your basic business details, preferred location and product requirements with our team."
            },
            {
                title: "Discuss Your Requirements",
                para: "Discuss products, territory availability, order requirements and applicable commercial terms with our team."
            },
            {
                title: "Start Your Partnership",
                para: "Complete the required formalities, confirm your order and begin your business journey with Katharine Pharma."
            },
        ]
    }

    const becomeText = {
        title: 'WHO CAN BECOME OUR PARTNER?',
        subtitle: "Is Katharine Pharma Franchise Right for You?",
        para: 'Our franchise opportunities can be relevant for:',
        bsdata: [
            {
                title: 'Veterinary Distributors',
                para: "Existing distributors looking to expand their product portfolio."
            },
            {
                title: 'Pharma Distributors',
                para: "Businesses already working in pharmaceutical distribution."
            },
            {
                title: 'Veterinary Wholesalers',
                para: "Wholesalers looking to add animal nutrition products."
            },
            {
                title: 'Retailers',
                para: "Veterinary and animal-care retailers looking for additional products."
            },
            {
                title: 'Entrepreneurs',
                para: "Individuals planning to enter the veterinary business."
            },
            {
                title: 'Regional Business Partners',
                para: "Businesses interested in developing a local distribution network."
            },
        ]
    }

    const faqs ={
        title:'Frequently Asked Questions',
        faqs:[
            {
            question:'What is a Veterinary Pharma Franchise?',
            answer:"A Veterinary Pharma Franchise is a business arrangement where a partner promotes or distributes a company's veterinary products within an agreed territory and according to mutually agreed terms."
        },
        {
            question:'Who can apply for Katharine Pharma Franchise?',
            answer:"Distributors, wholesalers, retailers, entrepreneurs and businesses interested in veterinary or animal nutrition products can submit an enquiry."
        },
        {
            question:'What products can I get through the franchise?',
            answer:"Depending on the current portfolio, products may include calcium, minerals, vitamins, liver tonics, feed supplements, digestive supplements, immunity products and other animal wellness products."
        },
        {
            question:'Can I select my preferred territory?',
            answer:"Yes. You can mention your preferred state, district or city. Territory availability will be confirmed by the Katharine Pharma team."
        },
        {
            question:'Is monopoly available?',
            answer:"Any exclusive territory or monopoly arrangement depends on the actual partnership agreement. It should be confirmed in writing before being represented as an exclusive right."
        },
        {
            question:'Can an existing distributor apply?',
            answer:"Yes. Existing veterinary, pharmaceutical and animal nutrition distributors can enquire about adding Katharine Pharma products to their portfolio."
        },
        {
            question:'Do I need a licence?',
            answer:"Requirements depend on the type of products being distributed and applicable laws. Product-specific regulatory and licensing requirements should be verified before starting the business."
        },
        {
            question:'How can I apply?',
            answer:"Submit the franchise enquiry form with your name, business details, location and product requirements."
        },
        ]
    }

    const ctaText = {
        title:'Ready to Build Your Veterinary Business?',
        subtitle:'Partner with Katharine Pharma',
        para:"Explore our veterinary and animal nutrition product portfolio and discuss the franchise or distribution opportunity available for your market.",
        btntext:"Get Franchise Now",
        btnurl:'#booking',
        btntext2:'View Products',
        btnurl2:"/shop"
    }

    return (
        <div>
            <HeroSection title={heroText.title} tagline={heroText.tagline} title2={heroText.title2} btn2text={heroText.btntext2} btn2url={heroText.btnurl2} btnUrl={heroText.btnurl} btntext={heroText.btntext} heroImg={heroText.img} para={heroText.para} />
            <AboutSection title={abouttext.title} subtitle={abouttext.subtitle} para={abouttext.para} img={abouttext.img} />
            <BenefitSection title={whytext.titel} subtitle={whytext.subtitle} para={whytext.para} bsdata={whytext.chData} />
            <Categories />
            <div className='lg:mb-20 md:mb-14 mb-8'>
                <ProcessSection title={proText.title} psData={proText.data} />
            </div>
            <CtaSection title={ctaText.title} subtitle={ctaText.subtitle} para={ctaText.para} btntext={ctaText.btntext} btntext2={ctaText.btntext2} btnurl={ctaText.btnurl} btnurl2={ctaText.btnurl2} />
            <div className='lg:px-10 md:px-7 relative px-4 py-10 md:py-14 lg:py-20 lg:grid-cols-2 grid gap-8'>
                <Become title={becomeText.title} para={becomeText.para} subtitle={becomeText.subtitle} bsdata={becomeText.bsdata}/>
                <ProductsListFaq title={faqs.title} faqs={faqs.faqs}/>
            </div>
            <div className='lg:px-10 md:px-7 px-4 pb-10 md:pb-14 lg:pb-20' id="booking">
                <FormBox/>
            </div>
        </div>
    )
}

export default page;
