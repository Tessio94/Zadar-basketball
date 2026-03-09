import LeadersRow from './leadersRow';

export default function GameLeaders({ leaders }) {
    console.log('leaders', leaders);
    const {
        points,
        assists,
        rebounds,
        blocks,
        steals,
        shootingPercentage,
        madeThrees,
        threesPercentage,
        efficiency,
    } = leaders;

    return (
        <section className="my-20 px-[5%]">
            <div className="mx-auto grid w-full items-stretch gap-10 rounded-2xl bg-likar1/30 p-2 lg:grid-cols-2">
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Poeni
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {points.map((player, i) => (
                                <LeadersRow
                                    type="points"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Skokovi
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {rebounds.map((player, i) => (
                                <LeadersRow
                                    type="rebounds"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Asistencije
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {assists.map((player, i) => (
                                <LeadersRow
                                    type="assists"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Blokade
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {blocks.map((player, i) => (
                                <LeadersRow
                                    type="blocks"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Ukradene
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {steals.map((player, i) => (
                                <LeadersRow
                                    type="steals"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Postotak šuta
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {shootingPercentage.map((player, i) => (
                                <LeadersRow
                                    type="shootingPercentage"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Ubačene trice
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {madeThrees.map((player, i) => (
                                <LeadersRow
                                    type="madeThrees"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Postotak šuta za tri poena
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {threesPercentage.map((player, i) => (
                                <LeadersRow
                                    type="threesPercentage"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 max-[500px]:px-1.5 max-[500px]:py-3">
                    <h3 className="font-heading text-xl font-semibold text-slate-100">
                        Indeks uspješnosti
                    </h3>
                    <hr className="my-2 border border-likar2" />
                    <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                        <tbody>
                            {efficiency.map((player, i) => (
                                <LeadersRow
                                    type="efficiency"
                                    key={player.id}
                                    player={player}
                                    place={i + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
