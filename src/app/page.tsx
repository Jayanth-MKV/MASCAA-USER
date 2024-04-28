import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
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
      // className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
      >
         {/* <strong className="text-3xl">
        MASCAA
        </strong>
        <Image
          className="mt-5 rounded-lg relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          // src="/firstpage-icon.gif"
          src="/icon.png"
          alt="MASCAA Logo"
          width={180}
          height={37}
          priority
        /> */}
       
       <iframe width="860" height="515" src="https://www.youtube.com/embed/3mBNmkHbHKs?si=GkpuYh2WD89gfN3o" title="MASCCA " allow=" autoplay;" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      </div>


    </main>
  );
}
