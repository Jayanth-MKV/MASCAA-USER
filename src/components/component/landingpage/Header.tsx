"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { OrbitingCirclesDemo } from "@/components/icons/OrbitIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
  <HeroHighlight>
      <motion.div className="lg:flex-row flex flex-col md:mt-auto">
    <motion.h1
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [20, -5, 0],
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      className="text-2xl  my-auto px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto  "
      >
      Quick & Easy Test Creation, Evaluation and Confidence Assessment{" "} <br className="md:hidden" />
      <Highlight className="text-black dark:text-white">
        Using MASCAA
      </Highlight>
      <div className="flex justify-center">

      <motion.div
       whileHover={{ scale: 1.1 }}
       whileTap={{ scale: 0.9 }}
       className=" my-10"
      >
      <Link target="__blank" href={"https://cal.com/lurw-org/mascaa-onboarding-15-min-meeting"}>
      <Button className="p-5 lg:text-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 ">
        Book a FREE Demo
      </Button>
      </Link>
      </motion.div>
      <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
       className=" my-10 ml-5"
      >
            <Link href={"/auth/signin"}>
      <Button className="p-5 lg:text-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 ">
        Login
      </Button>
      </Link>
      </motion.div>
      </div>

    </motion.h1>
    <div className="block w-full sm:mt-5">
    <OrbitingCirclesDemo />
    </div>
              </motion.div>
  </HeroHighlight>
    )
}

export default Header;