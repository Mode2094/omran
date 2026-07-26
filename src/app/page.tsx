import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import FeaturedResearch from "@/components/home/FeaturedResearch";
import SocialLinks from "@/components/home/SocialLinks";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedBooks />
        <FeaturedResearch />
        <SocialLinks />
      </main>
      <Footer />
    </>
  );
}
