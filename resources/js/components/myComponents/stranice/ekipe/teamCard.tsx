import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/TeamController';
import type { Team } from '@/types/propTypes';

export default function TeamCard({ ekipa }: { ekipa: Team }) {
    return (
        <Link href={show(ekipa.id)}>
            <div
                style={
                    {
                        '--team-color': ekipa.logo_color ?? 'transparent',
                    } as React.CSSProperties
                }
                className="team-card group flex flex-col items-center justify-center gap-5 rounded-2xl bg-likar2/60 p-3"
            >
                <h3 className="rounded-2xl bg-slate-900 px-5 py-1 text-center font-heading text-xl text-likar3">
                    {ekipa.name}
                </h3>
                <img
                    src={ekipa.logo}
                    alt=""
                    className="h-37.5 w-37.5 rounded-full bg-likar1 transition-transform duration-300 group-hover:scale-90 group-hover:rotate-360"
                />
            </div>
        </Link>
    );
}
