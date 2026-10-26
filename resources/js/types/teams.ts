import type { PlayerWithPivot, PlayerTeamPivot } from '@/types/players';
import type { Season } from '@/types/seasons';

export type Team = {
    id: number;
    name: string;
    short_name: string | null;
    logo: string | null;
    logo_color: string | null;
    city: string | null;
    founded_year: number | null;
    created_at: string;
    updated_at: string;
};

export type TeamWithPlayer = Team & {
    pivot: PlayerTeamPivot;
};

export type TeamWithPlayers = Team & {
    players: PlayerWithPivot[];
};

export type TeamSeason = {
    id: number;
    season_id: number;
    team_id: number;
    created_at: string;
    updated_at: string;
    season: Season;
    players: PlayerWithPivot[];
};

export type TeamDetailSeason = Omit<TeamSeason, 'players' | 'season'> & {
    pivot: PlayerTeamPivot;
    team: Team;
};

export type TeamEditForm = {
    name: string;
    short_name: string;
    city: string;
    founded_year: string;
    logo_color: string;
    logo: File | null;
    season_ids: string[];
};

export type TeamHeader = Pick<Team, 'id' | 'name' | 'logo'>;

export type TeamWithSeasons = Team & { seasons: Pick<Season, 'id' | 'name'>[] };

export type TeamSeasonOption = Pick<
    TeamSeason,
    'id' | 'season_id' | 'team_id'
> & { team: Pick<Team, 'id' | 'name'>; season: Pick<Season, 'id' | 'name'> };

export type TeamCreateForm = Omit<TeamEditForm, 'season_ids'>;

/** @deprecated Use TeamCreateForm or TeamEditForm. */
export type TeamForm = TeamEditForm;
