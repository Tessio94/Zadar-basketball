import { Head } from '@inertiajs/react';
import Info from '@/components/myComponents/home/info';
import Intro from '@/components/myComponents/home/intro';
import Landing from '@/components/myComponents/home/landing';
// import News from '@/components/myComponents/home/news';
// import Table from '@/components/myComponents/home/table';
import LandingLayout from '@/layouts/landing/landing-layout';

export default function Welcome() {
    return (
        <LandingLayout>
            <Head title="Naslovnica"></Head>
            <Landing />
            <Intro />
            <Info />
            {/* <News /> */}
            {/* <Table /> */}
        </LandingLayout>
    );
}
