import ArticleCard from './articleCard';

export default function SideArticleCard() {
    const length = 5;
    const value = 0;

    return (
        <aside className="sticky top-20 shrink-0 self-start bg-likar2 max-md:w-full 2xl:basis-[30%]">
            <div className="border-y-2 border-likar1">
                <div className="p-3">
                    <div className="border-b border-slate-100/60 py-3">
                        <h3 className="font-heading text-xl font-semibold text-slate-200 uppercase">
                            Zadnje novosti
                        </h3>
                    </div>
                    <div className="flex w-full flex-row py-3 max-md:flex-wrap max-md:justify-between md:flex-col">
                        {Array.from({ length }, () => value).map(
                            (_, i: number) => (
                                <ArticleCard key={i} />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}
