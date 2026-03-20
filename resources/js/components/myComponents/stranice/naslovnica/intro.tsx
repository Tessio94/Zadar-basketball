import { ChartColumn } from 'lucide-react';
import BasketballIcon from '../../ui/icons/basketballIcon';

export default function Intro() {
    return (
        <>
            <section className="my-20 w-full">
                <div className="mx-auto grid w-full place-items-center-safe gap-10 px-[5%] py-10 perspective-distant sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-4xl bg-likar2/60 px-6 py-8 shadow-2xl shadow-likar1 transition-all duration-300 transform-3d hover:-translate-y-3 hover:rotate-x-12 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] sm:w-fit">
                        <img
                            src="/images/design/trophy.svg"
                            alt=""
                            className="h-20 w-20 rounded-full bg-likar1 p-2.5"
                        />
                        <h4 className="text-center font-heading text-2xl font-semibold text-slate-100">
                            Amaterska liga
                        </h4>
                        <p className="text-center font-text text-xl text-slate-100">
                            Natjecanje za rekretivne košarkaše
                        </p>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-4xl bg-likar2/60 px-6 py-8 shadow-2xl shadow-likar1 transition-all duration-300 transform-3d hover:-translate-y-3 hover:rotate-x-12 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] sm:w-fit">
                        <BasketballIcon
                            width={80}
                            height={80}
                            fill={'#f1f5f9'}
                            className="rounded-full bg-likar1 p-2.5"
                        />
                        <h4 className="text-center font-heading text-2xl font-semibold text-slate-100">
                            Tjedne utakmice
                        </h4>
                        <p className="text-center font-text text-xl text-slate-100">
                            Prijavite tim i igrajte svaki tjedan
                        </p>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-4xl bg-likar2/60 px-6 py-8 shadow-2xl shadow-likar1 transition-all duration-300 transform-3d hover:-translate-y-3 hover:rotate-x-12 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] max-lg:col-span-2 max-sm:col-span-1 sm:w-fit">
                        <ChartColumn className="h-20 w-20 rounded-full bg-likar1 p-2.5 text-slate-100" />
                        <h4 className="text-center font-heading text-2xl font-semibold text-slate-100">
                            Statistika i tablice
                        </h4>
                        <p className="text-center font-text text-xl text-slate-100">
                            Pogledajte rezultate, ljestvice i statistike
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
