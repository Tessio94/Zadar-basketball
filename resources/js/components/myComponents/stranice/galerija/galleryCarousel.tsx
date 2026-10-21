import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useEffect, useId, type KeyboardEvent } from 'react';
import useFancybox from '@/hooks/use-fancybox';
import useGalleryState from '@/hooks/use-gallery-state';
import type { GalleryDisplayImage } from './galleryImage';
import GallerySlide from './gallerySlide';
import { GalleryThumbnails } from './galleryThumbnails';

const FANCYBOX_OPTIONS = {
    Carousel: { infinite: false },
} satisfies NonNullable<Parameters<typeof useFancybox>[0]>;

export default function GalleryCarousel({
    images,
}: {
    images: GalleryDisplayImage[];
}) {
    const group = useId();
    const [mainRef, mainApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
    });
    const [thumbsRef, thumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });
    const [fancyboxRef] = useFancybox(FANCYBOX_OPTIONS);

    const { selectedIndex, canGoBack, canGoForward } = useGalleryState(mainApi);

    // Synchronize the other external carousel; no React state setters are needed.
    useEffect(() => {
        thumbsApi?.scrollTo(selectedIndex);
    }, [thumbsApi, selectedIndex]);

    function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (
            !mainApi ||
            images.length < 2 ||
            event.defaultPrevented ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey
        )
            return;

        const target = event.target;

        if (
            target instanceof HTMLElement &&
            (target.isContentEditable ||
                target.closest('input, textarea, select, [role="textbox"]'))
        )
            return;

        const currentIndex = mainApi.selectedScrollSnap();
        let nextIndex: number;

        switch (event.key) {
            case 'ArrowLeft':
                nextIndex = Math.max(0, currentIndex - 1);
                break;
            case 'ArrowRight':
                nextIndex = Math.min(images.length - 1, currentIndex + 1);
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = images.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        mainApi.scrollTo(nextIndex);

        // Keep thumbnail focus on the photo now being displayed.
        if (
            target instanceof HTMLElement &&
            target.closest('[data-gallery-thumbnail]')
        ) {
            event.currentTarget
                .querySelector<HTMLButtonElement>(
                    `[data-gallery-thumbnail="${nextIndex}"]`,
                )
                ?.focus({ preventScroll: true });
        }
    }

    if (images.length === 0) {
        return (
            <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-slate-950/70 px-6 py-12 text-center">
                <Images className="size-10 text-likar3" aria-hidden="true" />
                <h2 className="font-heading text-2xl text-slate-100">
                    Fotografije stižu uskoro
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                    U ovu galeriju još nisu dodane fotografije.
                </p>
            </div>
        );
    }

    return (
        <div
            ref={fancyboxRef}
            role="region"
            aria-roledescription="karusel"
            aria-label="Fotografije galerije. Za navigaciju koristite strelice, Home ili End."
            tabIndex={images.length > 1 ? 0 : undefined}
            onKeyDown={onKeyDown}
            className="mx-auto w-full min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-likar3"
        >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101317]">
                <div
                    ref={mainRef}
                    className="h-[min(65svh,720px)] min-h-0 touch-pan-y overflow-hidden"
                >
                    <div className="flex h-full">
                        {images.map((image, index) => (
                            <GallerySlide
                                key={image.id}
                                image={image}
                                index={index}
                                total={images.length}
                                selected={index === selectedIndex}
                                priority={Math.abs(index - selectedIndex) <= 1}
                                group={group}
                            />
                        ))}
                    </div>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Prethodna fotografija"
                            disabled={!canGoBack}
                            onClick={() => mainApi?.scrollPrev()}
                            className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-likar2 bg-likar4 text-slate-100 backdrop-blur-sm transition-[background] duration-150 ease-in hover:bg-likar1 focus-visible:outline-2 focus-visible:outline-likar3 disabled:cursor-not-allowed disabled:opacity-25 sm:left-4"
                        >
                            <ChevronLeft
                                className="size-6"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            type="button"
                            aria-label="Sljedeća fotografija"
                            disabled={!canGoForward}
                            onClick={() => mainApi?.scrollNext()}
                            className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-likar2 bg-likar4 text-slate-100 backdrop-blur-sm transition-[background] duration-150 ease-in hover:bg-likar1 focus-visible:outline-2 focus-visible:outline-likar3 disabled:cursor-not-allowed disabled:opacity-25 sm:right-4"
                        >
                            <ChevronRight
                                className="size-6"
                                aria-hidden="true"
                            />
                        </button>
                    </>
                )}
            </div>

            <div className="flex items-center justify-between gap-4 px-1 py-3 text-xs text-slate-400">
                <p>Klikni fotografiju za prikaz u punoj veličini.</p>
                <p
                    className="shrink-0 tabular-nums"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <span className="font-semibold text-slate-100">
                        {selectedIndex + 1}
                    </span>{' '}
                    / {images.length}
                </p>
            </div>

            {images.length > 1 && (
                <div
                    ref={thumbsRef}
                    className="touch-pan-y overflow-hidden"
                    aria-label="Odaberi fotografiju"
                >
                    <div className="-ml-3 flex">
                        {images.map((image, index) => (
                            <GalleryThumbnails
                                key={image.id}
                                image={image}
                                index={index}
                                selected={index === selectedIndex}
                                onClick={() => mainApi?.scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
