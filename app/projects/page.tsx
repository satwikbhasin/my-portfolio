'use client';
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Eye, Smartphone, Monitor } from "lucide-react";
import { TechChips } from "../components/techChips";
import { getViewCounts } from "@/util/viewCounts";
import "../styling/projectsPage.css";
import ProjectsFilter from "../components/projectsFilter";

export default function ProjectsPage() {
  const [views, setViews] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const techStack = searchParams ? searchParams.getAll('techStack') : [];
  const [searchValue, setSearchValue] = useState<string[]>(techStack);

  useEffect(() => {
    getViewCounts().then(fetchedViews => {
      setViews(fetchedViews);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchParams) {
      setSearchValue(searchParams.getAll('techStack'));
    }
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    return searchValue.length > 0
      ? allProjects.filter((project) =>
        searchValue.every((tech) => (project.techStack ?? []).includes(tech))
      )
      : allProjects;
  }, [searchValue]);

  const featured = useMemo(() => searchValue.length === 0 ? filteredProjects.find((project) => project.slug === "evalutron") : undefined, [filteredProjects, searchValue]);
  const top2 = useMemo(() => searchValue.length === 0 ? filteredProjects.find((project) => project.slug === "virtualvault") : undefined, [filteredProjects, searchValue]);
  const top3 = useMemo(() => searchValue.length === 0 ? filteredProjects.find((project) => project.slug === "unichat") : undefined, [filteredProjects, searchValue]);

  const sorted = useMemo(() => {
    return filteredProjects
      .filter((p) => p.published)
      .filter(
        (project) =>
          project.slug !== featured?.slug &&
          project.slug !== top2?.slug &&
          project.slug !== top3?.slug,
      )
      .sort(
        (a, b) =>
          new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
          new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
      );
  }, [filteredProjects, featured, top2, top3]);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto max-w-7xl lg:px-8 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are academic and some are on my own time.
          </p>
        </div>
        <div className="w-full mt-8 mb-4 h-px bg-zinc-800" />
        <ProjectsFilter searchValue={searchValue} setSearchValue={setSearchValue} />
        {filteredProjects.length === 0 ? (
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            <Card>
              <div className="relative w-full h-full p-4 md:p-8">
                <h2 className="mt-4 mb-4 text-3xl font-bold text-zinc-100 sm:text-4xl font-display">
                  No matching projects found
                </h2>
                <p className="mt-4 leading-8 text-zinc-400">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            </Card>
          </div>
        ) : (
          <>
            {searchValue.length === 0 && (
              <div>
                <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
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
            )}
            <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
              <div className="grid grid-cols-1 gap-4">
                {sorted
                  .filter((_, i) => i % 3 === 0)
                  .map((project) => (
                    <Card key={project.slug}>
                      <Article project={project} views={views[project.slug] ?? 0} />
                    </Card>
                  ))}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {sorted
                  .filter((_, i) => i % 3 === 1)
                  .map((project) => (
                    <Card key={project.slug}>
                      <Article project={project} views={views[project.slug] ?? 0} />
                    </Card>
                  ))}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {sorted
                  .filter((_, i) => i % 3 === 2)
                  .map((project) => (
                    <Card key={project.slug}>
                      <Article project={project} views={views[project.slug] ?? 0} />
                    </Card>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}