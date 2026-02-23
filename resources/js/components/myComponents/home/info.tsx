export default function Info() {
    return (
        <>
            <section className="my-20">
                <div className="px-[5%]">
                    <h2 className="text-4xl font-semibold text-slate-100">
                        Vijesti
                    </h2>
                    <div className="grid w-fit items-stretch gap-10 rounded-2xl sm:grid-cols-2 xl:grid-cols-4">
                        <a href="https://zivotbezboli.com/" target="_blank" rel="noopener noreferrer" className="group z-100 flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-slate-600"><div className="shrink-0 overflow-hidden"><img alt="Život bez boli" loading="lazy" className="transition-transform duration-300 group-hover:scale-110" /></div><div className="flex grow flex-col justify-between gap-6 bg-slate-700/70 p-3"><h5 className="font-orbitron text-lg font-semibold text-slate-100">Život bez boli</h5><p className="text-sm text-slate-100">Website for a physiotherapy clinic built with Next.js and Tailwind, focused on clean design and responsiveness.</p><div className="flex flex-wrap gap-2 text-slate-100"><span className="font-jet rounded-xl bg-slate-600 px-2 py-1 text-sm">Next.js</span><span className="font-jet rounded-xl bg-slate-600 px-2 py-1 text-sm">Tailwind</span></div><div className="text-theme2 font-orbitron flex w-fit items-center gap-3 text-lg font-semibold">See more<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="transition-all duration-300 group-hover:translate-x-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg> <ArrowRig</div></div></a>
                    </div>
                </div>
            </section>
        </>
    );
}
