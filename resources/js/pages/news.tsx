import AdditionalNews from '@/components/myComponents/stranice/novosti/additionalNews';
import MainNews from '@/components/myComponents/stranice/novosti/mainNews';
import LandingLayout from '@/layouts/landing/landing-layout';

export default function Novosti() {
    return (
        <LandingLayout>
            <MainNews />
            <AdditionalNews />
        </LandingLayout>
    );
}
