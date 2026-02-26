import ArchiveNews from '@/components/myComponents/archive/archiveNews';
import LandingLayout from '@/layouts/landing/landing-layout';

export default function Archive() {
    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
                <ArchiveNews />
            </section>
        </LandingLayout>
    );
}
