import Footer from '@/components/myComponents/home/footer';
import Header from '@/components/myComponents/home/header';
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
