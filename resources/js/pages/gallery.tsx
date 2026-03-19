import { Head } from '@inertiajs/react';
import GalleryCarousel from '@/components/myComponents/stranice/galerija/galleryCarousel';

export default function Gallery() {
    <Head>
        <title>Galerija | Likar Krombacker</title>
        <meta name="description" content="Your page description" />
    </Head>;
    return (
        <>
            <section className="my-20 px-[5%]">
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
