import type { Team } from '@/types/propTypes';

export default function TeamHeading({ logo, name }: Partial<Team>) {
    return (
        <div className="flex flex-row items-center gap-10 border-b border-likar1 p-5">
            <img
                src={logo}
                alt={`${name} logo`}
                className="h-30 w-30 rounded-2xl"
            />
            <h2 className="font-heading text-4xl font-semibold text-slate-100">
                {name}
            </h2>
        </div>
    );
}
