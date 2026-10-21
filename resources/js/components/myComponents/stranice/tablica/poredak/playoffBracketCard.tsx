import { ShieldHalf, Trophy } from 'lucide-react';
import { useState } from 'react';
import type { PlayoffSeriesTeam } from '@/types/playoffs';

type PlayoffBracketCardProps = PlayoffSeriesTeam & {
    winner?: boolean;
    eliminated?: boolean;
};

function logoUrl(logo: string | null) {
    if (!logo) return null;
    if (/^(https?:\/\/|\/)/i.test(logo)) return logo;
    return `/storage/${logo.split('/').map(encodeURIComponent).join('/')}`;
}

export default function PlayoffBracketCard({
    team,
    wins,
    placeholder,
    winner = false,
    eliminated = false,
}: PlayoffBracketCardProps) {
    const [failedLogo, setFailedLogo] = useState(false);
    const logo = logoUrl(team?.logo ?? null);

    return (
        <div
            className={`relative flex items-center justify-between gap-3 px-3 py-3 text-slate-100 ${winner ? 'bg-likar3/15' : ''} ${eliminated ? 'opacity-50' : ''}`}
        >
            <div className="flex min-w-0 items-center gap-2.5">
                <span className="w-4 shrink-0 text-center text-xs text-slate-400">
                    {team?.seed ?? '—'}
                </span>
                {logo && !failedLogo ? (
                    <img
                        src={logo}
                        alt=""
                        loading="lazy"
                        onError={() => setFailedLogo(true)}
                        className="size-9 shrink-0 rounded-full bg-white/10 object-contain"
                    />
                ) : (
                    <ShieldHalf
                        aria-hidden="true"
                        className="size-9 shrink-0 rounded-full border border-slate-100/30 bg-slate-200/10 p-1"
                    />
                )}
                <span className="min-w-0 text-left">
                    <span
                        className={`block truncate font-heading text-base ${winner ? 'text-likar3' : ''}`}
                        title={team?.name ?? placeholder}
                    >
                        {team?.name ?? 'TBD'}
                    </span>
                    {!team && placeholder !== 'TBD' && (
                        <span className="block text-[10px] text-slate-400">
                            {placeholder}
                        </span>
                    )}
                </span>
            </div>
            <span className="flex shrink-0 items-center gap-2">
                {winner && (
                    <Trophy
                        aria-label="Pobjednik serije"
                        className="size-3.5 text-likar3"
                    />
                )}
                <span
                    className={`font-heading text-2xl tabular-nums ${winner ? 'text-likar3' : ''}`}
                >
                    {wins ?? '—'}
                </span>
            </span>
        </div>
    );
}
