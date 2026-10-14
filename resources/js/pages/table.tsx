import { Head, useRemember } from '@inertiajs/react';
// import PlayoffBracket from '@/components/myComponents/stranice/tablica/poredak/playoffBracket';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import PlayoffBracket from '@/components/myComponents/stranice/tablica/poredak/playoffBracket';
import TableStandings from '@/components/myComponents/stranice/tablica/poredak/tableStandings';
import TableResults from '@/components/myComponents/stranice/tablica/rezultati/tableResults';
import type {
    GameWithTeams,
    Season,
    TableStandings as TableStandingsType,
} from '@/types/propTypes';

export default function Table({
    season,
    standings,
    games,
}: {
    season: Season;
    standings: TableStandingsType[];
    games: GameWithTeams[];
}) {
    const [active, setActive] = useRemember<string>('tab1');

    return (
        <>
            <Head>
                <title>Tablica | Likar Krombacher</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section id="tablica" className="px-[5%] py-10 xl:my-5">
                <TabComponent
                    active={active}
                    setActive={setActive}
                    tabs={[
                        { id: 'tab1', title: 'Sezona' },
                        { id: 'tab2', title: 'Doigravanje' },
                    ]}
                    className="mb-8"
                />
                <div className="mb-10 flex flex-row items-center justify-between">
                    <h1 className="font-heading text-4xl font-semibold text-slate-100">
                        {active === 'tab1' ? 'Tablica' : 'Doigravanje'}
                    </h1>
                    <FilterSeason />
                </div>
                {active === 'tab1' ? (
                    <TableStandings
                        seasonId={season.id}
                        standings={standings}
                    />
                ) : (
                    <PlayoffBracket />
                )}

                {/* <PlayoffBracket /> */}
                <h1 className="mb-10 font-heading text-4xl font-semibold text-slate-100">
                    Raspored natjecanja
                </h1>
                <TableResults games={games} />
            </section>
        </>
    );
}
