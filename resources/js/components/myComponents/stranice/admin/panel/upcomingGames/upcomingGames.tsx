import BasketballIcon from '@/components/myComponents/ui/icons/basketballIcon';
import DashboardButton from '../ui/dashboardButton';

export default function UpcomingGames() {
    return (
        <div className="relative z-10 h-full overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover dark:border-sidebar-border">
            <div className="flex flex-row items-center gap-5 p-5">
                <BasketballIcon width={60} height={60} fill={'#ff6e00'} />
                <div className="flex flex-col items-start">
                    <p className="text-lg font-semibold text-slate-100">
                        2 utakmice danas
                    </p>
                    <p className="font-regular text-base text-slate-300">
                        Pogledaj utakmice
                    </p>
                </div>
            </div>
            <div className="relative flex flex-col items-center justify-between p-2.5 max-sm:gap-3 max-sm:border-t max-sm:border-t-likar3 max-sm:bg-linear-to-t max-sm:from-likar3 max-sm:to-transparent sm:flex-row sm:p-5">
                <img
                    src="/images/design/shortSnow2.png"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full max-sm:hidden"
                />
                <div className="z-10 font-semibold text-slate-300">
                    <span>Runda 5 -</span>{' '}
                    <time dateTime="2026-04-04">04. 04. 2026</time>
                </div>
                <div>
                    <DashboardButton
                        type="link"
                        text={'Pregledaj sve utakmice'}
                    />
                </div>
            </div>
        </div>
    );
}
