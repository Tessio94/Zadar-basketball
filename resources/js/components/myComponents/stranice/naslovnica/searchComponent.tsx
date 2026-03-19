import { useRemember } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SearchComponent({ open }: { open: boolean }) {
    const [searchValue, setSeatchValue] = useRemember<string>('');

    return (
        <div
            className={cn(
                'absolute top-19 right-1/2 z-1000 flex translate-x-[calc(50%-16px)] items-center justify-center rounded-b-2xl border border-t-0 border-likar3 bg-likar1 transition-all duration-300 max-[450px]:w-60! max-[360px]:w-55! max-sm:max-w-100 sm:translate-x-[calc(50%-24px)] lg:right-8 lg:translate-x-0',
                open
                    ? 'visible max-h-100 opacity-100'
                    : 'invisible max-h-0 opacity-0',
            )}
        >
            <form
                method="get"
                className="flex flex-row items-center p-5 max-[450px]:max-w-full"
                action=""
            >
                <label className="z-20 -mr-5 max-[450px]:max-w-full">
                    <span className="sr-only">Search for:</span>

                    <input
                        id="s"
                        type="search"
                        className="rounded-xl border-none bg-slate-100 py-1 pr-2 pl-2 font-text text-slate-900 outline-none max-[450px]:w-full"
                        placeholder="Upiši pojam..."
                        value={searchValue}
                        onChange={(e) => setSeatchValue(() => e.target.value)}
                        name="s"
                        autoComplete="off"
                    />
                </label>
                <button
                    type="submit"
                    className="z-10 cursor-pointer rounded-r-xl bg-likar4 py-1 pr-2 pl-7 transition-colors duration-300 hover:bg-likar1 max-[450px]:max-w-full"
                >
                    <Search className="text-slate-100" />
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>
    );
}
