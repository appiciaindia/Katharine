import AboutHero from "@/components/coman/AboutHero";
import AboutSection from "@/components/about/AboutSection";
import MissionVision from "@/components/about/MissionVision";
import BusinessSolutions from "@/components/home/BusinessSolutions";
import ChooseSection from "@/components/home/ChooseSection";

export default function About() {
  return (
    <>
      <AboutHero title={"About Us"} heading={"Better Nutrition for Healthier Animals"} para={"Welcome to Katharine Pharma, your destination for animal nutrition, veterinary supplements, and animal wellness products. We are focused on making quality nutritional products easily accessible for farmers, pet owners, retailers, distributors, and businesses across India."} bannerBtn="true"/>
      <AboutSection/>
      <MissionVision/>
      <ChooseSection/>
      <BusinessSolutions/>
    </>
  );
}