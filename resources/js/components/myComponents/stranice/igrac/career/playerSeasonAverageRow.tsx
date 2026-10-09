export default function PlayerSeasonAverageRow({
    stats,
    carrer,
    seasonName = '',
}) {
    const {
        games,
        minutes,
        points,
        assists,
        fg_made,
        fg_attempted,
        fg_percentage,
        fg2_percentage,
        fg3_attempted,
        fg3_made,
        fg3_percentage,
        ft_made,
        ft_attempted,
        ft_percentage,
        rebounds,
        offensive_rebounds,
        defensive_rebounds,
        turnovers,
        steals,
        blocks,
    } = stats;
    return (
        <tbody>
            {carrer && (
                <tr className="bg-likar4">
                    <th></th>
                    <th colSpan={999}>
                        <span className="text-slate-100">Ukupno</span>
                    </th>
                </tr>
            )}
            <tr className="text-slate-100 odd:bg-likar1 even:bg-likar3/60">
                <th className="p-1 text-center text-nowrap">
                    {seasonName ?? ''}
                </th>
                <th className="p-1 text-center text-nowrap">{'Vošta'}</th>
                <td className="p-1 text-center text-nowrap">{games}</td>
                <td className="p-1 text-center text-nowrap">{minutes}</td>
                <td className="p-1 text-center text-nowrap">{points}</td>
                <td className="p-1 text-center text-nowrap">{rebounds}</td>
                <td className="p-1 text-center text-nowrap">{assists}</td>
                <td className="p-1 text-center text-nowrap">{steals}</td>
                <td className="p-1 text-center text-nowrap">{blocks}</td>
                <td className="p-1 text-center text-nowrap">{fg_made}</td>
                <td className="p-1 text-center text-nowrap">{fg_attempted}</td>
                <td className="p-1 text-center text-nowrap">
                    {fg_percentage}%
                </td>
                <td className="p-1 text-center text-nowrap">
                    {fg2_percentage}%
                </td>
                <td className="p-1 text-center text-nowrap">{fg3_made}</td>
                <td className="p-1 text-center text-nowrap">{fg3_attempted}</td>
                <td className="p-1 text-center text-nowrap">
                    {fg3_percentage}%
                </td>
                <td className="p-1 text-center text-nowrap">{ft_made}</td>
                <td className="p-1 text-center text-nowrap">{ft_attempted}</td>
                <td className="p-1 text-center text-nowrap">
                    {ft_percentage}%
                </td>
                <td className="p-1 text-center text-nowrap">
                    {offensive_rebounds}
                </td>
                <td className="p-1 text-center text-nowrap">
                    {defensive_rebounds}
                </td>
                <td className="p-1 text-center text-nowrap">{turnovers}</td>
            </tr>
        </tbody>
    );
}
