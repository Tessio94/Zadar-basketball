import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <>
            <Head title="404 - Stranica nije pronađena" />

            <div className="relative flex items-center justify-center overflow-hidden text-center">
                <video
                    className="h-auto min-h-screen w-full object-cover object-right md:object-left"
                    autoPlay
                    muted
                    playsInline
                    width={1920}
                    height={1080}
                    preload="auto"
                >
                    <source src="/video/video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 animate-[fadeInUp_0.8s_ease-out_3s_forwards] bg-black/70 opacity-0" />

                <div className="bg-likar absolute z-100 animate-[fadeInUp_0.8s_ease-out_3s_forwards] rounded-2xl opacity-0">
                    <h1 className="text-8xl font-bold text-likar3">404</h1>

                    <p className="my-12 font-heading text-5xl text-likar1 my-text-stroke2">
                        Stranica koju ste zatražili ne postoji.
                    </p>

                    <Link
                        className="hover:bg-theme4 rounded-4xl border-2 border-transparent bg-likar3 px-5 py-2.5 font-text text-2xl font-semibold text-slate-100 transition-all duration-300 hover:border-slate-100 max-[1400px]:px-7 max-[1400px]:py-3 max-[640px]:text-2xl"
                        href="/"
                    >
                        Naslovnica
                    </Link>
                </div>
            </div>
        </>
    );
}

NotFound.layout = (page: React.ReactNode) => page;
