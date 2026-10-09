import { useRemember } from '@inertiajs/react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import PlayerSeasonAverageRow from './playerSeasonAverageRow';
import PlayerSeasonAveragesHeader from './playerSeasonAveragesHeader';

export default function PlayerCareerTable({
    careerStats,
    seasonStats,
    playerTeams,
}) {
    const [active, setActive] = useRemember<string>('tab1');

    return (
        <>
            <div className="border-b border-likar1 px-[5%] py-5">
                <TabComponent
                    active={active}
                    setActive={setActive}
                    tabs={[
                        { id: 'tab1', title: 'Ukupno' },
                        { id: 'tab2', title: 'Prosjek' },
                    ]}
                    className="mb-3"
                />
                <div className="pb-5">
                    <h4 className="pb-3 font-heading text-3xl font-semibold text-slate-100">
                        Ukupno
                    </h4>
                    <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                        <div className="overflow-x-auto">
                            <table className="w-full bg-likar2">
                                <PlayerSeasonAveragesHeader />
                                {seasonStats.map((season) => (
                                    <PlayerSeasonAverageRow
                                        stats={
                                            active === 'tab1'
                                                ? season.total.totals
                                                : season.total.averages
                                        }
                                        carrer={false}
                                        seasonName={season.season.name}
                                    />
                                ))}
                                <PlayerSeasonAverageRow
                                    stats={
                                        active === 'tab1'
                                            ? careerStats.total.totals
                                            : careerStats.total.averages
                                    }
                                    carrer={true}
                                />
                            </table>
                        </div>
                    </div>
                </div>
                <div className="pb-5">
                    <h4 className="pb-3 font-heading text-3xl font-semibold text-slate-100">
                        Regularna sezona
                    </h4>
                    <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                        <div className="overflow-x-auto">
                            <table className="w-full bg-likar2">
                                <PlayerSeasonAveragesHeader />
                                {seasonStats.map((season) => (
                                    <PlayerSeasonAverageRow
                                        stats={
                                            active === 'tab1'
                                                ? season.regular.totals
                                                : season.regular.averages
                                        }
                                        carrer={false}
                                        seasonName={season.season.name}
                                    />
                                ))}
                                <PlayerSeasonAverageRow
                                    stats={
                                        active === 'tab1'
                                            ? careerStats.regular.totals
                                            : careerStats.regular.averages
                                    }
                                    carrer={true}
                                />
                            </table>
                        </div>
                    </div>
                </div>
                <div className="pb-5">
                    <h4 className="pb-3 font-heading text-3xl font-semibold text-slate-100">
                        Playoffs
                    </h4>
                    <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                        <div className="overflow-x-auto">
                            <table className="w-full bg-likar2">
                                <PlayerSeasonAveragesHeader />
                                {seasonStats.map((season) => (
                                    <PlayerSeasonAverageRow
                                        stats={
                                            active === 'tab1'
                                                ? season.playoffs.totals
                                                : season.playoffs.averages
                                        }
                                        carrer={false}
                                        seasonName={season.season.name}
                                    />
                                ))}
                                <PlayerSeasonAverageRow
                                    stats={
                                        active === 'tab1'
                                            ? careerStats.playoffs.totals
                                            : careerStats.playoffs.averages
                                    }
                                    carrer={true}
                                />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
