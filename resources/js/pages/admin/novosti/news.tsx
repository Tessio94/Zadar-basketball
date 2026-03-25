import { Head, Link } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import Pagination from '@/components/myComponents/common/pagination/Pagination';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Article, Paginated } from '@/types/propTypes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novosti',
        href: index().url,
    },
];

export default function News({ articles }: { articles: Paginated<Article> }) {
    console.log('articles', articles);
    return (
        <>
            <Head title="Admin panel | Novosti" />
            <AdminMainContent>
                <div className="flex min-h-full flex-col justify-between">
                    <div className="mb-4 flex justify-between">
                        <h1 className="text-xl font-bold">Arhiva novosti</h1>

                        <Link
                            href={'admin.articles.create().url'}
                            className="rounded-lg bg-likar2 p-2 text-center!"
                        >
                            Kreiraj članak
                        </Link>
                    </div>
                    <div className="rounded-xl border">
                        <div className="overflow-hidden rounded-xl">
                            <table className="w-full">
                                <thead>
                                    <tr className="rounded-t-xl bg-likar1 *:border-r *:p-5 *:text-start *:last:border-0">
                                        <th className="text-center!">No.</th>
                                        <th>Naslov</th>
                                        <th
                                            colSpan={2}
                                            className="text-center!"
                                        >
                                            Akcije
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {articles.data.map((article) => (
                                        <tr
                                            key={article.id}
                                            className="*:border-r *:p-5 *:text-start *:last:border-0 even:bg-slate-200/60"
                                        >
                                            <td className="text-center!">
                                                {article.id}
                                            </td>
                                            <td>{article.title}</td>
                                            <td className="text-center!">
                                                <Link
                                                    href={
                                                        'admin.articles.edit(article.id).url'
                                                    }
                                                    className="rounded-lg bg-likar2 p-1.5 text-center!"
                                                >
                                                    Uredi
                                                </Link>
                                            </td>
                                            <td className="text-center!">
                                                <Link
                                                    href={
                                                        'admin.articles.delete(article.id).url'
                                                    }
                                                    className="rounded-lg bg-likar3/70 p-1.5 text-center!"
                                                >
                                                    Izbriši
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <Pagination links={articles.links} type="admin" />
                    </div>
                </div>
            </AdminMainContent>
        </>
    );
}

News.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
