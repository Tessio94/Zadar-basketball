import { usePage } from '@inertiajs/react';
import Footer from '@/components/myComponents/home/footer';
import GameHeading from '@/components/myComponents/utakmice/headerCarousel/gameHeading';
import type { GamesLayoutProps } from '@/types';
// import type { PageProps } from '@/types';

const GamesLayout = ({ children }: GamesLayoutProps) => {
    // const { games } = usePage<PageProps>().props;
    const { games } = usePage().props;

    return (
        <>
            <GameHeading games={games} />
            {children}
            <Footer />
        </>
    );
};

export default GamesLayout;
