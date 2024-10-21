import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { Typewriter } from 'nextjs-simple-typewriter'

const navigation = [
  { name: "projects", href: "/projects" },
  { name: "resume", href: "/resume" },
  { name: "contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={200}
      />
      <nav className=" animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-sea-green hover:text-zinc-100 font-kode-mono"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <h1 className="mt-10 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        {process.env.NEXT_PUBLIC_MY_NAME}
      </h1>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-5 text-center animate-fade-in justify-left">
        <div className="flex flex-row text-sm md:text-lg w-[full] cursor-default">
          <div className="text-gray-500 mr-2">
            Hi there, I am
          </div>
          <div style={{
            background: 'linear-gradient(90deg, #1E7A55 0%, #2FB883 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            width: 'full',
          }}>
            <Typewriter
              words={[
                "an Engineer",
                "a Web Developer",
                "a UI/UX Designer",
                "a Full Stack Software Engineer",
              ]}
              typeSpeed={40}
              deleteSpeed={40}
              delaySpeed={2500}
              cursorStyle="_"
              cursorBlinking
            />
          </div>
        </div>
      </div>
    </div>
  );

}
