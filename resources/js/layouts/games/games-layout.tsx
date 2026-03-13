import { usePage } from '@inertiajs/react';
import Footer from '@/components/myComponents/home/footer';
import GameHeading from '@/components/myComponents/utakmice/headerCarousel/gameHeading';
import type { GamesLayoutProps } from '@/types';
import type { GamesWithTeams } from '@/types/propTypes';
// import type { PageProps } from '@/types';

const GamesLayout = ({ children }: GamesLayoutProps) => {
    const { games } = usePage().props;

    return (
        <>
            <GameHeading games={games as GamesWithTeams} />
            {children}
            <Footer />
        </>
    );
};

export default GamesLayout;
