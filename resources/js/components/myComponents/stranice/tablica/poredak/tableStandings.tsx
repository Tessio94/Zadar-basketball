import type { TableStandings } from '@/types/propTypes';
import StandingRow from './standingRow';

export default function TableStandings({
    standings,
    seasonId,
}: {
    standings: TableStandings[];
    seasonId: number;
}) {
    return (
        <div className="mb-10">
            <div className="mb-10 overflow-hidden rounded-xl border border-likar1 shadow-xl shadow-likar1">
                <div className="relative">
                    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                        <table className="w-full overflow-hidden">
                            <thead>
                                <tr className="bg-slate-900 font-heading text-xl text-slate-100">
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        No
                                    </th>
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        Ekipa
                                    </th>
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        OU
                                    </th>
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        BOD
                                    </th>
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        W
                                    </th>
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        L
                                    </th>
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        ZAB
                                    </th>
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        PRI
                                    </th>
                                    <th className="border-r border-likar4 p-2 uppercase">
                                        RAZ
                                    </th>
                                    <th className="p-2 uppercase">POS 5</th>
                                </tr>
                            </thead>
                            <tbody>
                                {standings.map((standing, i) => (
                                    <StandingRow
                                        standing={standing}
                                        key={standing.id}
                                        seasonId={seasonId}
                                        index={i}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3 text-base text-slate-100 italic">
                <small>No - mjesto na ljestvici</small>
                <small>OU - odigrane utakmice</small>
                <small>BOD - bodovi</small>
                <small>ZAB - Zabijeni poeni</small>
                <small>PRI - primljeni poeni</small>
                <small>RAZ - razlika u poenima</small>
                <small>POS 5 - posljednih 5 utakmica</small>
            </div>
        </div>
    );
}
