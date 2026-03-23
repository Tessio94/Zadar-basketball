export default function LastGamesCard() {
    return (
        <div className="group relative border-b border-likar3 bg-likar2 px-5 py-5 text-base font-semibold text-slate-100 transition-colors duration-300 first:rounded-t-xl first:border-t last:rounded-b-xl hover:bg-likar2/40 lg:border-likar1 lg:py-1.5">
            <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-likar1 p-0.5 text-sm font-normal text-slate-200">
                R5
            </span>
            <div className="max-lg:flex max-lg:flex-row max-lg:items-center max-lg:justify-center">
                <div className="flex w-fit flex-col items-start justify-between gap-2 lg:w-full lg:flex-row lg:items-center">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            src="/images/teams/sfinga.jpg"
                            alt=""
                            className="h-10 w-10 rounded-full"
                        />
                        <span>KK Sfinga Stafordi</span>
                    </div>
                    <div className="max-lg:place-self-center">
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
        </div>
    );
}
