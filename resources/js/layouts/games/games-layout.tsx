import { usePage } from '@inertiajs/react';
import Footer from '@/components/myComponents/stranice/naslovnica/footer';
import GameHeading from '@/components/myComponents/stranice/utakmice/headerCarousel/gameHeading';
import type { GamesLayoutProps } from '@/types';
import type { GameWithTeams } from '@/types/propTypes';
// import type { PageProps } from '@/types';

const GamesLayout = ({ children }: GamesLayoutProps) => {
    const { games } = usePage().props;

    return (
        <>
            <GameHeading games={games as GameWithTeams[]} />
            {children}
            <Footer />
        </>
    );
};

export default GamesLayout;
