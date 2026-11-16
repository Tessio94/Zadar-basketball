const legend = [
    ['NO', 'mjesto na ljestvici'],
    ['OU', 'odigrane utakmice'],
    ['BOD', 'bodovi'],
    ['ZAB', 'zabijeni poeni'],
    ['PRI', 'primljeni poeni'],
    ['RAZ', 'razlika u poenima'],
    ['POS 5', 'posljednih 5 utakmica'],
] as const;

export default function TableLegend() {
    return (
        <section aria-label="Legenda statistike utakmice" className="relative">
            <div className="rounded-xl border border-likar3/25 bg-slate-900/60 p-4 sm:p-5">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-2.5 font-text text-xs leading-relaxed text-slate-300 italic sm:text-sm lg:grid-cols-3 xl:grid-cols-4 2xl:flex 2xl:flex-wrap">
                    {legend.map(([abbreviation, description]) => (
                        <div
                            key={abbreviation}
                            className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-2 sm:grid-cols-[3rem_minmax(0,1fr)] 2xl:grid-cols-[max-content_max-content]"
                        >
                            <dt className="font-semibold text-likar3 not-italic">
                                {abbreviation}
                            </dt>
                            <dd className="2xl:whitespace-nowrap">
                                {description}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
