import HomeHero from "@/components/sections/HomeHero";
import HomeStats from "@/components/sections/HomeStats";
import HomeWhyUs from "@/components/sections/HomeWhyUs";
import HomeServices from "@/components/sections/HomeServices";
import HomeTestimonials from "@/components/sections/HomeTestimonials";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeStats />
      <HomeServices />
      <HomeWhyUs />
      <HomeTestimonials />
    </>
  );
}
