const legend = [
    ['BR.', 'Broj dresa'],
    ['POZ', 'Pozicija igrača'],
    ['MIN', 'Minute provedene u igri'],
    ['PTS', 'Postignuti poeni'],
    ['ŠUT', 'Šut iz igre (za 2 i 3 poena)'],
    ['U/P', 'Ubačaji / pokušaji'],
    ['%', 'Postotak uspješnosti šuta'],
    ['2P', 'Šut za 2 poena'],
    ['3P', 'Šut za 3 poena'],
    ['SB', 'Slobodna bacanja'],
    ['NS', 'Napadački skokovi'],
    ['OS', 'Obrambeni skokovi'],
    ['SK', 'Ukupni skokovi'],
    ['AS', 'Asistencije'],
    ['GR', 'Izgubljene lopte'],
    ['UKR', 'Ukradene lopte'],
    ['BS', 'Blokade'],
    ['FO', 'Osobne pogreške'],
    ['+/-', 'Razlika poena ekipe dok je igrač na parketu'],
    ['EFF', 'Efikasnost igrača'],
] as const;

export default function BoxScoreLegend() {
    return (
        <section
            aria-label="Legenda statistike utakmice"
            className="relative mx-auto mb-10 px-[5%]"
        >
            <div className="rounded-xl border border-likar3/25 bg-slate-900/60 p-4 sm:p-5">
                <h3 className="mb-3 font-heading text-lg font-semibold text-slate-100">
                    Legenda statistike
                </h3>
                <dl className="grid gap-x-6 gap-y-2.5 font-text text-xs leading-relaxed text-slate-300 italic sm:grid-cols-2 sm:text-sm lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {legend.map(([abbreviation, description]) => (
                        <div
                            key={abbreviation}
                            className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-2"
                        >
                            <dt className="font-semibold text-likar3 not-italic">
                                {abbreviation}
                            </dt>
                            <dd>{description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
