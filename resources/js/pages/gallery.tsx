import { Head } from '@inertiajs/react';
import GalleryCarousel from '@/components/myComponents/stranice/galerija/galleryCarousel';
import { formatDate } from '@/lib/utils';
import type { Gallery } from '@/types/propTypes';

export default function Gallery({ gallery }: { gallery: Gallery }) {
    const date = gallery.date || gallery.created_at;
    return (
        <>
            <Head>
                <title>{`${gallery.title} | Likar Krombacher`}</title>
                <meta
                    name="description"
                    content={`Galerija fotografija: ${gallery.title} | Likar Krombacher`}
                />
            </Head>

            <section className="px-[5%] py-10 xl:my-5">
                <div className="mb-10 flex flex-col items-start gap-5">
                    <p className="text-xs font-bold tracking-[0.18em] text-likar3 uppercase">
                        Galerija fotografija
                    </p>
                    <h1 className="font-heading text-4xl font-semibold text-slate-100 sm:text-5xl">
                        {gallery.title}
                    </h1>
                    <time
                        dateTime={date}
                        className="text-center font-heading text-base text-slate-100"
                    >
                        {formatDate(new Date(date))}
                    </time>
                </div>
                <GalleryCarousel images={gallery.images} />
            </section>
        </>
    );
}
