"use client";
import { Github, Mail, Linkedin, ArrowDown } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import MessageForm from "@/app/components/messageForm";
import { useEffect, useRef } from "react";

const socials = [
	{
		icon: <Linkedin size={20} />,
		href: "https://linkedin.com/in/satwikbhasin",
		label: "LinkedIn",
		handle: "satwikbhasin",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:satwikbhasin@gmail.com",
		label: "Email",
		handle: "satwikbhasin@gmail.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/satwikbhasin",
		label: "Github",
		handle: "satwikbhasin",
	},
];

export default function Contact() {
	const arrowRef = useRef<SVGSVGElement>(null);

	const scrollToForm = () => {
		document.getElementById("message-form")?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		const style = document.createElement("style");
		style.innerHTML = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
            .bounce {
                animation: bounce 2s infinite;
            }
        `;
		document.head.appendChild(style);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						arrowRef.current?.classList.add("hidden");
					} else {
						arrowRef.current?.classList.remove("hidden");
					}
				});
			},
			{
				threshold: 0.04,
			}
		);

		const messageForm = document.getElementById("message-form");
		if (messageForm) {
			observer.observe(messageForm);
		}

		return () => {
			if (messageForm) {
				observer.unobserve(messageForm);
			}
		};
	}, []);

	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-full">
			<Navigation />
			<div className="flex items-center flex-col w-screen pt-24 pb-10 gap-3 md:pr-32 md:pl-32">
				<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl pl-6 md:pl-32 w-screen">
					Social
				</h2>
				<div className="w-full h-px bg-zinc-800 mb-5" />
				<div className="flex items-center flex-col w-screen gap-5 mb-28">
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6 w-3/4 md:w-screen md:pl-32 md:pr-32">
						{socials.map((s) => (
							<Card key={s.href}>
								<Link
									href={s.href}
									target="_blank"
									className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:pb-8 lg:pb-24 md:p-16"
								>
									<span
										className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
										aria-hidden="true"
									/>
									<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-sea-green group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-sea-green drop-shadow-orange">
										{s.icon}
									</span>
									<div className="z-10 flex flex-col items-center">
										<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-sea-green font-display">
											{s.handle}
										</span>
										<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200 font-kode-mono">
											{s.label}
										</span>
									</div>
								</Link>
							</Card>
						))}
					</div>
				</div>
				<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl pl-6 md:pl-32 w-screen">
					Direct Message
				</h2>
				<div className="w-full h-px bg-zinc-800 mb-5" />
				<div id="message-form" className="w-screen mb-10">
					<MessageForm />
				</div>
			</div>
			<div className="fixed bottom-5 right-5">
				<ArrowDown ref={arrowRef} size={26} className="text-sea-green cursor-pointer bounce" onClick={scrollToForm} />
			</div>
		</div>
	);
}