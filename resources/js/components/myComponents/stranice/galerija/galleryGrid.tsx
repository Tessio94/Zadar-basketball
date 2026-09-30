import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Gallery, Paginated } from '@/types/propTypes';

export default function GalleryGrid({
    galleries,
}: {
    galleries: Paginated<Gallery>;
}) {
    return (
        <div className="grid w-fit items-start gap-10 rounded-2xl sm:grid-cols-2 xl:grid-cols-4">
            {galleries.data.map((gallery: Gallery) => {
                return (
                    <Link
                        key={gallery.id}
                        href={`/galerija/${gallery.slug}`}
                        rel="noopener noreferrer"
                        className="group relative z-100 flex aspect-video cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-likar1 shadow-lg shadow-likar1"
                    >
                        <div className="shrink-0 overflow-hidden">
                            <img
                                src={
                                    gallery.images.length > 0
                                        ? `/storage/${gallery.images[0].path}`
                                        : '/images/design/landing.jpg'
                                }
                                alt=""
                                loading="lazy"
                                className="transition-transform duration-300"
                            />
                        </div>
                        <div className="absolute top-1/5 right-0 bottom-0 left-0 bg-linear-to-b from-transparent to-slate-900 transition-transform duration-300 xl:translate-y-full xl:group-hover:translate-y-0" />
                        <div className="absolute top-1/2 left-1/2 flex w-fit max-w-full grow -translate-y-1/2 flex-col justify-between gap-3 p-3 opacity-100 transition-all delay-200 duration-300 max-xl:-translate-x-1/2 xl:opacity-0 xl:group-odd:-translate-x-full xl:group-even:translate-x-full xl:group-odd:group-hover:-translate-x-1/2 xl:group-odd:group-hover:opacity-100 xl:group-even:group-hover:-translate-x-1/2 xl:group-even:group-hover:opacity-100">
                            <h5 className="text-center font-heading text-lg font-semibold text-slate-100">
                                {gallery.title}
                            </h5>
                            <time
                                dateTime="2026-07-07"
                                className="text-center font-heading text-base text-slate-100"
                            >
                                {gallery.date
                                    ? formatDate(new Date(gallery.date))
                                    : formatDate(new Date(gallery.created_at))}
                            </time>
                            <div className="text-theme2 flex w-fit items-center gap-3 text-center font-heading text-lg font-semibold text-nowrap text-likar3">
                                Pogledaj više
                                <ArrowRight className="text-likar3 transition-all duration-300 group-hover:translate-x-1.5" />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
