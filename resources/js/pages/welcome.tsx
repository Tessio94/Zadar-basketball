import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing/landing-layout';

export default function Welcome() {
    return (
        <LandingLayout>
            <Head title="Naslovnica"></Head>
            <>
                <img src="/hardwood.jpg" alt="" className="" />

                <div className="from-theme4/90 to-theme4/20 absolute inset-0 z-10 bg-linear-to-r"></div>
                <div className="absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-6 px-6 max-[1400px]:gap-4 max-[1024px]:gap-6 sm:px-10 lg:left-18 lg:w-auto lg:translate-x-0 lg:px-0">
                    <h1 className="text-center text-8xl font-bold text-slate-100 max-[1700px]:text-8xl max-[1500px]:text-7xl max-[640px]:text-5xl max-[400px]:text-4xl">
                        Likar <span className="text-theme1">Krombacher</span>
                    </h1>
                    <h3 className="text-start text-3xl text-slate-100 max-[400px]:text-2xl">
                        Lika košarkaških amatera i rekreativaca
                    </h3>

                    <div className="mt-5">
                        <a
                            className="hover:bg-theme4 rounded-4xl border-2 border-transparent bg-likar1 px-10 py-5 text-3xl font-semibold text-slate-100 transition-all duration-300 hover:border-slate-100 max-[1400px]:px-7 max-[1400px]:py-3 max-[640px]:text-2xl"
                            href="/kontakt"
                        >
                            Rezervirajte termin
                        </a>
                    </div>
                </div>
            </>
        </LandingLayout>
    );
}
