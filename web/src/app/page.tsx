import { MainTag } from "@/components/atoms";
import { Header } from "@/components/molecules/home";
import HeroSection from "@/components/molecules/home/hero-section";

export default function Home() {
  return (
    <div className="w-full">
        <Header />
        <HeroSection />
    </div>
  );
}
