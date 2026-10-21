import type {
    GameBoxscore,
    GameLeaders,
    GameStatsWithPlayerAndTeam,
} from './propTypes';

export type GameBoxscorePlayerStat = GameStatsWithPlayerAndTeam & {
    jersey_number: number | null;
};

export type GameBoxscoreDetails = Omit<GameBoxscore, 'player_stats'> & {
    player_stats: GameBoxscorePlayerStat[];
};

export type GameBoxscoreLeaders = {
    [Key in keyof GameLeaders]: GameBoxscorePlayerStat[];
};

export type GameTeamTotal = {
    team_id: number;
    player_count: number;
    has_stats: boolean;
    minutes_played: number;
    points: number;
    fg_made: number;
    fg_attempted: number;
    fg_percentage: number;
    fg2_made: number;
    fg2_attempted: number;
    fg2_percentage: number;
    fg3_made: number;
    fg3_attempted: number;
    fg3_percentage: number;
    ft_made: number;
    ft_attempted: number;
    ft_percentage: number;
    offensive_rebounds: number;
    defensive_rebounds: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    fouls: number;
    efficiency: number;
    plus_minus: number;
    score_difference: number;
};

export type GameTeamTotals = {
    home: GameTeamTotal;
    away: GameTeamTotal;
};

export type GameDetailsProps = {
    game: GameBoxscoreDetails;
    leaders: GameBoxscoreLeaders;
    teamTotals: GameTeamTotals;
};
