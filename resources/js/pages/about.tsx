import LandingLayout from '@/layouts/landing/landing-layout';

export default function About() {
    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
                <div className="relative flex min-h-270 flex-row items-start overflow-hidden rounded-2xl border border-likar1 bg-[url('/hardwood.jpg')] bg-cover bg-no-repeat shadow-2xl shadow-likar1 max-2xl:bg-position-[30%] max-xl:bg-position-[50%] max-md:bg-position-[70%]">
                    <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 to-transparent" />
                    <div className="z-0 flex h-full min-h-270 w-full flex-col justify-between gap-10 p-8 px-4 sm:p-10 lg:p-15 xl:w-2/3 xl:p-20 2xl:w-1/2">
                        <h4 className="font-heading text-7xl font-bold text-likar3 my-text-stroke2">
                            Vrati se onome što voliš
                        </h4>
                        <p className="font-text text-2xl text-slate-100">
                            Šest godina nakon osnutka, LIKAR – Liga košarkaških
                            amatera i rekreativaca potvrđuje status
                            nezaobilaznog dijela zadarske sportske scene. Od
                            Jazina do Višnjika, liga je rasla zajedno sa svojom
                            zajednicom.
                        </p>
                        <p className="font-text text-2xl text-slate-100">
                            Pokrenuta entuzijazmom zaljubljenika u košarku,
                            LIKAR je od devet početnih momčadi izrasla u
                            prepoznatljivo gradsko natjecanje. Danas se utakmice
                            igraju na Višnjiku, uz sve veći broj ekipa i
                            gledatelja.
                        </p>
                        <p className="font-text text-2xl text-slate-100">
                            LIKAR svake godine donosi novu sezonu amaterske
                            košarke u Zadru, ali ista strast ostaje. Od prve
                            lopte u Jazinama do današnjih ogleda na Višnjiku,
                            cilj je isti – ljubav prema igri i zajedništvo.
                        </p>
                        <p className="font-heading text-5xl font-bold text-slate-100 my-text-stroke2">
                            Zaigraj ponovno sa prijateljima
                        </p>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
