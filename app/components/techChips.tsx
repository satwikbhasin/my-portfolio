import React from "react";

type TechChipsProps = {
    techStack: string[] | undefined;
};

export const TechChips: React.FC<TechChipsProps> = ({ techStack }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {techStack && techStack.map((tech) => (
                <span
                    key={tech}
                    className="px-2 py-1 text-xs  text-zinc-400 bg-zinc-800 rounded-full"
                >
                    {tech}
                </span>
            ))}
        </div>
    );
};