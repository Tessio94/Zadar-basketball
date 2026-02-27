export default function ResultRow({ game }) {
    const { game_date, home_team, away_team, home_score, away_score } = game;

    const date = new Date(game_date);

    return (
        <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
            <td className="border-r border-likar4 p-2 text-center text-nowrap">
                {formatDate(date)}
            </td>
            <td className="border-r border-likar4 p-2 text-center text-nowrap">
                {formatTime(date)}
            </td>
            <td className="border-r border-likar4 p-2">
                <p className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                    <img
                        src={home_team.logo}
                        alt={`${home_team.name} logo`}
                        className="h-6 w-6 rounded-full bg-white"
                    />
                    <span>{home_team.name}</span>
                </p>
            </td>

            <td className="border-r border-likar4 p-2 text-center text-nowrap">
                vs
            </td>
            <td className="border-r border-likar4 p-2">
                <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                    <img
                        src={away_team.logo}
                        alt={`${away_team.name} logo`}
                        className="h-6 w-6 rounded-full bg-white"
                    />
                    {away_team.name}
                </span>
            </td>
            <td className="border-r border-likar4 p-2 text-center text-nowrap">
                {home_score} - {away_score}
            </td>
        </tr>
    );
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
}

function formatTime(date: Date) {
    return date.toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}
