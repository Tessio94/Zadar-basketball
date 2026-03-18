import { Head } from '@inertiajs/react';
import Info from '@/components/myComponents/stranice/naslovnica/info';
import Intro from '@/components/myComponents/stranice/naslovnica/intro';
import Landing from '@/components/myComponents/stranice/naslovnica/landing';

export default function Welcome() {
    return (
        <>
            <Head title="Naslovnica"></Head>
            <Landing />
            <Intro />
            <Info />
        </>
    );
}
