import { Head } from '@inertiajs/react';
import Pagination from '@/components/myComponents/common/pagination/Pagination';
import EmptyGallery from '@/components/myComponents/stranice/galerija/emptyGallery';
import GalleryGrid from '@/components/myComponents/stranice/galerija/galleryGrid';
import type { Gallery, Paginated } from '@/types/propTypes';

export default function Galleries({
    galleries,
}: {
    galleries: Paginated<Gallery>;
}) {
    console.log(galleries);
    return (
        <>
            <Head>
                <title>Galerija | Likar Krombacher</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="px-[5%] py-10 xl:my-5">
                <h1 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                    Galerija
                </h1>
                {galleries.data.length > 0 ? (
                    <GalleryGrid galleries={galleries} />
                ) : (
                    <EmptyGallery />
                )}
            </section>
            {galleries.data.length > 0 && (
                <section className="flex flex-row justify-center px-[5%] py-10 xl:my-5">
                    <Pagination links={galleries.links} type="front" />
                </section>
            )}
        </>
    );
}
