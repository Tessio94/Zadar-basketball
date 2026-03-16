import useEmblaCarousel from 'embla-carousel-react';
import {
    usePrevNextButtons,
    PrevButton,
    NextButton,
} from '@/components/myComponents/ui/carousel/CarouselArrows';
import type { GameWithTeams } from '@/types/propTypes';
import GameHeaderCard from './gameHeaderCard';

const GameHeading = ({ games }: { games: GameWithTeams[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <header className="bg-likar2 pb-3">
            <div className="relative mx-auto max-w-[90%] pt-3">
                <div className="embla rounded-xl">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {games.map((game) => (
                                <GameHeaderCard game={game} key={game.id} />
                            ))}
                        </div>
                    </div>

                    <div className="absolute top-[calc(50%+6px)] -left-4.5 flex h-[calc(100%-12px)] w-6 -translate-y-1/2 flex-col items-center justify-center rounded-l-xl bg-likar3 text-slate-100">
                        <div>
                            <PrevButton
                                onClick={onPrevButtonClick}
                                disabled={prevBtnDisabled}
                            />
                        </div>
                    </div>
                    <div className="absolute top-[calc(50%+6px)] -right-4.5 flex h-[calc(100%-12px)] w-6 -translate-y-1/2 flex-col items-center justify-center rounded-r-xl bg-likar3 text-slate-100">
                        <div>
                            <NextButton
                                onClick={onNextButtonClick}
                                disabled={nextBtnDisabled}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default GameHeading;
