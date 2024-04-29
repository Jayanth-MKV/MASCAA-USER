"use client"

import Image from "next/image"
import { useState } from "react"
import tb from "@/img/mascaa-thumbnail.png"
import { PlayIcon } from "lucide-react"

const Video = () => {
    const [play, setPlay] = useState(false)
  return (
    <>
<div className="mx-auto max-w-2xl lg:text-center mb-5 text-center">
          <p className="mt-6 text-lg leading-8 text-gray-600">
            MASCAA is a comprehensive human confidence analysis platform. This works in evaluating the confidece of the user taking a test through video and audio .
          </p>
        </div>
      <div className="p-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 ">
      {
        play &&
<div 
   className="flex justify-center py-5 "
   >
    <iframe width="auto" height="515" className="md:w-[860px]"
    src="https://www.youtube.com/embed/3mBNmkHbHKs?si=GkpuYh2WD89gfN3o" 
    title="MASCCA " allow=" autoplay;" referrerPolicy="strict-origin-when-cross-origin" 
    allowFullScreen>
    </iframe>

   </div>}

{!play && 
<div className="relative">
<button className="h-full w-full absolute flex justify-center items-center left-auto z-10" onClick={()=>setPlay(true)}>
    <div className="rounded-full bg-white text-black p-5">
    <PlayIcon width={50} height={50} />
    </div>
</button>
<Image
    src={tb}
    alt="Mascaa Logo"
    className="dark:invert"
    width="860" height="515"
    priority
    />
    </div>
}

    </div>
    </>
)
}

export default Video;