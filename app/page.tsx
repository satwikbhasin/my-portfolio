'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import { Typewriter } from 'nextjs-simple-typewriter';

const navigation = [
  { name: "projects", href: "/projects" },
  { name: "resume", href: "/resume" },
  { name: "contact", href: "/contact" },
];

export default function Home() {
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypewriter(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={200}
      />
      <nav className="animate-fade-in">
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
      <div className="flex flex-col items-center mt-10 z-10">
        <h1 className="text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
          {process.env.NEXT_PUBLIC_MY_NAME}
        </h1>
        <div className="flex flex-row items-center justify-end w-full mt-5 text-center animate-fade-in">
          <div className="text-gray-500 mr-2">
            Hi there, I am
          </div>
          {showTypewriter && (
            <div
              style={{
                background: 'linear-gradient(90deg, #1E7A55 0%, #2FB883 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                width: 'full',
              }}
            >
              <Typewriter
                words={[
                  "an Engineer",
                  "a Web Developer",
                  "a Fitness Enthusiast",
                  "a UI/UX Designer",
                  "a Full Stack Software Engineer",
                ]}
                typeSpeed={50}
                deleteSpeed={100}
                delaySpeed={800}
              />
            </div>
          )}
        </div>
      </div>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
    </div>
  );
}