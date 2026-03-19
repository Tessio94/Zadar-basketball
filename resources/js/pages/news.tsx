import { Head } from '@inertiajs/react';
import AdditionalNews from '@/components/myComponents/stranice/novosti/additionalNews';
import MainNews from '@/components/myComponents/stranice/novosti/mainNews';

export default function Novosti() {
    return (
        <>
            <Head>
                <title>Novosti | Likar Krombacker</title>
                <meta name="description" content="Your page description" />
            </Head>
            <MainNews />
            <AdditionalNews />
        </>
    );
}
