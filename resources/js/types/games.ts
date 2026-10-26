import type { Player } from '@/types/players';
import type { Team } from '@/types/teams';

export type GameStatus = 'scheduled' | 'finished';
export type PlayoffRound = 'quarterfinal' | 'semifinal' | 'final';

export type Game = {
    id: number;
    season_id: number;
    playoff_id: number | null;
    playoff_round: PlayoffRound | null;
    home_team_id: number;
    away_team_id: number;
    game_date: string;
    round_number: number;
    home_score: number;
    away_score: number;
    status: GameStatus;
    created_at: string;
    updated_at: string;
};

export type GameBoxscore = Game & {
    away_team: Team;
    home_team: Team;
    player_stats: GameStatsWithPlayerAndTeam[];
};

export type GameWithTeams = Game & {
    away_team: Team;
    home_team: Team;
};

export type GameWithAwayTeam = Game & {
    away_team: Team;
};

export type GameStats = {
    id: number;
    player_id: number;
    team_id: number;
    game_id: number;
    is_starter: boolean;
    points: number;
    assists: number;
    blocks: number;
    defensive_rebounds: number;
    offensive_rebounds: number;
    fg2_attempted: number;
    fg2_made: number;
    fg3_attempted: number;
    fg3_made: number;
    fg_percentage: number;
    fg3_percentage: number;
    fouls: number;
    ft_attempted: number;
    ft_made: number;
    steals: number;
    turnovers: number;
    plus_minus: number;
    efficiency: number;
    minutes_played: number;
    created_at: string;
    updated_at: string;
};

export type GameStatsWithPlayer = GameStats & { player: Player };

export type GameStatsWithPlayerAndTeam = GameStatsWithPlayer & { team: Team };

export type GameStatsWithOpponent = GameStats & {
    game: GameWithTeams;
    opponent: Team;
    team: Team;
};

export type GameLeaders = {
    points: GameStatsWithPlayerAndTeam[];
    assists: GameStatsWithPlayerAndTeam[];
    blocks: GameStatsWithPlayerAndTeam[];
    rebounds: GameStatsWithPlayerAndTeam[];
    steals: GameStatsWithPlayerAndTeam[];
    madeThrees: GameStatsWithPlayerAndTeam[];
    shootingPercentage: GameStatsWithPlayerAndTeam[];
    threesPercentage: GameStatsWithPlayerAndTeam[];
    efficiency: GameStatsWithPlayerAndTeam[];
};
