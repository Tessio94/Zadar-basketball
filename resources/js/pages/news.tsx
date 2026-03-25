import { Head } from '@inertiajs/react';
import AdditionalNews from '@/components/myComponents/stranice/novosti/additionalNews';
import MainNews from '@/components/myComponents/stranice/novosti/glavneVijesti/mainNews';
import type { Article } from '@/types/propTypes';

export default function Novosti({
    mainArticles,
    additionalArticles,
}: {
    mainArticles: Article[];
    additionalArticles: Article[];
}) {
    return (
        <>
            <Head>
                <title>Novosti | Likar Krombacker</title>
                <meta name="description" content="Your page description" />
            </Head>

            <MainNews articles={mainArticles} />

            <AdditionalNews articles={additionalArticles} />
        </>
    );
}
