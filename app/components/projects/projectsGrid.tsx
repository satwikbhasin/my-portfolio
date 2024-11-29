import React from 'react';
import { Card } from "../card";
import { Article } from "./article";
import { Project } from "contentlayer/generated";

interface ProjectsGridProps {
    sorted: Project[];
    views: Record<string, number>;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ sorted, views }) => (
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
);

export default ProjectsGrid;