import { Card } from "../card";

const NoProjectFound = () => (
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
);

export default NoProjectFound;