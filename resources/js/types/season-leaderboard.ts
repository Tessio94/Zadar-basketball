import type { Paginated } from '@/types/pagination';
import type { Season } from '@/types/seasons';

export type SeasonLeaderboardEntry = {
    player: {
        id: number;
        first_name: string;
        last_name: string;
        teams: {
            id: number;
            name: string;
            logo: string | null;
            logo_color: string | null;
        }[];
    };
    games: number;
    total: number;
    value: number | null;
    attempted: number | null;
};

export type SeasonLeaderboardCategory = {
    key: string;
    slug: string;
    title: string;
    type: 'avg' | 'pcg';
    url: string;
};

export type SeasonLeaderboardPageProps = {
    season: Season;
    category: SeasonLeaderboardCategory;
    leaders: Paginated<SeasonLeaderboardEntry>;
    backUrl: string;
};
