import AboutSection from "@/components/home/AboutSection";
import AnimalNutritionDivisions from "@/components/home/AnimalNutritionDivisions";
import BlogSection from "@/components/home/BlogSection";
import BusinessSolutions from "@/components/home/BusinessSolutions";
import CallBackSection from "@/components/home/CallBackSection";
import Categories from "@/components/home/Categories";
import ChooseSection from "@/components/home/ChooseSection";
import HeroSection from "@/components/home/HeroSection";
import ProductForms from "@/components/home/ProductForms";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <AboutSection/>
      <Categories/>
      <ChooseSection/>
      <ProductForms/>
      <AnimalNutritionDivisions/>
      <BusinessSolutions/>
      <BlogSection/>
      <CallBackSection/>
    </>
  );
}
