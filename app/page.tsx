import { Hero } from "@/components/sections/Hero";
import { Showreel, ShowreelCard } from "@/components/sections/Showreel";
import { About } from "@/components/sections/About";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { HowIBuild } from "@/components/sections/HowIBuild";
import { StackGrid } from "@/components/sections/StackGrid";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero media={<ShowreelCard />} />
      <Showreel />
      <About />
      <FeaturedWork />
      <HowIBuild />
      <StackGrid />
    </main>
  );
}
