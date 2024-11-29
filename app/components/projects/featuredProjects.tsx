import Link from "next/link";
import { Card } from "../card";
import { Eye, Smartphone, Monitor } from "lucide-react";
import { TechChips } from "./techChips";
import { Article } from "../../projects/article";
import { Project } from "contentlayer/generated";

interface FeaturedProjectsProps {
    featured?: Project;
    top2?: Project;
    top3?: Project;
    views: Record<string, number>;
    loading: boolean;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ featured, top2, top3, views, loading }) => (
    <div>
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 mb-8">
            {featured && (
                <Card>
                    <Link href={`/projects/${featured.slug}`}>
                        <article className="relative w-full h-full p-4 md:p-8">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-xs" style={{ color: "#33d49a" }}>
                                    {featured.date ? (
                                        <time dateTime={new Date(featured.date).toISOString()}>
                                            {Intl.DateTimeFormat(undefined, {
                                                dateStyle: "medium",
                                            }).format(new Date(featured.date))}
                                        </time>
                                    ) : (
                                        <span>SOON</span>
                                    )}
                                </div>
                                <span className="flex items-center gap-1 text-xs text-zinc-500" style={{ color: "#33d49a" }}>
                                    <Eye className="w-4 h-4" />
                                    {loading ? (
                                        <div className="viewsLoader" />
                                    ) : (
                                        Intl.NumberFormat("en-US", { notation: "compact" }).format(
                                            views[featured.slug] ?? 0,
                                        )
                                    )}
                                </span>
                            </div>

                            <h2
                                id="featured-post"
                                className="mt-4 mb-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                            >
                                {featured.title}
                            </h2>
                            <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300 mb-4">
                                {featured.description}
                            </p>
                            <TechChips techStack={featured.techStack} />
                            <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                                <span className="font-bold text-sm">Best Experience on</span>
                                {featured.mobileSupported && <Smartphone className="inline-block w-4 h-4 ml-2" color="#33d49a" />}
                                {featured.desktopSupported && <Monitor className="inline-block w-4 h-4 ml-2" color="#33d49a" />}
                            </p>
                            <div className="absolute bottom-4 md:bottom-8">
                                <p className="mt-5 hidden text-zinc-200 hover:text-zinc-50 lg:block" style={{ color: "#33d49a" }}>
                                    Read more <span aria-hidden="true">&rarr;</span>
                                </p>
                            </div>
                        </article>
                    </Link>
                </Card>
            )}

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
                {[top2, top3].filter(Boolean).map((project) => (
                    project && (
                        <Card key={project.slug}>
                            <Article project={project} views={views[project.slug] ?? 0} />
                        </Card>
                    )
                ))}
            </div>
        </div>
        <div className="hidden mt-16 mb-16 w-full h-px md:block bg-zinc-800" />
    </div>
);

export default FeaturedProjects;