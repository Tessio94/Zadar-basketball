import type { ReactNode } from 'react';

export type LandingLayoutProps = {
    children: ReactNode;
};

// export type TeamInfo = {
//     away_games: Game[];
//     city: string;
//     created_at: string;
//     founded_year: string | null;
//     home_games: Game[];
//     id: number;
//     logo: string;
//     name: string;
//     players: Players;
//     short_name: string;
//     updated_at: string;
// };

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
    players: Players;
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
    created_at: string;
    date_of_birth: string;
    first_name: string;
    height: number;
    id: number;
    last_name: string;
    pivot: PlayerTeamInfo;
    position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
    updated_at: string;
};

export type Players = Player[];

export type PlayerTeamInfo = {
    created_at: string;
    jersey_number: number;
    player_id: number;
    season_id: number;
    team_id: number;
    updated_at: string;
};
