export type Season = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type SeasonFilter = {
    id: number;
    name: string;
    is_active: boolean;
};

export type SeasonForm = {
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
};
