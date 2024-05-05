"use client"
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()
    const pathName = usePathname()
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black text-sea-green gap-16">
            <Image src="/404.png" alt="404 Not Found" width={400} height={200} />
            <h1 className="text-2xl text-zinc-400"> {pathName === "/chat" ? "PAGE DOES NOT EXIST [YET]" : "PAGE DOES NOT EXIST"}</h1>
            <button className="text-zinc-100 hover:text-sea-green" onClick={() => { router.back(); }}>&larr; Go Back</button>
        </div>
    )
}