import type { DatabaseNumber } from '@/types/common';
import type { GameStatsWithOpponent } from '@/types/games';
import type { SeasonFilter } from '@/types/seasons';
import type {
    Team,
    TeamWithPlayer,
    TeamSeason,
    TeamDetailSeason,
} from '@/types/teams';

export type Player = {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string | null;
    height: number | null;
    created_at: string;
    updated_at: string;
    position: string | null;
};

export type PlayerTeam = Player;

export type PlayerAdmin = PlayerWithTeamDetailSeasons;

export type PlayerCreateForm = {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    height: string;
    position: string;
    season_id: string;
    team_id: string;
    jersey_number: string;
};

export type PlayerWithPivot = Player & {
    pivot: PlayerTeamPivot;
};

export type PlayerWithTeam = Player & {
    teams: Team[];
};

export type PlayerWithTeamPivot = Player & {
    teams: TeamWithPlayer[];
};

export type PlayerWithTeamSeasons = Player & {
    team_seasons: TeamSeason[];
};

export type PlayerWithTeamDetailSeasons = Player & {
    team_seasons: TeamDetailSeason[];
};

export type PlayerTeamPivot = {
    player_id: number;
    team_season_id: number;
    jersey_number: number | null;
    created_at: string;
    updated_at: string;
};

export type PlayerWithTeamAndGames = Player & {
    game_stats: GameStatsWithOpponent[];
    teams: TeamWithPlayer[];
};

export type PlayerWithTeamAndGamesAndOpponent = PlayerWithTeamAndGames;

export type PlayerTotals = Record<
    | 'games'
    | 'minutes'
    | 'points'
    | 'assists'
    | 'blocks'
    | 'steals'
    | 'turnovers'
    | 'rebounds'
    | 'offensive_rebounds'
    | 'defensive_rebounds'
    | 'fg_made'
    | 'fg_attempted'
    | 'fg2_made'
    | 'fg2_attempted'
    | 'fg3_made'
    | 'fg3_attempted'
    | 'ft_made'
    | 'ft_attempted'
    | 'fouls'
    | 'plus_minus'
    | 'efficiency',
    DatabaseNumber
> &
    Record<
        'fg_percentage' | 'fg2_percentage' | 'fg3_percentage' | 'ft_percentage',
        DatabaseNumber | null
    >;

export type PlayerAverages = {
    [Key in keyof PlayerTotals]: Key extends 'games' ? DatabaseNumber : number;
};

export type PlayerFilters = {
    search?: string;
    sort?: 'first_name' | 'last_name';
    direction?: 'asc' | 'desc';
};

export type PlayerEditForm = Pick<
    PlayerCreateForm,
    'first_name' | 'last_name' | 'date_of_birth' | 'height' | 'position'
> & { team_seasons: { team_season_id: string; jersey_number: string }[] };

export type PlayerStatSummary = {
    totals: PlayerTotals;
    averages: PlayerAverages;
};

export type PlayerCareerStats = Record<
    'regular' | 'playoffs' | 'total',
    PlayerStatSummary
>;

export type PlayerSeasonStats = PlayerCareerStats & { season: SeasonFilter };

export type PlayerCareerProps = {
    careerStats: PlayerCareerStats;
    seasonStats: PlayerSeasonStats[];
    playerTeams: TeamDetailSeason[];
};

export type PlayerPageProps = Omit<PlayerCareerProps, 'playerTeams'> & {
    player: PlayerWithTeamDetailSeasons;
    games: GameStatsWithOpponent[];
    seasons: SeasonFilter[];
    selectedSeason: number;
};

/** @deprecated Use PlayerCreateForm or PlayerEditForm. */
export type PlayerForm = PlayerCreateForm;
