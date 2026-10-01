import { Head } from '@inertiajs/react';
import GalleryCarousel from '@/components/myComponents/stranice/galerija/galleryCarousel';
import { formatDate } from '@/lib/utils';
import type { Gallery } from '@/types/propTypes';

export default function Gallery({ gallery }: { gallery: Gallery }) {
    console.log('gallery', gallery);
    return (
        <>
            <Head>
                <title>Galerija | Likar Krombacher</title>
                <meta
                    name="description"
                    content="Galerija fotografija Likar Krombacher"
                />
            </Head>
            <section className="px-[5%] py-10 xl:my-5">
                <div className="mb-10 flex flex-col items-start gap-5">
                    <h1 className="font-heading text-5xl font-semibold text-slate-100">
                        {gallery.title}
                    </h1>
                    <time
                        dateTime="2026-07-07"
                        className="text-center font-heading text-base text-slate-100"
                    >
                        {gallery.date
                            ? formatDate(new Date(gallery.date))
                            : formatDate(new Date(gallery.created_at))}
                    </time>
                </div>
                <GalleryCarousel images={gallery.images} />
            </section>
        </>
    );
}
