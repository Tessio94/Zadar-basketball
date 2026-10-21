import { Maximize2 } from 'lucide-react';
import { escapeCaption, galleryImageSources, type GalleryDisplayImage } from './galleryImage';
import GalleryPhoto from './galleryPhoto';

type GallerySlideProps = {
    image: GalleryDisplayImage;
    index: number;
    total: number;
    selected: boolean;
    priority: boolean;
    group: string;
};

export default function GallerySlide({ image, index, total, selected, priority, group }: GallerySlideProps) {
    const sources = galleryImageSources(image);
    const alt = image.alt || image.caption || `Fotografija ${index + 1}`;

    return (
        <div
            className="relative h-full min-w-0 flex-[0_0_100%]"
            role="group"
            aria-roledescription="slajd"
            aria-label={`${index + 1} od ${total}`}
            aria-hidden={!selected}
        >
            <a
                href={sources.original}
                data-fancybox={group}
                data-type="image"
                data-thumb-src={sources.thumbnail}
                data-caption={escapeCaption(image.caption || image.alt || 'Likar galerija')}
                tabIndex={selected ? 0 : -1}
                aria-label={`Otvori izvornu fotografiju: ${alt}`}
                className="group relative block h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-likar3"
            >
                <GalleryPhoto
                    key={`${image.id}:${sources.preview}:${sources.original}`}
                    src={sources.preview}
                    fallbackSrc={sources.original}
                    alt={alt}
                    priority={priority}
                />
                <span className="pointer-events-none absolute top-4 right-4 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white opacity-100 backdrop-blur-sm transition-opacity group-focus-visible:opacity-100 xl:opacity-0 xl:group-hover:opacity-100 motion-reduce:transition-none">
                    <Maximize2 size={18} aria-hidden="true" />
                </span>
            </a>
        </div>
    );
}
