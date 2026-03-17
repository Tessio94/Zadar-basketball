import { cn } from '@/lib/utils';
import type { GalleryImage } from '@/types/propTypes';

type PropType = {
    selected: boolean;
    image: GalleryImage;
    onClick: () => void;
};

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
                <img src={image.url} alt={image.alt} />
            </button>
        </div>
    );
};
