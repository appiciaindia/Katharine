import Footer from "@/components/Footer";
import HeaderMain from "@/components/HeaderMain";

export default function MainLayout({ children }) {
  return (
    <>
      <HeaderMain/>
      {children}
      <Footer/>
    </>
  );
}