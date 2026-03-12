export default function StatisticsAverageRow({ type, leader, index }) {
    if (type === 'avg') {
        const { games, player, avg, total } = leader;

        return (
            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60 [&_td]:p-2 [&_td]:text-center">
                <td>{index + 1}.</td>
                <td>
                    <img
                        src={player.teams[0].logo}
                        alt={`${player.teams[0].name} logo`}
                        height={40}
                        width={40}
                        className="inline-block rounded-full border border-slate-100/80"
                    />
                </td>
                <td>{`${player.first_name} ${player.last_name}`}</td>
                <td>{games}</td>
                <td>{total}</td>
                <td>{avg}</td>
            </tr>
        );
    } else if (type === 'pcg') {
        const { player, pcg, total_made, total_attempted } = leader;

        return (
            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60 [&_td]:p-2 [&_td]:text-center">
                <td>{index + 1}.</td>
                <td>
                    <img
                        src={player.teams[0].logo}
                        alt={`${player.teams[0].name} logo`}
                        height={40}
                        width={40}
                        className="inline-block rounded-full border border-slate-100/80"
                    />
                </td>
                <td>{`${player.first_name} ${player.last_name}`}</td>
                <td>{total_attempted}</td>
                <td>{total_made}</td>
                <td>{pcg}%</td>
            </tr>
        );
    }
}
