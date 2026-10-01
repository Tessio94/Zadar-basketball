import PlayoffBracketCard from './playoffBracketCard';

export default function PlayoffBracket() {
    return (
        <div className="mb-10 grid grid-cols-3 overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover bg-no-repeat">
            <div className="pb-5">
                <div className="mx-auto mb-5 bg-[url('images/design/shortSnow2.png')] bg-cover bg-position-[50%_-6px] bg-no-repeat py-5">
                    <p className="mb-1 text-center font-heading text-3xl text-slate-100">
                        Četvrtfinale
                    </p>
                </div>
                <div className="mx-2.5 flex flex-col gap-10">
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
            <div className="flex flex-col pb-5">
                <div className="mx-auto mb-5 w-full bg-[url('images/design/shortSnow2.png')] bg-cover bg-position-[50%_-6px] bg-no-repeat py-5 text-center font-heading text-3xl text-slate-100">
                    <p className="mb-1 text-center font-heading text-3xl text-slate-100">
                        Polufinale
                    </p>
                </div>
                <div className="mx-2.5 flex grow flex-col justify-center gap-10">
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
            <div className="flex flex-col pb-5">
                <div className="mx-auto mb-5 w-full bg-[url('images/design/shortSnow2.png')] bg-cover bg-position-[50%_-6px] bg-no-repeat py-5 text-center font-heading text-3xl text-slate-100">
                    <p className="mb-1 text-center font-heading text-3xl text-slate-100">
                        Finale
                    </p>
                </div>
                <div className="mx-2.5 flex grow flex-col justify-center">
                    <div className="flex flex-col rounded-2xl bg-likar2">
                        <PlayoffBracketCard />
                        <PlayoffBracketCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
