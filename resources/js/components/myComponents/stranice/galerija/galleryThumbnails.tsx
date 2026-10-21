import { galleryImageSources, type GalleryDisplayImage } from './galleryImage';
import GalleryPhoto from './galleryPhoto';

type GalleryThumbnailsProps = {
    selected: boolean;
    image: GalleryDisplayImage;
    index: number;
    onClick: () => void;
};

export function GalleryThumbnails({
    selected,
    onClick,
    image,
    index,
}: GalleryThumbnailsProps) {
    const sources = galleryImageSources(image);

    return (
        <div className="min-w-0 flex-[0_0_80px] py-1 pl-3 sm:flex-[0_0_112px]">
            <button
                onClick={onClick}
                type="button"
                aria-label={`Prikaži fotografiju ${index + 1}${image.alt ? `: ${image.alt}` : ''}`}
                aria-current={selected ? 'true' : undefined}
                data-gallery-thumbnail={index}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-lg border-2 bg-slate-950 transition-[border-color,opacity] focus-visible:border-likar3 focus-visible:opacity-100 focus-visible:outline-none motion-reduce:transition-none ${
                    selected
                        ? 'border-likar3 opacity-100'
                        : 'border-transparent opacity-50 hover:opacity-100'
                }`}
            >
                <GalleryPhoto
                    key={`${image.id}:${sources.thumbnail}:${sources.original}`}
                    src={sources.thumbnail}
                    fallbackSrc={sources.original}
                    alt=""
                    thumbnail
                    priority={selected || index < 6}
                />
            </button>
        </div>
    );
}
