import BasketballIcon from '@/components/myComponents/ui/icons/basketballIcon';

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
            <div className="relative flex flex-row items-center justify-between p-5">
                <img
                    src="/images/design/shortSnow2.png"
                    alt=""
                    className="absolute inset-0 z-0 h-full w-full"
                />
                <div className="z-10 font-semibold text-slate-300">
                    <span>Runda 5 -</span>{' '}
                    <time dateTime="2026-04-04">04. 04. 2026</time>
                </div>
                <div>
                    <button className="rounded-xl bg-likar2 px-3 py-1.5 text-base font-semibold text-slate-100">
                        Pregledaj utakmice
                    </button>
                </div>
            </div>
        </div>
    );
}
