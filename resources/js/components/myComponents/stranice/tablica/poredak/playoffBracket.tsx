import PlayoffBracketCard from './playoffBracketCard';

export default function PlayoffBracket() {
    return (
        <div className="mb-10 overflow-hidden rounded-xl border border-likar1 shadow-xl shadow-likar1">
            <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                <div className="grid w-full min-w-250 grid-cols-3 overflow-hidden bg-[url('/images/design/snow4.jpg')] bg-cover bg-no-repeat">
                    <div className="">
                        <div className="mx-auto bg-slate-900">
                            <p className="border-r border-likar4 py-2 text-center font-heading text-xl text-slate-100 uppercase">
                                Četvrtfinale
                            </p>
                        </div>
                        <div className="relative flex flex-col gap-10 border-r border-likar4 px-2.5 py-5">
                            <div className="absolute inset-0 bg-slate-900/40" />
                            <div className="flex flex-col rounded-2xl bg-likar2">
                                <PlayoffBracketCard />
                                <PlayoffBracketCard />
                            </div>
                            <div className="flex flex-col rounded-2xl bg-likar2">
                                <PlayoffBracketCard />
                                <PlayoffBracketCard />
                            </div>
                            <div className="flex flex-col rounded-2xl bg-likar2">
                                <PlayoffBracketCard />
                                <PlayoffBracketCard />
                            </div>
                            <div className="flex flex-col rounded-2xl bg-likar2">
                                <PlayoffBracketCard />
                                <PlayoffBracketCard />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mx-auto w-full bg-slate-900">
                            <p className="border-r border-likar4 py-2 text-center font-heading text-xl text-slate-100 uppercase">
                                Polufinale
                            </p>
                        </div>
                        <div className="relative flex grow flex-col justify-center gap-10 border-r border-likar4 px-2.5 py-5">
                            <div className="absolute inset-0 bg-slate-900/40" />
                            <div className="flex flex-col rounded-2xl bg-likar2">
                                <PlayoffBracketCard />
                                <PlayoffBracketCard />
                            </div>
                            <div className="flex flex-col rounded-2xl bg-likar2">
                                <PlayoffBracketCard />
                                <PlayoffBracketCard />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mx-auto w-full bg-slate-900 py-2">
                            <p className="text-center font-heading text-xl text-slate-100 uppercase">
                                Finale
                            </p>
                        </div>
                        <div className="relative flex grow flex-col justify-center px-2.5 py-5">
                            <div className="absolute inset-0 bg-slate-900/40" />
                            <div className="flex flex-col rounded-2xl bg-likar2">
                                <PlayoffBracketCard />
                                <PlayoffBracketCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
