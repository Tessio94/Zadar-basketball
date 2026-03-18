import GalleryGrid from '@/components/myComponents/stranice/galerija/galleryGrid';

export default function Galleries() {
    return (
        <>
            <section className="my-20 px-[5%]">
                <h1 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                    Galerija
                </h1>
                <GalleryGrid />
            </section>
        </>
    );
}
