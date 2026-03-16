import type { ReactNode } from 'react';

export type LandingLayoutProps = {
    children: ReactNode;
};

/**
 *  Team types
 */

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

export type TeamWithPlayer = Team & {
    pivot: PlayerTeamPivot;
};

export type TeamsWithPlayer = TeamWithPlayer[];

export type TeamWithPlayers = Team & {
    players: PlayersWithPivot;
};

export type TeamsWithPlayers = TeamWithPlayers[];

/**
 *  Game types
 */

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

export type GameBoxscore = Game & {
    away_team: Team;
    home_team: Team;
    player_stats: GameStatsWithPlayerAndTeam[];
};

export type GamesWithTeamsAns = GameWithTeams[];

export type GameWithTeams = Game & {
    away_team: Team;
    home_team: Team;
};

export type GamesWithTeams = GameWithTeams[];

export type GameWithAwayTeam = Game & {
    away_team: Team;
};

export type GamesWithAwayTeams = GameWithAwayTeam[];

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

export type GameStatsWithPlayer = {
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
    player: Player;
};

export type GamesStatsWithPlayer = GameStatsWithPlayer[];

export type GameStatsWithPlayerAndTeam = {
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
    player: Player;
    team: Team;
};

export type GamesStatsWithPlayerAndTeam = GameStatsWithPlayerAndTeam[];

export type GameStatsWithOpponent = {
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
    game: GameWithAwayTeam;
    opponent: Team;
};

export type GamesStatsWithOpponent = GameStatsWithOpponent[];

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

/**
 *  Player types
 */

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

export type PlayerWithPivot = Player & {
    pivot: PlayerTeamPivot;
};

export type PlayersWithPivot = PlayerWithPivot[];

export type PlayerWithTeam = Player & {
    teams: Team[];
};

export type PlayersWithTeam = PlayerWithTeam[];

export type PlayerWithTeamPivot = Player & {
    teams: TeamWithPlayer[];
};

export type PlayersWithTeamPivot = PlayerWithTeam[];

export type PlayerTeamPivot = {
    player_id: number;
    season_id: number;
    team_id: number;
    created_at: string;
    jersey_number: number;
    updated_at: string;
};

export type PlayerWithTeamAndGames = Player & {
    game_stats: GamesStatsWithOpponent;
    teams: TeamsWithPlayer;
};

export type PlayerWithTeamAndGamesAndOpponent = Player & {
    game_stats: GamesStatsWithOpponent;
    teams: TeamsWithPlayer;
};

export type PlayerTotals = {
    games: number;
    minutes: number;
    points: number;
    assists: number;
    blocks: number;
    steals: number;
    turnovers: number;
    offensive_rebounds: number;
    defensive_rebounds: number;
    fg2_made: number;
    fg2_attempted: number;
    fg3_made: number;
    fg3_attempted: number;
    ft_made: number;
    ft_attempted: number;
    fouls: number;
    plus_minus: number;
    efficiency: number;
};

export type PlayerAverages = {
    minutes: number;
    points: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    offensive_rebounds: number;
    defensive_rebounds: number;
    rebounds: number;
    fouls: number;
    fg_percentage: number;
    fg2_percentage: number;
    fg3_percentage: number;
    ft_percentage: number;
    plus_minus: number;
    efficiency: number;
};

/**
 *  Stats types
 */

export type StatsLeader = {
    title: string;
    topFive: TopFiveAvg[] | TopFivePcg[];
    type: 'avg' | 'pcg';
};

export type TopFiveAvg = {
    avg: string;
    games: number;
    total: number;
    player: PlayerWithTeamPivot;
};

export type TopFivePcg = {
    pcg: string;
    games: number;
    total_attempted: number;
    total_made: number;
    player: PlayerWithTeamPivot;
};

export type StatsDailyLeader = {
    title: string;
    topFive: TopFiveDaily[];
};

export type TopFiveDaily = {
    total: number;
    player: PlayerWithTeamPivot;
};
