import { Head } from '@inertiajs/react';
import GalleryGrid from '@/components/myComponents/stranice/galerija/galleryGrid';

export default function Galleries() {
    <Head>
        <title>Galerija | Likar Krombacker</title>
        <meta name="description" content="Your page description" />
    </Head>;
    return (
        <>
            <section className="px-[5%] py-10 xl:my-5">
                <h1 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                    Galerija
                </h1>
                <GalleryGrid />
            </section>
        </>
    );
}
