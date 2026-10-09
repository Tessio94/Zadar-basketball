import { Image } from 'lucide-react';

export default function EmptyGallery() {
    return (
        <section className="px-[5%] py-10 xl:my-5">
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border-2 border-likar3 bg-likar2 p-10 text-center shadow-lg shadow-likar1">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-600">
                    <Image className="h-10 w-10 text-slate-100" />
                </div>

                <h2 className="font-heading text-4xl font-semibold text-slate-100">
                    Nema galerija
                </h2>

                <p className="mt-4 max-w-xl font-text text-lg text-slate-300">
                    Ovdje ćemo objavljivati najnovije fotografije i ostale
                    medije iz lige.
                </p>

                <p className="mt-2 font-text text-base text-slate-400">
                    Prve galerije stižu uskoro!
                </p>
            </div>
        </section>
    );
}
