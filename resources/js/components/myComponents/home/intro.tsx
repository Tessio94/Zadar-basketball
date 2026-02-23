import { ChartColumn } from 'lucide-react';

export default function Intro() {
    return (
        <>
            <div className="mt-70 mb-50 w-full">
                <div className="mx-auto grid w-full place-items-center-safe gap-10 px-[5%] py-10 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex w-fit flex-col items-center justify-center gap-8 rounded-4xl bg-likar2/60 px-6 py-8">
                        <img
                            src="/trophy.svg"
                            alt=""
                            className="h-20 w-20 rounded-full bg-likar1 p-2.5"
                        />
                        <h4 className="text-center text-2xl font-semibold text-slate-100">
                            Amaterska liga
                        </h4>
                        <p className="text-center text-xl text-slate-100">
                            Natjecanje za rekretivne košarkaše
                        </p>
                    </div>
                    <div className="flex w-fit flex-col items-center justify-center gap-8 rounded-4xl bg-likar2/60 px-6 py-8">
                        <img
                            src="/basketball.svg"
                            alt=""
                            className="h-20 w-20 rounded-full bg-likar1 p-2.5"
                        />
                        <h4 className="text-center text-2xl font-semibold text-slate-100">
                            Tjedne utakmice
                        </h4>
                        <p className="text-center text-xl text-slate-100">
                            Prijavite tim i igrajte svaki tjedan
                        </p>
                    </div>
                    <div className="flex w-fit flex-col items-center justify-center gap-8 rounded-4xl bg-likar2/60 px-6 py-8">
                        <ChartColumn className="h-20 w-20 rounded-full bg-likar1 p-2.5 text-slate-100" />
                        <h4 className="text-center text-2xl font-semibold text-slate-100">
                            Statistika i tablice
                        </h4>
                        <p className="text-center text-xl text-slate-100">
                            Pogledajte rezultate, ljestvice i statistike
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
