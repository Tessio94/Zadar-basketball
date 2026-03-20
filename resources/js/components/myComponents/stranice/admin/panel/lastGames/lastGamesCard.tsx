export default function LastGamesCard() {
    return (
        <div className="relative border-b border-likar1 bg-likar2 px-5 py-1.5 text-base font-semibold text-slate-100 first:rounded-t-xl first:border-t last:rounded-b-xl">
            <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-likar1 p-0.5 text-sm font-normal text-slate-200">
                R5
            </span>
            <div className="flex w-full flex-row items-center justify-between gap-2">
                <div className="flex flex-row items-center gap-2">
                    <img
                        src="/images/teams/sfinga.jpg"
                        alt=""
                        className="h-10 w-10 rounded-full"
                    />
                    <span>KK Sfinga Stafordi</span>
                </div>
                <div>
                    <span>60</span>
                    <span>:</span>
                    <span>80</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <img
                        src="/images/teams/brodarica.png"
                        alt=""
                        className="h-10 w-10 rounded-full"
                    />
                    <span>KK Brodarica</span>
                </div>
            </div>
        </div>
    );
}
