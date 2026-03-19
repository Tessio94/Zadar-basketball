import { Head } from '@inertiajs/react';
import ArchiveNews from '@/components/myComponents/stranice/arhiva/archiveNews';

export default function Archive() {
    return (
        <>
            <Head>
                <title>Arhiva | Likar Krombacker</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="my-20 px-[5%]">
                <h2 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                    Arhiva vijesti
                </h2>
                <ArchiveNews />
            </section>
        </>
    );
}
