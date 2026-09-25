import { Head } from '@inertiajs/react';
import GalleryCarousel from '@/components/myComponents/stranice/galerija/galleryCarousel';

export default function Gallery() {
    return (
        <>
            <Head>
                <title>Galerija | Likar Krombacker</title>
                <meta
                    name="description"
                    content="Galerija fotografija Likar Krombacker"
                />
            </Head>
            ;
            <section className="px-[5%] py-10 xl:my-5">
                <div className="mb-10 flex flex-col items-start gap-5">
                    <h1 className="font-heading text-5xl font-semibold text-slate-100">
                        Galerija
                    </h1>
                    <time
                        dateTime="2026-07-07"
                        className="text-center font-heading text-base text-slate-100"
                    >
                        7/7/2026
                    </time>
                </div>
                <GalleryCarousel />
            </section>
        </>
    );
}
