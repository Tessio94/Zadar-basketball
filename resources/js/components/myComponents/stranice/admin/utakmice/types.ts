export type SeasonOption = { id: number; name: string; is_active?: boolean };
export type GameData = {
    id: number;
    season_id: number;
    home_team_id: number;
    away_team_id: number;
    playoff_id: number | null;
    playoff_round: string | null;
    round_number: number;
    game_date: string;
    home_score: number;
    away_score: number;
    status: string;
    revision: number;
    home_name?: string;
    away_name?: string;
    season_name?: string;
};
export const statColumns = [
    ['minutes_played', 'MIN', 'Minute'],
    ['fg2_made', '2P+', 'Dvice pogođene'],
    ['fg2_attempted', '2P−', 'Dvice pokušane'],
    ['fg3_made', '3P+', 'Trice pogođene'],
    ['fg3_attempted', '3P−', 'Trice pokušane'],
    ['ft_made', 'SB+', 'Slobodna bacanja pogođena'],
    ['ft_attempted', 'SB−', 'Slobodna bacanja pokušana'],
    ['offensive_rebounds', 'SN', 'Skokovi u napadu'],
    ['defensive_rebounds', 'SO', 'Skokovi u obrani'],
    ['assists', 'AS', 'Asistencije'],
    ['steals', 'UL', 'Ukradene lopte'],
    ['blocks', 'BL', 'Blokade'],
    ['turnovers', 'IL', 'Izgubljene lopte'],
    ['fouls', 'OP', 'Osobne pogreške'],
    ['plus_minus', '+/−', 'Plus minus'],
] as const;
export type StatKey = (typeof statColumns)[number][0];
export type PlayerLine = Record<StatKey, number> & {
    player_id: number;
    team_id: number;
    is_starter: boolean;
};
export type RosterPlayer = {
    player_id: number;
    team_id: number;
    name: string;
    jersey_number: number | null;
    on_roster: boolean;
};
export type EditorLine = PlayerLine & { played: boolean };
export function emptyLine(
    player: Pick<PlayerLine, 'player_id' | 'team_id'>,
): EditorLine {
    return {
        ...(Object.fromEntries(statColumns.map(([key]) => [key, 0])) as Record<
            StatKey,
            number
        >),
        ...player,
        is_starter: false,
        played: false,
    };
}
export function derived(row: PlayerLine) {
    const points = 2 * row.fg2_made + 3 * row.fg3_made + row.ft_made;
    const rebounds = row.offensive_rebounds + row.defensive_rebounds;
    return {
        points,
        rebounds,
        efficiency:
            points +
            rebounds +
            row.assists +
            row.steals +
            row.blocks -
            row.turnovers,
    };
}
export function teamTotal(rows: EditorLine[]) {
    const total = emptyLine({ player_id: 0, team_id: 0 });
    for (const row of rows.filter((r) => r.played))
        for (const [key] of statColumns) total[key] += row[key];
    return total;
}
export function percentage(made: number, attempts: number) {
    return attempts ? `${((made / attempts) * 100).toFixed(1)}%` : '—';
}
export const base = '/admin-panel/utakmice';
export const inputClass =
    'min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:bg-slate-100 disabled:text-slate-500';
export const buttonClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2 font-semibold text-white hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-50';
