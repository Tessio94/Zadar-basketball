import { Maximize2 } from 'lucide-react';
import type { GalleryImage } from '@/types/propTypes';

export default function GallerySlide({ image }: { image: GalleryImage }) {
    return (
        <div className="embla__slide gallery">
            <a
                href={`/storage/${image.path}`}
                data-fancybox="gallery"
                data-caption={
                    image.caption
                        ? image.caption
                        : image.alt
                          ? image.alt
                          : 'Likar galerija'
                }
                className="group relative"
            >
                <img
                    src={`/storage/${image.path}`}
                    alt={image.alt ? image.alt : 'Likar galerija'}
                    className="cursor-zoom-in"
                />
                <span className="pointer-events-none absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-100 backdrop-blur-sm xl:opacity-0 xl:transition-opacity xl:duration-200 xl:group-hover:opacity-100">
                    <Maximize2 size={18} />
                </span>
            </a>
        </div>
    );
}
