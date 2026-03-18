import type { EmblaCarouselType } from 'embla-carousel';
import ClassNames from 'embla-carousel-class-names';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
// import { useEffect, useState, useCallback } from 'react';
import {
    usePrevNextButtons,
    PrevButton,
    NextButton,
} from '@/components/myComponents/ui/carousel/CarouselArrows';
import GallerySlide from './gallerySlide';
import { GalleryThumbnails } from './galleryThumbnails';
// import { GalleryThumbnails } from './galleryThumbnails';

const images = [
    {
        id: 1,
        url: '/images/galerija/image1.jpg',
        alt: 'image 1 description',
    },
    {
        id: 2,
        url: '/images/galerija/image2.jpg',
        alt: 'image 2 description',
    },
    {
        id: 3,
        url: '/images/galerija/image3.jpg',
        alt: 'image 3 description',
    },
    {
        id: 4,
        url: '/images/galerija/image4.jpg',
        alt: 'image 4 description',
    },
];

const GalleryCarousel = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: false }, [
        ClassNames(),
    ]);

    // const logSelectedSnap = (emblaMainApi: EmblaCarouselType) => {
    //     console.log(emblaMainApi.selectedScrollSnap());
    // };

    // useEffect(() => {
    //     if (!emblaMainApi) return;
    //     emblaMainApi.on('select', logSelectedSnap);
    // }, [emblaMainApi]);

    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi],
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();

        emblaMainApi.on('select', onSelect).on('reinit', onSelect);
    }, [emblaMainApi, onSelect]);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaMainApi);

    return (
        <div className="relative mx-auto w-full rounded-2xl">
            <div className="embla gallery">
                <div
                    className="embla__viewport overflow-hidden rounded-2xl"
                    ref={emblaMainRef}
                >
                    <div className="embla__container">
                        {images.map((image) => (
                            <GallerySlide image={image} key={image.id} />
                        ))}
                    </div>
                </div>

                <div className="embla-thumbs">
                    <div
                        className="embla-thumbs__viewport"
                        ref={emblaThumbsRef}
                    >
                        <div className="embla-thumbs__container">
                            {images.map((image, index) => (
                                <GalleryThumbnails
                                    key={index}
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    image={image}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute top-[calc(50%+6px)] left-6 -translate-y-1/2 text-slate-100">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                        buttonOrigin="galerija"
                    />
                </div>
                <div className="absolute top-[calc(50%+6px)] right-6 -translate-y-1/2 text-slate-100">
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                        buttonOrigin="galerija"
                    />
                </div>
            </div>
        </div>
    );
};

export default GalleryCarousel;
