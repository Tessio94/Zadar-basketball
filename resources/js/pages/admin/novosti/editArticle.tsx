import { Head, useForm } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/ArticleController';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Article } from '@/types/propTypes';
import RichTextEditor from './richTextEditor';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novosti',
        href: index().url,
    },
    {
        title: 'Uredi članak',
        href: '',
    },
];

export default function EditArticle({ article }: { article: Article }) {
    console.log(article);
    const { data, setData, put, processing, errors } = useForm({
        title: article.title || '',
        published_at: article.published_at || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        status: article.status || '',
        slug: article.slug || '',
        main_image: null as File | null,
    });

    function submit(e: React.SubmitEvent) {
        e.preventDefault();
        put(update(article.id).url);
    }
    // console.log('data', data);

    // function disableEnter(e: React.KeyboardEvent) {
    //     const target = e.target as HTMLElement;

    //     if (target.closest('.tox')) return;

    //     if (
    //         e.key === 'Enter' &&
    //         e.target instanceof HTMLInputElement &&
    //         e.target.type !== 'textarea'
    //     ) {
    //         e.preventDefault();
    //     }
    // }

    return (
        <>
            <Head title="Admin panel | Novosti" />
            <AdminMainContent>
                <form
                    onSubmit={submit}
                    // onKeyDown={disableEnter}
                    className="flex w-full flex-col flex-wrap space-y-6 xl:flex-row"
                >
                    <div className="space-y-6 xl:w-1/2 xl:pr-5 2xl:pr-10">
                        <div>
                            <label className="mb-1 block font-semibold">
                                Naslov
                            </label>
                            <input
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
                            <label className="mb-1 block font-semibold">
                                Datum objave
                            </label>
                            <input
                                type="date"
                                value={data.published_at}
                                onChange={(e) =>
                                    setData('published_at', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block font-semibold">
                                Uvod
                            </label>
                            <textarea
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
                            <label className="mb-1 block font-semibold">
                                Glavna slika
                            </label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    console.log(e);
                                    setData(
                                        'main_image',
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    );
                                }}
                                className="w-full rounded border p-2"
                            />
                            {errors.main_image && (
                                <div className="text-sm text-red-500">
                                    {errors.main_image}
                                </div>
                            )}
                        </div>

                        {article.main_image && (
                            <div>
                                <img
                                    src={article.main_image}
                                    className="mb-2 h-auto w-full rounded"
                                />
                            </div>
                        )}
                    </div>

                    {/* <div className="xl:w-1/2 xl:pl-5 2xl:pl-10">
                        <label className="mb-1 block font-semibold">Sadržaj</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="h-40 w-full rounded border p-2"
                        />
                        {errors.content && (
                            <div className="text-sm text-red-500">
                                {errors.content}
                            </div>
                        )}
                    </div> */}

                    <div className="xl:w-1/2 xl:pl-5 2xl:pl-10">
                        <RichTextEditor
                            value={data.content}
                            onChange={(value: string) =>
                                setData('content', value)
                            }
                        />
                    </div>

                    <div className="space-y-6 xl:w-1/2 xl:pr-5 2xl:pr-10">
                        <div>
                            <label className="mb-1 block font-semibold">
                                Status
                            </label>
                            <select
                                value={data.status}
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
                            <label className="mb-1 block font-semibold">
                                Slug
                            </label>
                            <input
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
                                className="rounded bg-black px-4 py-2 text-white"
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

EditArticle.layout = (page: React.ReactNode) => (
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
