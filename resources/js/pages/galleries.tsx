import Pagination from '@/components/myComponents/common/pagination/Pagination';
import EmptyGallery from '@/components/myComponents/stranice/galerija/emptyGallery';
import GalleryGrid from '@/components/myComponents/stranice/galerija/galleryGrid';
import Seo from '@/components/seo';
import type { Gallery } from '@/types/galleries';
import type { Paginated } from '@/types/pagination';

export default function Galleries({
    galleries,
}: {
    galleries: Paginated<Gallery>;
}) {
    return (
        <>
            <Seo
                title="Galerija | Likar Zadar"
                description="Fotografije s utakmica i događanja LIKAR lige Zadar. Pregledajte galerije i trenutke s košarkaških terena."
                url="/galerija"
            />
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
