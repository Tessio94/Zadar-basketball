import { usePage } from '@inertiajs/react';
import Footer from '@/components/myComponents/stranice/naslovnica/footer';
import GameHeading from '@/pages/headerCarousel/gameHeading';
import type { GameLayoutProps } from '@/types';
import type { GameWithTeams } from '@/types/games';

const GameLayout = ({ children }: GameLayoutProps) => {
    const { games } = usePage<{ games: GameWithTeams[] }>().props;

    return (
        <>
            <GameHeading games={games} />
            {children}
            <Footer />
        </>
    );
};

export default GameLayout;
