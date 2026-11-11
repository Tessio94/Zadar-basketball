import type {
    TeamSeasonPlayerStats,
    TeamShooting,
    TeamStatTotals,
} from '@/types/team-statistics';

export type TeamStatCategoryId =
    | 'minutes'
    | 'points'
    | 'threes'
    | 'fieldGoals'
    | 'freeThrows'
    | 'assists'
    | 'rebounds'
    | 'steals'
    | 'blocks'
    | 'fouls'
    | 'turnovers'
    | 'efficiency';

export type TeamStatColumn = {
    id:
        | 'total'
        | 'games'
        | 'average'
        | 'percentage'
        | 'defensive'
        | 'offensive';
    label: string;
    value: (player: TeamSeasonPlayerStats) => number | null;
    display: (player: TeamSeasonPlayerStats) => string;
};

export type TeamStatSort = {
    column: TeamStatColumn['id'];
    direction: 'asc' | 'desc';
};

export type TeamStatCategory = {
    id: TeamStatCategoryId;
    label: string;
    title: string;
    description: string;
    columns: TeamStatColumn[];
    defaultSort: TeamStatSort;
};

const countFormatter = new Intl.NumberFormat('hr-HR', {
    maximumFractionDigits: 0,
});
const averageFormatter = new Intl.NumberFormat('hr-HR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});
const nameCollator = new Intl.Collator('hr-HR', {
    sensitivity: 'base',
    numeric: true,
});

export function formatStatCount(value: number | null): string {
    return value === null ? '—' : countFormatter.format(value);
}

export function formatStatAverage(value: number | null): string {
    return value === null
        ? '—'
        : averageFormatter.format(value === 0 ? 0 : value);
}

export function formatStatPercentage(value: number | null): string {
    return value === null ? '—' : `${formatStatAverage(value)}%`;
}

function totalColumn(
    field: keyof TeamStatTotals,
    id: TeamStatColumn['id'] = 'total',
    label = 'Ukupno',
): TeamStatColumn {
    return {
        id,
        label,
        value: (player) => player.totals[field],
        display: (player) => formatStatCount(player.totals[field]),
    };
}

function averageColumn(field: keyof TeamStatTotals): TeamStatColumn {
    const value = (player: TeamSeasonPlayerStats) =>
        player.games_played > 0
            ? player.totals[field] / player.games_played
            : null;

    return {
        id: 'average',
        label: 'Prosjek',
        value,
        display: (player) => formatStatAverage(value(player)),
    };
}

function shootingColumn(shot: keyof TeamShooting): TeamStatColumn {
    return {
        id: 'total',
        label: 'Ukupno',
        value: (player) => player.shooting[shot].made,
        display: (player) =>
            `${formatStatCount(player.shooting[shot].made)} / ${formatStatCount(player.shooting[shot].attempted)}`,
    };
}

function percentageColumn(shot: keyof TeamShooting): TeamStatColumn {
    const value = (player: TeamSeasonPlayerStats) => {
        const { made, attempted } = player.shooting[shot];
        return attempted > 0 ? (made / attempted) * 100 : null;
    };

    return {
        id: 'percentage',
        label: 'Postotak',
        value,
        display: (player) => formatStatPercentage(value(player)),
    };
}

const gamesColumn: TeamStatColumn = {
    id: 'games',
    label: 'Utakmice',
    value: (player) => player.games_played,
    display: (player) => formatStatCount(player.games_played),
};

const totalDescending: TeamStatSort = { column: 'total', direction: 'desc' };
const averageAscending: TeamStatSort = { column: 'average', direction: 'asc' };
const appearanceDescription =
    'Prosjek se računa po zabilježenom nastupu igrača.';

export const TEAM_STAT_CATEGORIES: TeamStatCategory[] = [
    {
        id: 'minutes',
        label: 'Minute',
        title: 'Minute na parketu',
        description: `Ukupne minute i minute po utakmici. ${appearanceDescription}`,
        columns: [
            totalColumn('minutes_played'),
            gamesColumn,
            averageColumn('minutes_played'),
        ],
        defaultSort: totalDescending,
    },
    {
        id: 'points',
        label: 'Poeni',
        title: 'Poeni igrača',
        description:
            'Postotak označava uspješnost šuta iz igre (2PT + 3PT). Prosjek se računa po nastupu.',
        columns: [
            totalColumn('points'),
            gamesColumn,
            averageColumn('points'),
            percentageColumn('fg'),
        ],
        defaultSort: totalDescending,
    },
    {
        id: 'threes',
        label: '3PT',
        title: 'Šut za tri poena',
        description:
            'Ukupno = pogoci / pokušaji. Prosjek = pogođene trice po nastupu.',
        columns: [
            shootingColumn('fg3'),
            averageColumn('fg3_made'),
            percentageColumn('fg3'),
        ],
        defaultSort: totalDescending,
    },
    {
        id: 'fieldGoals',
        label: 'FG',
        title: 'Šut iz igre',
        description:
            'Ukupno = pogoci / pokušaji za dva i tri poena zajedno. Slobodna bacanja nisu uključena.',
        columns: [shootingColumn('fg'), percentageColumn('fg')],
        defaultSort: totalDescending,
    },
    {
        id: 'freeThrows',
        label: 'FT',
        title: 'Slobodna bacanja',
        description:
            'Ukupno = pogoci / pokušaji. Prosjek = pogođena slobodna bacanja po nastupu.',
        columns: [
            shootingColumn('ft'),
            averageColumn('ft_made'),
            percentageColumn('ft'),
        ],
        defaultSort: totalDescending,
    },
    {
        id: 'assists',
        label: 'AST',
        title: 'Asistencije',
        description: appearanceDescription,
        columns: [totalColumn('assists'), averageColumn('assists')],
        defaultSort: totalDescending,
    },
    {
        id: 'rebounds',
        label: 'REB',
        title: 'Skokovi',
        description: `Ukupno uključuje obrambene i napadačke skokove. ${appearanceDescription}`,
        columns: [
            totalColumn('rebounds'),
            totalColumn('defensive_rebounds', 'defensive', 'Obrana'),
            totalColumn('offensive_rebounds', 'offensive', 'Napad'),
            averageColumn('rebounds'),
        ],
        defaultSort: totalDescending,
    },
    {
        id: 'steals',
        label: 'STL',
        title: 'Ukradene lopte',
        description: appearanceDescription,
        columns: [totalColumn('steals'), averageColumn('steals')],
        defaultSort: totalDescending,
    },
    {
        id: 'blocks',
        label: 'BLK',
        title: 'Blokade',
        description: appearanceDescription,
        columns: [totalColumn('blocks'), averageColumn('blocks')],
        defaultSort: totalDescending,
    },
    {
        id: 'fouls',
        label: 'FOULS',
        title: 'Prekršaji',
        description: `Početni poredak: manji prosjek prekršaja prvi. ${appearanceDescription}`,
        columns: [totalColumn('fouls'), averageColumn('fouls')],
        defaultSort: averageAscending,
    },
    {
        id: 'turnovers',
        label: 'TO',
        title: 'Izgubljene lopte',
        description: `Početni poredak: manji prosjek izgubljenih lopti prvi. ${appearanceDescription}`,
        columns: [totalColumn('turnovers'), averageColumn('turnovers')],
        defaultSort: averageAscending,
    },
    {
        id: 'efficiency',
        label: 'EFF',
        title: 'Prosječna efikasnost',
        description: 'Prosječni EFF iz zabilježenih utakmica igrača.',
        columns: [averageColumn('efficiency')],
        defaultSort: { column: 'average', direction: 'desc' },
    },
];

export function sortTeamStatPlayers(
    players: TeamSeasonPlayerStats[],
    column: TeamStatColumn,
    direction: TeamStatSort['direction'],
): TeamSeasonPlayerStats[] {
    return [...players].sort((a, b) => {
        // Players without appearances remain visible, but are never ranked ahead
        // of participants with zero counts or a negative recorded efficiency.
        if ((a.games_played === 0) !== (b.games_played === 0))
            return a.games_played === 0 ? 1 : -1;

        const left = column.value(a);
        const right = column.value(b);
        if (left === null && right !== null) return 1;
        if (right === null && left !== null) return -1;
        if (left !== null && right !== null && left !== right)
            return direction === 'desc' ? right - left : left - right;

        return (
            nameCollator.compare(a.last_name, b.last_name) ||
            nameCollator.compare(a.first_name, b.first_name) ||
            a.id - b.id
        );
    });
}
