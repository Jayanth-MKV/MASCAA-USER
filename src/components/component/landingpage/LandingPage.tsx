import { HeroHighlight, HeroHighlight1 } from "@/components/ui/hero-highlight";
import Header from "./Header";
import { NavbarDemo } from "./Navbar";
import Video from "./Video";
import HowItWorks from "./HowItWorks";
import { AnimatedListDemo } from "./AnimList";
import { Footer } from "./Footer";
import PricingSection from "@/app/(dashboard)/pricing/page";

const LandingPage = () => {
  return (
    <div className="overflow-y-scroll h-screen">
    <NavbarDemo />
   <Header />
<HeroHighlight1>
  <Video />
</HeroHighlight1>
<div className="my-20"></div>
{/* <HeroHighlight1>
</HeroHighlight1> */}
<HeroHighlight1 >
  <div className="flex justify-center relative">
  <HowItWorks />
  <AnimatedListDemo />
  </div>
</HeroHighlight1>
<div className="my-20"></div>
<div className="relative z-59">
  <PricingSection />
</div>
<Footer />
    </div>
  )
}

export default LandingPage;