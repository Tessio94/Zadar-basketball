import { Head } from '@inertiajs/react';
import Info from '@/components/myComponents/home/info';
import Intro from '@/components/myComponents/home/intro';
import Landing from '@/components/myComponents/home/landing';

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
