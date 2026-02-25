import TableResults from '@/components/myComponents/tablica/tableResults';
import TableStandings from '@/components/myComponents/tablica/tableStandings';
import LandingLayout from '@/layouts/landing/landing-layout';

export default function Table() {
    return (
        <LandingLayout>
            <section id="tablica" className="my-20 px-[5%]">
                <h1 className="mb-10 font-heading text-4xl font-semibold text-slate-100">
                    Tablica
                </h1>
                <TableStandings />
                <h1 className="mb-10 font-heading text-4xl font-semibold text-slate-100">
                    Raspored natjecanja
                </h1>
                <TableResults />
            </section>
        </LandingLayout>
    );
}
