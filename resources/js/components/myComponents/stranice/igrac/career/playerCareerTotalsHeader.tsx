export default function PlayerCareerTotalsHeader({ careerStats }) {
    return (
        <div className="border-b border-likar1 px-[5%] py-5">
            <div className="flex flex-col gap-5 py-5">
                <div className="flex flex-row items-center justify-between gap-5">
                    <div className="relative flex grow flex-col items-start gap-4 rounded-xl border border-likar3/40 bg-likar4/60 p-2.5 transition-colors duration-300 hover:bg-likar4/30">
                        <p className="font-heading text-xl text-slate-200/80">
                            Ukupno odigrano
                        </p>
                        <p className="font-heading text-4xl font-semibold text-slate-100">
                            {careerStats.total.totals.games}
                        </p>
                    </div>
                    <div className="relative flex grow flex-col items-start gap-4 rounded-xl border border-likar3/40 bg-likar4/60 p-2.5 transition-colors duration-300 hover:bg-likar4/30">
                        <p className="font-heading text-xl text-slate-200/80">
                            Poeni po utakmici
                        </p>
                        <p className="font-heading text-4xl font-semibold text-slate-100">
                            {careerStats.total.averages.points}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
