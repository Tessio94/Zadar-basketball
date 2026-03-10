import type { ReactNode } from 'react';

export type LandingLayoutProps = {
    children: ReactNode;
};

export type Team = {
    id: number;
    name: string;
    short_name: string;
    logo: string;
    city: string;
    founded_year: string | null;
    created_at: string;
    updated_at: string;
};

export type Teams = Team[];

export type TeamWithPlayers = Team & {
    players: PlayersWithTeam;
};

export type TeamsWithPlayers = TeamWithPlayers[];

export type Game = {
    away_score: number;
    away_team_id: number;
    created_at: string;
    game_date: string;
    home_score: number;
    home_team_id: number;
    id: number;
    round_number: number;
    season_id: number;
    status: string;
    updated_at: string;
};

export type Games = Game[];

export type GameWithTeams = Game & {
    away_team: Team;
    home_team: Team;
};

export type GamesWithTeams = GameWithTeams[];

export type Player = {
    id: number;
    date_of_birth: string;
    first_name: string;
    last_name: string;
    height: number;
    created_at: string;
    updated_at: string;
    position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
};

export type Players = Player[];

export type PlayerWithTeam = Player & {
    pivot: PlayerTeam;
};

export type PlayersWithTeam = PlayerWithTeam[];

export type PlayerTeam = {
    jersey_number: number;
    player_id: number;
    season_id: number;
    team_id: number;
    created_at: string;
    updated_at: string;
};

export type PlayerWithTeamAndGames = Player & {
    game_stats: GamesStats;
    teams: TeamsWithPlayers;
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

export type GamesStats = GameStats[];
