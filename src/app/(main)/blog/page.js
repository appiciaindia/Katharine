import BlogCard from '@/components/blog/BlogCard';
import HeroSection from '@/components/coman/HeroSection';
import blogs from '@/data/blogs';
import React from 'react';

const page = () => {

  const herotext = {
    title: "Animal Nutrition & Care Insights",
    tagline: "KATHARINE PHARMA BLOG",
    para: "Discover useful information, nutritional guidance and helpful insights about animal health, veterinary products, feeding practices and everyday animal care. Explore our latest articles to learn more about animal nutrition and wellness.",
    btnurl: "/shop",
    btntext: "Explore Products",
    img: "/images/cta.png"
  }

  return (
    <>
      <HeroSection tagline={herotext.tagline} title={herotext.title} para={herotext.para} btnUrl={herotext.btnurl} btntext={herotext.btntext} heroImg={herotext.img} />
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-6 px-3 md:px-8 lg:px-14 py-10 md:py-14 lg:py-20">
        {blogs.map((item) => {
          return (
            <BlogCard blog={item} key={item.id}></BlogCard>
          )
        })}
      </div>
    </>
  )
}

export default page;
