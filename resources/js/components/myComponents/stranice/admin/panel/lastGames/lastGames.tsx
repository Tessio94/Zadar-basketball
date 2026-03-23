import DashboardButton from '../ui/dashboardButton';
import LastGamesCard from './lastGamesCard';

export default function LastGames() {
    return (
        <div className="relative z-10 h-fit h-full overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover dark:border-sidebar-border">
            <h3 className="p-5 text-lg font-semibold text-slate-100">
                Zadnje utakmice
            </h3>
            <div className="mx-5 flex flex-col rounded-2xl bg-likar2 p-2.5">
                <div className="rounded-t-xl rounded-b-xl bg-linear-to-r from-likar2 to-likar1">
                    <LastGamesCard />
                    <LastGamesCard />
                    <LastGamesCard />
                    <LastGamesCard />
                    <LastGamesCard />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center p-5">
                <DashboardButton type="link" text="Pregledaj sve" />
            </div>
        </div>
    );
}
