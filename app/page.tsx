import { AudienceFooter } from "@/components/AudienceFooter";
import { Benefits } from "@/components/Benefits";
import { CyberBackground } from "@/components/CyberBackground";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { TrackCards } from "@/components/TrackCards";

export default function Home() {
  return (
    <>
      <CyberBackground />
      <Navbar />
      <main>
        <Hero />
        <TrackCards />
        <Benefits />
        <AudienceFooter />
      </main>
    </>
  );
}
