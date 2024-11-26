import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, Smartphone, Monitor } from "lucide-react";
import { TechChips } from "../components/techChips";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center" style={{ color: "#50C878" }}>
					<span style={{ color: "#33d49a" }} className=" color: #50C878 text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs  flex items-center gap-1" style={{ color: "#33d49a" }}>
						<Eye className="w-4 h-4" />
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<h2 className="z-20 mb-4 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
					{project.title}
				</h2>
				<p className="mb-4 z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{project.description}
				</p>
				<TechChips techStack={project.techStack} />
				<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
					<span className="font-bold text-sm">Best Experience on</span>
					{project.mobileSupported && <Smartphone className="inline-block w-4 h-4 ml-2" color="#33d49a" />}
					{project.desktopSupported && <Monitor className="inline-block w-4 h-4 ml-2" color="#33d49a" />}
				</p>
			</article>
		</Link>
	);
};
