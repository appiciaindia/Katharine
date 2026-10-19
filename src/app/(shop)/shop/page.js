import FeaturedSection from '@/components/FeaturedSection';
import BestSelling from '@/components/shoping/BestSelling';
import Categories from '@/components/shoping/Categories';
import CtaSection from '@/components/shoping/CtaSection';
import FeaturedProducts from '@/components/shoping/FeaturedProducts';
import Hero from '@/components/shoping/Hero';
import NewArrivals from '@/components/shoping/NewArrivals';
import OfferBanner from '@/components/shoping/OfferBanner ';
import React from 'react' ;

const page = () => {
  return (
    <div>
    <Hero/>
    <Categories/>
    <FeaturedProducts/>
    <OfferBanner/>
    <NewArrivals/>
    <CtaSection/>
    <BestSelling/>
    <FeaturedSection/>
    </div>
  )
}

export default page ;
