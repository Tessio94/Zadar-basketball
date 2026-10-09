export default function PlayerSeasonAverageRow({ careerStats }) {
    const {
        minutes,
        points,
        assists,
        fg_made,
        fg_attempted,
        fg_percentage,
        fg2_percentage,
        fg3_percentage,
        ft_percentage,
        offensive_rebounds,
        defensive_rebounds,
        rebounds,
        turnovers,
        steals,
        blocks,
        fouls,
    } = careerStats;
    return (
        <tr className="bg-likar1/60 font-semibold text-slate-100">
            <td className="p-1 text-center text-nowrap">{}</td>
            <td className="p-1 text-center text-nowrap">{}</td>
            <td className="p-1 text-center text-nowrap">{}</td>
            <td className="p-1 text-center text-nowrap">{}</td>
            <td className="p-1 text-center text-nowrap">{minutes}</td>
            <td className="p-1 text-center text-nowrap">{minutes}</td>
            <td className="p-1 text-center text-nowrap">{points}</td>
            <td className="p-1 text-center text-nowrap">{rebounds}</td>
            <td className="p-1 text-center text-nowrap">{steals}</td>
            <td className="p-1 text-center text-nowrap">{blocks}</td>
            <td className="p-1 text-center text-nowrap">{fg_made}</td>
            <td className="p-1 text-center text-nowrap">{fg_attempted}</td>
            <td className="p-1 text-center text-nowrap">{fg_percentage}%</td>
            <td className="p-1 text-center text-nowrap">{fg2_percentage}%</td>
            <td className="p-1 text-center text-nowrap">{'/'}</td>
            <td className="p-1 text-center text-nowrap">{fg3_percentage}%</td>
            <td className="p-1 text-center text-nowrap">{'/'}</td>
            <td className="p-1 text-center text-nowrap">{ft_percentage}%</td>
            <td className="p-1 text-center text-nowrap">
                {offensive_rebounds}
            </td>
            <td className="p-1 text-center text-nowrap">
                {defensive_rebounds}
            </td>
            <td className="p-1 text-center text-nowrap">{rebounds}</td>
            <td className="p-1 text-center text-nowrap">{assists}</td>
            <td className="p-1 text-center text-nowrap">{turnovers}</td>
            <td className="p-1 text-center text-nowrap">{steals}</td>
            <td className="p-1 text-center text-nowrap">{blocks}</td>
            <td className="p-1 text-center text-nowrap">{fouls}</td>
        </tr>
    );
}
