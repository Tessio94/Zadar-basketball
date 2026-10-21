export type PlayoffTeam = {
    id: number;
    name: string;
    logo: string | null;
    seed: number;
};

export type PlayoffSeriesTeam = {
    team: PlayoffTeam | null;
    wins: number | null;
    placeholder: string;
};

export type PlayoffGame = {
    id: number;
    game_date: string;
    status: string;
    home_score: number;
    away_score: number;
    home_team: { id: number; name: string };
    away_team: { id: number; name: string };
};

export type PlayoffSeries = {
    id: string;
    label: string;
    round: 'quarterfinal' | 'semifinal' | 'final';
    teams: [PlayoffSeriesTeam, PlayoffSeriesTeam];
    winner: PlayoffTeam | null;
    games: PlayoffGame[];
};

export type PlayoffBracketData = {
    season_id: number;
    season_name: string;
    status: 'pending' | 'in_progress' | 'finished';
    wins_required: number;
    quarterfinals: PlayoffSeries[];
    semifinals: PlayoffSeries[];
    final: PlayoffSeries;
    champion: PlayoffTeam | null;
};
