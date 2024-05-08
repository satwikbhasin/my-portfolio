"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation'
import { Typography } from "@mui/material";

export const Navigation: React.FC = () => {
	const pathName = usePathname()
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${isIntersecting
					? "bg-zinc-900/0 border-transparent"
					: "bg-zinc-900/500  border-zinc-800 "
					}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/projects"
							className={`duration-200 ${pathName === '/projects' ? 'text-sea-green' : 'text-zinc-400 hover:text-zinc-100'} font-kode-mono`}>
								projects
						</Link>
						<Link
							href="/resume"
							className={`duration-200 ${pathName === '/resume' ? 'text-sea-green' : 'text-zinc-400 hover:text-zinc-100'} font-kode-mono`}
						>
							resume
						</Link>
						<Link
							href="/contact"
							className={`duration-200 ${pathName === '/contact' ? 'text-sea-green' : 'text-zinc-400 hover:text-zinc-100'} font-kode-mono`}
						>
							contact
						</Link>
						<Link
							href="/message"
							className={`duration-200 ${pathName === '/message' ? 'text-sea-green' : 'text-zinc-400 hover:text-zinc-100 font-kode-mono'}`}
						>
							message
						</Link>
					</div>

					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};
