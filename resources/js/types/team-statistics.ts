export type TeamStatTotals = Record<
    | 'minutes_played'
    | 'points'
    | 'fg_made'
    | 'fg_attempted'
    | 'fg2_made'
    | 'fg2_attempted'
    | 'fg3_made'
    | 'fg3_attempted'
    | 'ft_made'
    | 'ft_attempted'
    | 'offensive_rebounds'
    | 'defensive_rebounds'
    | 'rebounds'
    | 'assists'
    | 'steals'
    | 'blocks'
    | 'turnovers'
    | 'fouls'
    | 'efficiency',
    number
>;

export type TeamStatAverages = {
    [Key in keyof TeamStatTotals]: number | null;
};

export type TeamShooting = Record<
    'fg' | 'fg2' | 'fg3' | 'ft',
    { made: number; attempted: number; percentage: number | null }
>;

export type TeamSeasonPlayerStats = {
    id: number;
    first_name: string;
    last_name: string;
    jersey_number: number | null;
    on_roster: boolean;
    games_played: number;
    totals: TeamStatTotals;
    averages: TeamStatAverages;
    shooting: TeamShooting;
};

export type TeamSeasonSummary = {
    games_played: number;
    wins: number;
    losses: number;
    draws: number;
    points_for: number;
    points_against: number;
    score_difference: number;
    points_per_game: number | null;
    points_allowed_per_game: number | null;
    boxscore_games: number;
    totals: TeamStatTotals;
    averages: TeamStatAverages;
    shooting: TeamShooting;
};

export type TeamSeasonStatistics = {
    summary: TeamSeasonSummary;
    players: TeamSeasonPlayerStats[];
};
