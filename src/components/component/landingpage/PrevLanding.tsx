import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const PrevLanding = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by reaching home &nbsp;
          <code className="font-mono font-bold"></code>
        </p>
        <div className="mb-32 flex gap-3 text-center  lg:mb-0 lg:grid-cols-4 lg:text-left">
      <a href="/home">
      <Button>Home</Button>
      </a>
      <a href="/pricing">
      <Button>Pricing</Button>
      </a>
      <a href="/test">
      <Button>Your Tests</Button>
      </a>
      {/* <a href="/test/available">
      <Button>Check Available Tests</Button>
      </a> */}
      <a href="/test/take">
      <Button>Take Test</Button>
      </a>
      <a href="/auth/signout">
      <Button>Logout</Button>
      </a>
      </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-1"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" MASCAA "}
            <Image
              src="/icon.png"
              alt="Mascaa Logo"
              className="dark:invert"
              width={24}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div 
      className="text-center py-5"
      >
       <iframe width="860" height="515" 
       src="https://www.youtube.com/embed/3mBNmkHbHKs?si=GkpuYh2WD89gfN3o" 
       title="MASCCA " allow=" autoplay;" referrerPolicy="strict-origin-when-cross-origin" 
       allowFullScreen>
        
       </iframe>
      </div>


    </main>  )
}

export default PrevLanding