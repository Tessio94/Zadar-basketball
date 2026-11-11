import GalleryCarousel from '@/components/myComponents/stranice/galerija/galleryCarousel';
import Seo from '@/components/seo';
import { formatDate } from '@/lib/utils';
import type { Gallery } from '@/types/galleries';

export default function Gallery({ gallery }: { gallery: Gallery }) {
    const date = gallery.date || gallery.created_at;
    return (
        <>
            <Seo
                title={`${gallery.title} | Likar Zadar`}
                description={`Fotogalerija „${gallery.title}“ iz LIKAR lige Zadar. Pogledajte fotografije s utakmica i događanja lige.`}
                url={`/galerija/${gallery.slug}`}
                image={
                    gallery.images[0]
                        ? `/storage/${gallery.images[0].path}`
                        : undefined
                }
                imageAlt={gallery.images[0]?.alt || gallery.title}
            />

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
