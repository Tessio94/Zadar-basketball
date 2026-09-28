import { cn } from '@/lib/utils';
import type { GalleryImage } from '@/types/propTypes';

type PropType = {
    selected: boolean;
    image: GalleryImage;
    onClick: () => void;
};

const APP_URL = import.meta.env.VITE_APP_URL;

export const GalleryThumbnails = (props: PropType) => {
    const { selected, onClick, image } = props;

    return (
        <div
            className={cn(
                'embla-thumbs__slide',
                selected ? 'embla-thumbs__slide--selected' : '',
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__slide__number overflow-hidden rounded-lg"
            >
                <img
                    src={`${APP_URL}/storage/${image.path}`}
                    alt={image.alt ? image.alt : 'Likar galerija'}
                />
            </button>
        </div>
    );
};
