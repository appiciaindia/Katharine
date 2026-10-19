import React from 'react';

const AboutSection = () => {
  return (
    <div className='px-3 py-5 lg:py-20 md:py-14 lg:px-10 md:px-7 lg:flex lg:items-center'>
      <div className="lg:pr-13 lg:w-1/2">
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold my-3'>Who We Are</h2>
        <p>Katharine Pharma is an animal nutrition and veterinary products business focused on providing a convenient way to discover and purchase products for everyday animal care.</p>
        <p>We understand that different animals have different nutritional requirements. Our aim is to provide a diverse product range with clear product information so customers can easily explore products according to their animal category and requirements.</p>
        <p>Whether you are a farmer looking for cattle or goat supplements, a poultry business searching for nutritional products, or a pet owner looking for suitable wellness products, Katharine Pharma brings relevant product categories together in one place.</p>
        <p>Our product range is designed for the nutritional and wellness needs of different animals, including cattle, goats, poultry, dogs, cats, and other animals. From mineral and calcium supplements to vitamins, liver tonics, feed supplements, digestive support, and other animal wellness products, we bring different solutions together in one convenient platform.</p>
      </div>
      <div className="h-full lg:w-1/2 lg:mt-0 mt-6">
        <img src="images/about.png" alt="About Us" className='rounded-2xl h-full w-full object-cover' />
      </div>
    </div>
  )
}

export default AboutSection;
