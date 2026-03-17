import ArchiveNews from '@/components/myComponents/stranice/arhiva/archiveNews';
import LandingLayout from '@/layouts/landing/landing-layout';

export default function Archive() {
    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
                <h2 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                    Arhiva vijesti
                </h2>
                <ArchiveNews />
            </section>
        </LandingLayout>
    );
}
