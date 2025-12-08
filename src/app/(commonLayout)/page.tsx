import Hero from "@/components/shared/Hero";
import HowItWorks from "@/components/shared/HowItWorks";
import PopularDestinations from "@/components/shared/PopularDestinations";
import Search from "@/components/shared/Search";
import Testimonials from "@/components/shared/Testimonials";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Search />
      <PopularDestinations />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
