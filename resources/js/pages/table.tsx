import { Head } from '@inertiajs/react';
// import PlayoffBracket from '@/components/myComponents/stranice/tablica/poredak/playoffBracket';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
import TableStandings from '@/components/myComponents/stranice/tablica/poredak/tableStandings';
import TableResults from '@/components/myComponents/stranice/tablica/rezultati/tableResults';
import type {
    GameWithTeams,
    TableStandings as TableStandingsType,
} from '@/types/propTypes';

export default function Table({
    season,
    standings,
    games,
}: {
    standings: TableStandingsType[];
    games: GameWithTeams[];
}) {
    return (
        <>
            <Head>
                <title>Tablica | Likar Krombacher</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section id="tablica" className="px-[5%] py-10 xl:my-5">
                <div className="mb-10 flex flex-row items-center justify-between">
                    <h1 className="font-heading text-4xl font-semibold text-slate-100">
                        Tablica
                    </h1>
                    <FilterSeason />
                </div>
                <TableStandings seasonId={season.id} standings={standings} />
                {/* <PlayoffBracket /> */}
                <h1 className="mb-10 font-heading text-4xl font-semibold text-slate-100">
                    Raspored natjecanja
                </h1>
                <TableResults games={games} />
            </section>
        </>
    );
}
