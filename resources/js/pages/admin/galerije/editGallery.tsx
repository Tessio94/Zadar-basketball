import { Head } from '@inertiajs/react';

import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/GalleryController';
import GalleryForm from '@/components/myComponents/stranice/admin/galerije/galleryForm';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Gallery } from '@/types/propTypes';

interface Props {
    gallery: Gallery;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Galerije',
        href: index().url,
    },
    {
        title: 'Uredi galeriju',
        href: '',
    },
];

export default function EditGallery({ gallery }: Props) {
    return (
        <>
            <Head>
                <title>{gallery.title} | Admin</title>
            </Head>

            <section className="px-[5%] py-10">
                <h1 className="mb-8 font-heading text-4xl font-semibold">
                    Uredi galeriju
                </h1>

                <GalleryForm gallery={gallery} />
            </section>
        </>
    );
}

EditGallery.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
