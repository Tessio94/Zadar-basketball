import TableStandings from '@/components/myComponents/stranice/tablica/poredak/tableStandings';
import TableResults from '@/components/myComponents/stranice/tablica/rezultati/tableResults';
import type {
    GameWithTeams,
    TableStandings as TableStandingsType,
} from '@/types/propTypes';

export default function Table({
    standings,
    games,
}: {
    standings: TableStandingsType[];
    games: GameWithTeams[];
}) {
    return (
        <>
            <section id="tablica" className="my-20 px-[5%]">
                <h1 className="mb-10 font-heading text-4xl font-semibold text-slate-100">
                    Tablica
                </h1>
                <TableStandings standings={standings} />
                <h1 className="mb-10 font-heading text-4xl font-semibold text-slate-100">
                    Raspored natjecanja
                </h1>
                <TableResults games={games} />
            </section>
        </>
    );
}
