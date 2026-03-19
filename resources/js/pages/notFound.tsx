import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <>
            <Head title="404 - Stranica nije pronađena" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/design/hardwood.jpg')] bg-cover bg-no-repeat text-center">
                <h1 className="text-8xl font-bold text-likar3">404</h1>
                <p className="my-12 font-heading text-5xl text-likar1 my-text-stroke2">
                    Stranica koju ste zatražili ne postoji.
                </p>

                <div>
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
