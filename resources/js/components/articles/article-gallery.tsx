import { Link } from '@inertiajs/react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, Expand, Images } from 'lucide-react';
import { useCallback, useSyncExternalStore } from 'react';
import type { KeyboardEvent } from 'react';
import { show } from '@/actions/App/Http/Controllers/GalleryController';
import {
    escapeCaption,
    galleryImageSources,
} from '@/components/myComponents/stranice/galerija/galleryImage';
import GalleryPhoto from '@/components/myComponents/stranice/galerija/galleryPhoto';
import useFancybox from '@/hooks/use-fancybox';
import type { Gallery as ArticleGalleryData } from '@/types/galleries';

const lightboxOptions = { Carousel: { infinite: false } };

export default function ArticleGallery({
    gallery,
}: {
    gallery: ArticleGalleryData;
}) {
    const [viewportRef, api] = useEmblaCarousel({
        loop: false,
        align: 'start',
    });
    const [fancyboxRef] = useFancybox(lightboxOptions);
    const subscribe = useCallback(
        (notify: () => void) => {
            if (!api) return () => {};
            api.on('select', notify).on('reInit', notify);
            return () => {
                api.off('select', notify).off('reInit', notify);
            };
        },
        [api],
    );
    const getSnapshot = useCallback(
        () => api?.selectedScrollSnap() ?? 0,
        [api],
    );
    const selected = useSyncExternalStore(subscribe, getSnapshot, () => 0);
    const images = gallery.images;

    function onKeyDown(event: KeyboardEvent<HTMLElement>) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
            return;
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
            return;
        event.preventDefault();
        if (event.key === 'ArrowLeft') api?.scrollPrev();
        if (event.key === 'ArrowRight') api?.scrollNext();
        if (event.key === 'Home') api?.scrollTo(0);
        if (event.key === 'End') api?.scrollTo(images.length - 1);
    }

    if (!images.length) return null;
    return (
        <section
            className="min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/35 focus-visible:outline-2 focus-visible:outline-likar3"
            aria-label={`Fotogalerija: ${gallery.title}`}
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={onKeyDown}
        >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
                <Images aria-hidden="true" className="h-5 w-5 text-likar3" />
                <div className="min-w-0">
                    <p className="text-xs tracking-widest text-slate-400 uppercase">
                        Fotogalerija
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-semibold text-slate-100">
                        {gallery.title}
                    </h2>
                </div>
            </div>
            <div ref={fancyboxRef}>
                <div ref={viewportRef} className="overflow-hidden">
                    <div className="flex touch-pan-y">
                        {images.map((image, index) => (
                            <figure
                                key={image.id}
                                className="min-w-0 flex-[0_0_100%]"
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${index + 1} od ${images.length}`}
                                aria-hidden={index !== selected}
                            >
                                <a
                                    href={galleryImageSources(image).original}
                                    data-fancybox={`article-gallery-${gallery.id}`}
                                    data-caption={escapeCaption(
                                        image.caption ?? image.alt ?? '',
                                    )}
                                    tabIndex={index === selected ? 0 : -1}
                                    className="group relative block aspect-[16/10] bg-slate-950/80 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-likar3"
                                    aria-label={`Otvori fotografiju ${index + 1} u punoj veličini`}
                                >
                                    <GalleryPhoto
                                        key={`${image.id}:${galleryImageSources(image).preview}`}
                                        src={galleryImageSources(image).preview}
                                        fallbackSrc={
                                            galleryImageSources(image).original
                                        }
                                        alt={
                                            image.alt ??
                                            `${gallery.title} — fotografija ${index + 1}`
                                        }
                                        priority={index === selected}
                                    />
                                    <span className="absolute right-3 bottom-3 rounded-full bg-black/60 p-2 text-white transition-colors group-hover:bg-likar3">
                                        <Expand
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </a>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 px-4 py-3">
                {images[selected]?.caption && (
                    <p className="mb-3 text-sm leading-relaxed text-slate-300">
                        {images[selected].caption}
                    </p>
                )}
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href={show(gallery.slug)}
                        className="text-sm font-medium text-slate-300 hover:text-likar3 hover:underline"
                    >
                        Sve fotografije
                    </Link>
                    <div className="flex items-center gap-3">
                        <span
                            className="text-xs text-slate-400 tabular-nums"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {selected + 1} / {images.length}
                        </span>
                        <button
                            type="button"
                            onClick={() => api?.scrollPrev()}
                            disabled={selected === 0}
                            aria-label="Prethodna fotografija"
                            className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-likar3 disabled:opacity-30"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => api?.scrollNext()}
                            disabled={selected === images.length - 1}
                            aria-label="Sljedeća fotografija"
                            className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-likar3 disabled:opacity-30"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
