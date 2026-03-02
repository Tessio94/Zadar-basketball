import LandingLayout from '@/layouts/landing/landing-layout';

export default function Teams({ teams }) {
    console.log('teams', teams);
    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
                <div className="mx-auto grid w-full items-stretch gap-10 rounded-2xl bg-likar1/30 p-2 sm:grid-cols-2 xl:grid-cols-3"></div>
            </section>
        </LandingLayout>
    );
}
