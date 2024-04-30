import { HeroHighlight1 } from "@/components/ui/hero-highlight";
import Header from "./Header";
import { NavbarDemo } from "./Navbar";
import Video from "./Video";
import HowItWorks from "./HowItWorks";
import { AnimatedListDemo } from "./AnimList";
import { Footer } from "./Footer";
import PricingSection from "@/app/(dashboard)/user/pricing/page";

const LandingPage = () => {
  return (
    <div className="overflow-y-scroll h-screen">
    <NavbarDemo />
   <Header />
<HeroHighlight1>
  <Video />
</HeroHighlight1>
<div className="h-[100px]"></div>
<div className="h-[100px]"></div>

{/* <HeroHighlight1>
</HeroHighlight1> */}
<HeroHighlight1 >
  <div className="flex flex-col  lg:flex-row justify-center relative">
  <HowItWorks />
  <AnimatedListDemo />
<div className="h-[100px]"></div>
  </div>
</HeroHighlight1>
<br />
<div className="lg:hidden h-[100px]"></div>
<div className="h-[100px] lg:hidden "></div>
<div className="h-[100px]"></div>
<div className="relative z-59">
  <PricingSection />
</div>
<Footer />
    </div>
  )
}

export default LandingPage;