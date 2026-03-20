import { Plus } from 'lucide-react';

export default function AddOptions() {
    return (
        <div className="relative z-10 flex h-full flex-row items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover dark:border-sidebar-border">
            <div className="flex flex-row flex-wrap justify-center gap-5 p-5">
                <div className="basis-full xl:basis-5/12">
                    <button className="flex w-full flex-row items-center justify-center gap-2 rounded-xl bg-likar2 px-3 py-1.5 text-base font-semibold text-slate-100">
                        <Plus />
                        Dodaj utakmice
                    </button>
                </div>
                <div className="basis-full xl:basis-5/12">
                    <button className="flex w-full flex-row items-center justify-center gap-2 rounded-xl bg-likar2 px-3 py-1.5 text-base font-semibold text-slate-100">
                        <Plus />
                        Dodaj ekipe
                    </button>
                </div>

                <div className="basis-full xl:basis-5/12">
                    <button className="flex w-full flex-row items-center justify-center gap-2 rounded-xl bg-likar2 px-3 py-1.5 text-base font-semibold text-slate-100">
                        <Plus />
                        Dodaj novosti
                    </button>
                </div>
                <div className="basis-full xl:basis-5/12">
                    <button className="flex w-full flex-row items-center justify-center gap-2 rounded-xl bg-likar2 px-3 py-1.5 text-base font-semibold text-slate-100">
                        <Plus />
                        Dodaj galeriju
                    </button>
                </div>
            </div>
        </div>
    );
}
