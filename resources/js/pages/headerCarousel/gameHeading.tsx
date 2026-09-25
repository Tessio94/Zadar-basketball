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

                    <div className="absolute top-0 bottom-0 -left-4.5 translate-y-3 text-slate-100">
                        <PrevButton
                            onClick={onPrevButtonClick}
                            disabled={prevBtnDisabled}
                            buttonOrigin="gamesHeader"
                        />
                    </div>
                    <div className="absolute top-0 -right-4.5 bottom-0 translate-y-3 text-slate-100">
                        <NextButton
                            onClick={onNextButtonClick}
                            disabled={nextBtnDisabled}
                            buttonOrigin="gamesHeader"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default GameHeading;
