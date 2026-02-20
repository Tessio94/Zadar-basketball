import Footer from '@/components/myComponents/footer';
import Header from '@/components/myComponents/header';
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
