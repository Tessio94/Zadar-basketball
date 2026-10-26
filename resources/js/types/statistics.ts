import type { DatabaseNumber } from '@/types/common';
import type { PlayerWithTeamDetailSeasons } from '@/types/players';

export type TableStandings = {
    allowed: number;
    difference: number;
    id: number;
    logo: string | null;
    losses: number;
    name: string;
    played: number;
    scored: number;
    wins: number;
    form: ('W' | 'L')[];
};

export type StatsLeader = { title: string } & (
    | { type: 'avg'; topFive: TopFiveAvg[] }
    | { type: 'pcg'; topFive: TopFivePcg[] }
);

export type TopFiveAvg = {
    avg: DatabaseNumber;
    games: DatabaseNumber;
    total: DatabaseNumber;
    player: PlayerWithTeamDetailSeasons;
};

export type TopFivePcg = {
    pcg: DatabaseNumber | null;
    games: DatabaseNumber;
    total_attempted: DatabaseNumber;
    total_made: DatabaseNumber;
    player: PlayerWithTeamDetailSeasons;
};

export type StatsDailyLeader = {
    title: string;
    topFive: TopFiveDaily[];
};

export type StatsBestPerformance = StatsDailyLeader;

export type TopFiveDaily = {
    total: DatabaseNumber;
    player: PlayerWithTeamDetailSeasons;
};

export type { DatabaseNumber } from './common';

export type SeasonLeaders = Record<string, StatsLeader>;

export type DailyLeaders = Record<string, StatsDailyLeader>;
