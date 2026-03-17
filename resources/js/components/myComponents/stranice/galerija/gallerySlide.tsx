import type { GalleryImage } from '@/types/propTypes';

export default function GallerySlide({ image }: { image: GalleryImage }) {
    return (
        <div className="embla__slide gallery">
            <img src={image.url} alt={image.alt} />
        </div>
    );
}
