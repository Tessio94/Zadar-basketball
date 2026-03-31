import { Head, useForm } from '@inertiajs/react';
import { ImageIcon } from 'lucide-react';
import { useRef } from 'react';
import {
    index,
    create,
} from '@/actions/App/Http/Controllers/Admin/ArticleController';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import RichTextEditor from './richTextEditor';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novosti',
        href: index().url,
    },
    {
        title: 'Kreiraj članak',
        href: '',
    },
];

const APP_URL = import.meta.env.VITE_APP_URL;

export default function CreateArticle() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        published_at: '',
        excerpt: '',
        content: '',
        slug: '',
        status: '',
        main_image: '',
    });

    function submit(e: React.SubmitEvent) {
        e.preventDefault();
        post(create().url);
    }
    return (
        <>
            <Head title="Admin panel | Novosti" />
            <AdminMainContent>
                <form
                    onSubmit={submit}
                    className="flex w-full flex-col flex-wrap space-y-6 xl:flex-row"
                >
                    <div className="space-y-6 xl:w-1/2 xl:pr-5 2xl:pr-10">
                        <div>
                            <label
                                htmlFor="naslov"
                                className="mb-1 block font-semibold"
                            >
                                Naslov
                            </label>
                            <input
                                id="naslov"
                                name="naslov"
                                type="text"
                                value={data.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    setData('title', title);
                                    setData('slug', slugify(title));
                                }}
                                className="w-full rounded border p-2"
                            />
                            {errors.title && (
                                <div className="text-sm text-red-500">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="datum"
                                className="mb-1 block font-semibold"
                            >
                                Datum objave
                            </label>
                            <input
                                id="datum"
                                name="datum"
                                type="date"
                                value={data.published_at}
                                onChange={(e) =>
                                    setData('published_at', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="uvod"
                                className="mb-1 block font-semibold"
                            >
                                Uvod
                            </label>
                            <textarea
                                id="uvod"
                                name="uvod"
                                value={data.excerpt}
                                onChange={(e) =>
                                    setData('excerpt', e.target.value)
                                }
                                className="h-25 w-full rounded border p-2"
                            />
                            {errors.excerpt && (
                                <div className="text-sm text-red-500">
                                    {errors.excerpt}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="slika"
                                className="mb-1 block font-semibold"
                            >
                                Glavna slika
                            </label>
                            <input
                                id="slika"
                                name="slika"
                                type="file"
                                accept=".png,.jpg,.gif,.webp,image/jpeg,image/gif,image/webp,image/png"
                                onChange={(e) => {
                                    setData(
                                        'main_image',
                                        e.target.files
                                            ? e.target.files[0].name
                                            : '',
                                    );
                                }}
                                ref={fileInputRef}
                                className="sr-only"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex w-fit cursor-pointer flex-row items-center gap-2 rounded bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-likar4"
                            >
                                Odaberi sliku <ImageIcon strokeWidth="1.5" />
                            </button>
                            {errors.main_image && (
                                <div className="text-sm text-red-500">
                                    {errors.main_image}
                                </div>
                            )}
                        </div>

                        {data.main_image && (
                            <div>
                                <img
                                    src={`${APP_URL}/images/articles/${data.main_image}`}
                                    className="h-auto w-full rounded"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 max-xl:min-h-125 xl:w-1/2 xl:pl-5 2xl:pl-10">
                        <label
                            htmlFor="sadrzaj"
                            className="block font-semibold"
                        >
                            Sadržaj
                        </label>
                        <RichTextEditor
                            value={data.content}
                            onChange={(value: string) =>
                                setData('content', value)
                            }
                        />
                    </div>

                    <div className="space-y-6 xl:w-1/2 xl:pt-6 xl:pr-5 2xl:pr-10">
                        <div>
                            <label
                                htmlFor="status"
                                className="mb-1 block font-semibold"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className="w-full rounded border p-2 *:px-2 *:py-1 [&::picker(select)]:rounded [&::picker(select)]:border-slate-300 [&::picker(select)]:bg-slate-100 [&::picker-icon]:transition-transform [&::picker-icon]:duration-300 [&:open::picker-icon]:rotate-180"
                            >
                                <option value="published">Publish</option>
                                <option
                                    value="draft"
                                    className="border-t border-slate-300"
                                >
                                    Draft
                                </option>
                            </select>
                            {errors.slug && (
                                <div className="text-sm text-red-500">
                                    {errors.slug}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="slug"
                                className="mb-1 block font-semibold"
                            >
                                Slug
                            </label>
                            <input
                                id="slug"
                                name="slug"
                                type="text"
                                value={data.slug}
                                className="w-full rounded border p-2 disabled:bg-slate-300/40 disabled:text-slate-700"
                                disabled
                            />
                            {errors.slug && (
                                <div className="text-sm text-red-500">
                                    {errors.slug}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="cursor-pointer rounded border border-transparent bg-likar3 px-6 py-2 font-semibold text-white transition-all duration-300 hover:border-likar3 hover:bg-likar1/40 hover:text-likar3"
                            >
                                Spremi
                            </button>
                        </div>
                    </div>
                </form>
            </AdminMainContent>
        </>
    );
}

CreateArticle.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/č/g, 'c')
        .replace(/ć/g, 'c')
        .replace(/ž/g, 'z')
        .replace(/š/g, 's')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
