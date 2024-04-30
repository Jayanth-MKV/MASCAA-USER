"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { ModeToggle } from "@/components/theme/ModeToggle";
import Image from "next/image";
import masicon from "@/img/icon.png"
import stud from "@/img/student.jpg"
import inst from "@/img/instructor.jpg"
import { FRONTEND_URL, FRONTEND_URLI } from "@/utils/constants";
import Link from "next/link";


export function NavbarDemo() {
  return (
    <>
    <div className="w-full flex items-center justify-between p-3 md:px-10 px-2">
      <div className="text-black dark:text-white flex justify-between">
          <Link href={"/"}>
        <div className="flex gap-5 font-extrabold text-xl">
        <Image
              src={masicon}
              alt="Mascaa Logo"
              className="dark:invert"
              width={30}
              height={30}
              priority
              />
              MASCAA
        </div>
              </Link>
      </div>
        <div className="">
        <ModeToggle />
        </div>
    <Navbar className="hidden lg:block"  />
    </div>
    <Navbar className="lg:hidden"  />

</>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("sticky md:fixed top-5 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href={`${FRONTEND_URLI}/auth/signin`}>Create Test</HoveredLink>
            <HoveredLink href={`${FRONTEND_URL}/auth/signin`}>Take Test</HoveredLink>
            <HoveredLink href={`${FRONTEND_URL}/auth/signin`}>Analyze my Confidence</HoveredLink>
            <HoveredLink href={`${FRONTEND_URLI}/auth/signin`}>Monitor Results</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-1 lg:grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Instructor/Recruiter"
              href={`${FRONTEND_URLI}/auth/signin`}
src={inst}
              description="Create & Evaluate Tests like never before."
            />
            <ProductItem
              title="Individual"
              href={`${FRONTEND_URL}/auth/signin`}
src={stud}
              description="Evaluate your confidence and get industry ready"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/pricing">Individual</HoveredLink>
            <HoveredLink href="/pricing">Team</HoveredLink>
            <HoveredLink href="/pricing">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
