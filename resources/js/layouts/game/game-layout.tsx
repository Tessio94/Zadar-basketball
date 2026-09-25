import { usePage } from '@inertiajs/react';
import Footer from '@/components/myComponents/stranice/naslovnica/footer';
import GameHeading from '@/pages/headerCarousel/gameHeading';
import type { GameLayoutProps } from '@/types';
import type { GameWithTeams } from '@/types/propTypes';
// import type { PageProps } from '@/types';

const GameLayout = ({ children }: GameLayoutProps) => {
    const { games } = usePage().props;

    return (
        <>
            <GameHeading games={games as GameWithTeams[]} />
            {children}
            <Footer />
        </>
    );
};

export default GameLayout;
