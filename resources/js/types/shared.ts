import type { Auth } from './auth';
import type { SeasonFilter } from './seasons';
import type { TeamHeader } from './teams';

export type FlashMessages = { success: string | null; error: string | null };
export type SharedPageProps = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    flash: FlashMessages;
    seasons: SeasonFilter[];
};
/** Only for pages that explicitly load the header teams relation. */
export type HeaderProps = { teams: TeamHeader[] };
