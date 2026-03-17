import { Head } from '@inertiajs/react';
import Info from '@/components/myComponents/stranice/naslovnica/info';
import Intro from '@/components/myComponents/stranice/naslovnica/intro';
import Landing from '@/components/myComponents/stranice/naslovnica/landing';

import LandingLayout from '@/layouts/landing/landing-layout';

export default function Welcome() {
    return (
        <LandingLayout>
            <Head title="Naslovnica"></Head>
            <Landing />
            <Intro />
            <Info />
        </LandingLayout>
    );
}
