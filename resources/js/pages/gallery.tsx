import GalleryCarousel from '@/components/myComponents/stranice/galerija/galleryCarousel';
import LandingLayout from '@/layouts/landing/landing-layout';

export default function Gallery() {
    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
                <div className="mb-10 flex flex-col items-start gap-5">
                    <h1 className="font-heading text-5xl font-semibold text-slate-100">
                        Galerija
                    </h1>
                    <time
                        dateTime="2026-07-07"
                        className="text-center font-heading text-base text-slate-100"
                    >
                        7/7/2026
                    </time>
                </div>
                <GalleryCarousel />
            </section>
        </LandingLayout>
    );
}
