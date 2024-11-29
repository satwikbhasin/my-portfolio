'use client';
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { getViewCounts } from "@/util/viewCounts";
import "../styling/projectsPage.css";
import ProjectsFilter from "@/app/components/projects/projectsFilter";
import FeaturedProjects from "@/app/components/projects/featuredProjects";
import ProjectsGrid from "@/app/components/projects/projectsGrid";
import NoMatchingProjects from "@/app/components/projects/noProjectFound";

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
        <NoMatchingProjects />
      ) : (
        <>
          {searchValue.length === 0 && (
            <FeaturedProjects featured={featured} top2={top2} top3={top3} views={views} loading={loading} />
          )}
          <ProjectsGrid sorted={sorted} views={views} />
        </>
      )}
    </div>
  </div>
);
}