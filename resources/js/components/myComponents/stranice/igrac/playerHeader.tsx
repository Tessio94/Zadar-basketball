import type { TeamWithPlayer } from '@/types/propTypes';
import BasketballPlayerIcon from '../../ui/icons/basketballPlayer';

export default function PlayerHeader({
    date_of_birth,
    first_name,
    last_name,
    position,
    height,
    jerseyNumber,
    team,
}: {
    date_of_birth: string | null;
    first_name: string;
    last_name: string;
    position: 'PG' | 'SG' | 'SF' | 'PF' | 'C' | null;
    height: number | null;
    jerseyNumber: number;
    team: TeamWithPlayer[];
}) {
    const name = first_name + ' ' + last_name;

    let datumRodenja;
    let age;

    if (date_of_birth) {
        datumRodenja = new Date(date_of_birth);

        const today = new Date();

        age = today.getFullYear() - datumRodenja.getFullYear();

        const monthDiff = today.getMonth() - datumRodenja.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < datumRodenja.getDate())
        ) {
            age--;
        }
    }

    return (
        <div
            className="flex flex-col justify-between gap-5 border-b border-likar1 bg-[url('/images/design/snow4.jpg')] bg-cover bg-position-[100%_100%] bg-no-repeat px-[5%] py-10 shadow-xl shadow-likar4 md:flex-row md:justify-center lg:gap-15 xl:items-stretch 2xl:gap-20"
            style={
                {
                    '--team-color': team.logo_color ?? 'transparent',
                } as React.CSSProperties
            }
        >
            <div className="w-2/3 shrink-0 max-[450px]:w-full max-lg:mx-auto sm:w-1/2 md:w-[25%] xl:w-[20%]">
                <BasketballPlayerIcon
                    className="team-player-icon h-full w-full rounded-2xl border border-likar3/40 bg-likar4/70 fill-likar4 stroke-likar1 stroke-6 p-0.5 text-slate-900"
                    jerseyColor={team.logo_color}
                />
            </div>

            <div className="flex flex-col justify-between gap-5 max-md:items-center">
                <div className="team-header-card relative flex w-fit flex-row items-center justify-start gap-4 overflow-hidden rounded-full border p-2.5">
                    <img
                        src={`/storage/${team.logo}`}
                        // src={team.logo}
                        alt={`${team.name} logo`}
                        className="z-10 h-8 w-8 rounded-full sm:h-10 sm:w-10"
                    />
                    <span className="z-10 font-heading text-xl font-semibold text-slate-100 sm:text-2xl">
                        {team.name}
                    </span>
                </div>
                <h2 className="font-heading text-4xl font-semibold text-slate-100 my-text-stroke max-md:text-center lg:text-5xl">
                    {name}
                </h2>
                <div className="flex flex-col overflow-hidden rounded-2xl border border-likar1 max-sm:w-2/3 sm:flex-row">
                    <div>
                        <p className="border-likar3/40 bg-slate-900 px-5 py-2 text-center font-heading text-2xl font-semibold text-slate-100 sm:border-r sm:border-b xl:text-3xl">
                            Broj
                        </p>
                        <p className="border-likar3/40 bg-likar4/60 px-3.5 py-2 text-center font-heading text-2xl font-semibold text-slate-100 max-sm:border-b sm:border-r xl:px-5 xl:text-3xl">
                            {jerseyNumber}
                        </p>
                    </div>
                    <div>
                        <p className="border-likar3/40 bg-slate-900 px-3.5 py-2 text-center font-heading text-2xl font-semibold text-slate-100 sm:border-r sm:border-b xl:px-5 xl:text-3xl">
                            Datum rođenja
                        </p>
                        <p className="border-likar3/40 bg-likar4/60 px-3.5 py-2 text-center font-heading text-2xl font-semibold text-slate-100 max-sm:border-b sm:border-r xl:px-5 xl:text-3xl">
                            {date_of_birth
                                ?.split('T')[0]
                                .split('-')
                                .reverse()
                                .join('/')}
                        </p>
                    </div>
                    <div>
                        <p className="border-likar3/40 bg-slate-900 px-3.5 py-2 text-center font-heading text-2xl font-semibold text-slate-100 sm:border-r sm:border-b xl:px-5 xl:text-3xl">
                            Visina
                        </p>
                        <p className="border-likar3/40 bg-likar4/60 px-3.5 py-2 text-center font-heading text-2xl font-semibold text-slate-100 max-sm:border-b sm:border-r xl:px-5 xl:text-3xl">
                            {height}
                        </p>
                    </div>
                    <div>
                        <p className="bg-slate-900 px-3.5 py-2 text-center font-heading text-2xl font-semibold text-slate-100 sm:border-b sm:border-b-likar3/40 xl:px-5 xl:text-3xl">
                            Pozicija
                        </p>
                        <p className="bg-likar4/60 px-3.5 py-2 text-center font-heading text-2xl font-semibold text-slate-100 xl:px-5 xl:text-3xl">
                            {position}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
