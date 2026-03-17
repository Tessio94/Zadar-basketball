import Footer from '@/components/myComponents/stranice/naslovnica/footer';
import Header from '@/components/myComponents/stranice/naslovnica/header';
import type { LandingLayoutProps } from '@/types';

const LandingLayout = ({ children }: LandingLayoutProps) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default LandingLayout;
