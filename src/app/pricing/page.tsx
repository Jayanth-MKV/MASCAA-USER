import Header from '@/components/component/landingpage/Header'
import { NavbarDemo } from '@/components/component/landingpage/Navbar'
import React from 'react'
import PricingSection from '../(dashboard)/user/pricing/page'
import { Footer } from '@/components/component/landingpage/Footer'

const page = () => {
  return (
    <div className="overflow-y-scroll h-screen">
    <NavbarDemo />
<div className="relative z-59">
  <PricingSection />
</div>
<Footer />
    </div>  )
}

export default page