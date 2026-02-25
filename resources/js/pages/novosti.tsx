import AdditionalNews from '@/components/myComponents/novosti/additionalNews';
import MainNews from '@/components/myComponents/novosti/mainNews';
import LandingLayout from '@/layouts/landing/landing-layout';

export default function Novosti() {
    return (
        <LandingLayout>
            <MainNews />
            <AdditionalNews />
        </LandingLayout>
    );
}
