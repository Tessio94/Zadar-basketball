import { Head } from '@inertiajs/react';

import { index } from '@/actions/App/Http/Controllers/Admin/GalleryController';
import GalleryForm from '@/components/myComponents/stranice/admin/galerije/galleryForm';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Galerije',
        href: index().url,
    },
    {
        title: 'Kreiraj galeriju',
        href: '',
    },
];

export default function CreateGallery() {
    return (
        <>
            <Head title="Admin panel | Galerija" />

            <section className="px-[5%] py-10">
                <h1 className="mb-8 font-heading text-4xl font-semibold">
                    Nova galerija
                </h1>

                <GalleryForm />
            </section>
        </>
    );
}

CreateGallery.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
