import PreLoader from "@/components/PreLoader";
import Hero from "@/components/Hero";
import WorksGallery from "@/components/WorksGallery";
import About from "@/components/About";
import Sketchbook from "@/components/Sketchbook";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full z-0 font-sans">
      <PreLoader />
      <Hero />
      <WorksGallery />
      <About />
      <Sketchbook />
      <Footer />
    </main>
  );
}
