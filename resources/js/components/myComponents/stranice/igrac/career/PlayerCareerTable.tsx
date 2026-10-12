import { useRemember } from '@inertiajs/react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import PlayerSeasonAverageBody from './playerSeasonAverageBody';
import PlayerSeasonAverageRow from './playerSeasonAverageRow';
import PlayerSeasonAveragesHead from './playerSeasonAveragesHead';

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
                    className="mb-6"
                />
                <div className="pb-5">
                    <h4 className="pb-3 font-heading text-3xl font-semibold text-slate-100">
                        Ukupno
                    </h4>
                    <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                        <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                            <table className="w-full bg-likar2">
                                <PlayerSeasonAveragesHead />
                                <PlayerSeasonAverageBody>
                                    {seasonStats.map((season, i) => {
                                        const team = playerTeams.filter(
                                            (pt) =>
                                                pt.season_id ===
                                                season.season.id,
                                        )[0].team.short_name;

                                        return (
                                            <PlayerSeasonAverageRow
                                                key={i}
                                                stats={
                                                    active === 'tab1'
                                                        ? season.total.totals
                                                        : season.total.averages
                                                }
                                                team={team}
                                                carrer={false}
                                                seasonName={season.season.name}
                                            />
                                        );
                                    })}
                                    <PlayerSeasonAverageRow
                                        stats={
                                            active === 'tab1'
                                                ? careerStats.total.totals
                                                : careerStats.total.averages
                                        }
                                        team={''}
                                        carrer={true}
                                    />
                                </PlayerSeasonAverageBody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="pb-5">
                    <h4 className="pb-3 font-heading text-3xl font-semibold text-slate-100">
                        Regularna sezona
                    </h4>
                    <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                        <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                            <table className="w-full bg-likar2">
                                <PlayerSeasonAveragesHead />
                                <PlayerSeasonAverageBody>
                                    {seasonStats.map((season, i) => {
                                        const team = playerTeams.filter(
                                            (pt) =>
                                                pt.season_id ===
                                                season.season.id,
                                        )[0].team.short_name;

                                        return (
                                            <PlayerSeasonAverageRow
                                                key={i}
                                                stats={
                                                    active === 'tab1'
                                                        ? season.regular.totals
                                                        : season.regular
                                                              .averages
                                                }
                                                team={team}
                                                carrer={false}
                                                seasonName={season.season.name}
                                            />
                                        );
                                    })}
                                    <PlayerSeasonAverageRow
                                        stats={
                                            active === 'tab1'
                                                ? careerStats.regular.totals
                                                : careerStats.regular.averages
                                        }
                                        team={''}
                                        carrer={true}
                                    />
                                </PlayerSeasonAverageBody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="pb-5">
                    <h4 className="pb-3 font-heading text-3xl font-semibold text-slate-100">
                        Playoffs
                    </h4>
                    <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                        <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                            <table className="w-full bg-likar2">
                                <PlayerSeasonAveragesHead />
                                <PlayerSeasonAverageBody>
                                    {seasonStats.map((season, i) => {
                                        const team = playerTeams.filter(
                                            (pt) =>
                                                pt.season_id ===
                                                season.season.id,
                                        )[0].team.short_name;

                                        return (
                                            <PlayerSeasonAverageRow
                                                key={i}
                                                stats={
                                                    active === 'tab1'
                                                        ? season.playoffs.totals
                                                        : season.playoffs
                                                              .averages
                                                }
                                                carrer={false}
                                                team={team}
                                                seasonName={season.season.name}
                                            />
                                        );
                                    })}
                                    <PlayerSeasonAverageRow
                                        stats={
                                            active === 'tab1'
                                                ? careerStats.playoffs.totals
                                                : careerStats.playoffs.averages
                                        }
                                        team={''}
                                        carrer={true}
                                    />
                                </PlayerSeasonAverageBody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
