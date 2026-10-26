import type { Game } from './games';

export type SeasonOption = { id: number; name: string; is_active?: boolean };
export type GameData = Omit<Game, 'created_at' | 'updated_at'> & {
    revision: number;
};
export type StatKey =
    | 'minutes_played'
    | 'fg2_made'
    | 'fg2_attempted'
    | 'fg3_made'
    | 'fg3_attempted'
    | 'ft_made'
    | 'ft_attempted'
    | 'offensive_rebounds'
    | 'defensive_rebounds'
    | 'assists'
    | 'steals'
    | 'blocks'
    | 'turnovers'
    | 'fouls'
    | 'plus_minus';
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

export type GameScheduleForm = {
    season_id: string;
    home_team_id: string;
    away_team_id: string;
    game_date: string;
    round_number: string;
    playoff_id: string;
    playoff_round: string;
    revision: number;
};

export type NamedGameData = GameData & {
    home_name: string;
    away_name: string;
    season_name: string;
};
