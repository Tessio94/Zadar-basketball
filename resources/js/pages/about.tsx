import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head>
                <title>O nama | Likar Krombacher</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="px-[5%] py-10 xl:my-5">
                <div className="relative flex h-fit flex-row items-start overflow-hidden rounded-2xl border border-likar1 bg-[url('/images/design/hardwood.jpg')] bg-cover bg-no-repeat shadow-2xl shadow-likar1 max-2xl:bg-position-[30%] max-xl:bg-position-[50%] max-md:bg-position-[70%]">
                    <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 via-slate-900/70 via-50% to-transparent" />

                    <div className="z-0 flex w-full flex-col justify-between gap-10 p-8 px-4 sm:p-10 lg:p-15 xl:w-2/3 xl:p-20 2xl:w-1/2">
                        <h4 className="text-center font-heading text-6xl font-bold text-likar3 my-text-stroke2 min-[450px]:text-7xl">
                            Likar Krombacher Zadar
                        </h4>
                        <p className="font-text text-2xl text-slate-100">
                            Šest godina nakon osnutka, LIKAR – Liga košarkaških
                            amatera i rekreativaca potvrđuje status
                            nezaobilaznog dijela zadarske sportske scene. Od
                            prvih utakmica u Jazinama do današnjih susreta na
                            Višnjiku, liga nastavlja okupljati ljubitelje
                            amaterske košarke.
                        </p>
                        <p className="font-text text-2xl text-slate-100">
                            Pokrenuta entuzijazmom zaljubljenika u košarku,
                            LIKAR je od devet početnih momčadi izrasla u
                            prepoznatljivo gradsko natjecanje. Šest sezona
                            donijelo je velik broj utakmica, različitih momčadi
                            i igrača, ali format natjecanja ostao je usmjeren na
                            ono najvažnije – igranje košarke i međusobno
                            natjecanje.
                        </p>
                        <p className="font-text text-2xl text-slate-100">
                            Nova sezona LIKAR-a donosi nove utakmice, nove
                            momčadi i nove prilike za natjecanje. Ako voliš
                            košarku, želiš igrati u organiziranom natjecanju i
                            biti dio zadarske košarkaške priče, priključi se
                            LIKAR-u.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
