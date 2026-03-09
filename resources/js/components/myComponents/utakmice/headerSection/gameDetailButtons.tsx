import { cn } from '@/lib/utils';

export default function GameDetailButtons({ active, setActive }) {
    return (
        <div className="px-[5%]">
            <div
                className="my-15 flex flex-col justify-center overflow-hidden md:flex-row"
                role="tablist"
            >
                <button
                    role="tab"
                    aria-selected={active === 'tab1'}
                    aria-controls="panel-tab1"
                    type="button"
                    onClick={() => setActive('tab1')}
                    className={cn(
                        'text-heading max-md: z-20 cursor-pointer rounded-t-xl border border-likar3 px-10 py-2 font-semibold text-slate-100 uppercase md:-mr-8.5 md:rounded-l-full',
                        active === 'tab1'
                            ? 'z-50 bg-likar3 text-xl md:rounded-full lg:text-2xl'
                            : 'z-20 bg-[#a14614] text-base lg:text-xl',
                    )}
                >
                    Statistika utakmice
                </button>
                <button
                    role="tab"
                    aria-selected={active === 'tab2'}
                    aria-controls="panel-tab2"
                    type="button"
                    onClick={() => setActive('tab2')}
                    className={cn(
                        'text-heading cursor-pointer border border-likar3 px-10 py-2 font-semibold text-slate-100 uppercase',
                        active === 'tab2'
                            ? 'z-50 bg-likar3 text-xl md:rounded-full lg:text-2xl'
                            : active === 'tab1'
                              ? 'z-30 bg-[#a14614] text-base md:rounded-l-none md:rounded-r-full lg:text-xl'
                              : 'z-30 bg-[#a14614] text-base md:rounded-l-full lg:text-xl',
                    )}
                >
                    Najbolji pojedinci
                </button>
                <button
                    role="tab"
                    aria-selected={active === 'tab3'}
                    aria-controls="panel-tab3"
                    type="button"
                    onClick={() => setActive('tab3')}
                    className={cn(
                        'text-heading z-10 cursor-pointer border border-likar3 px-10 py-2 text-base font-semibold text-slate-100 uppercase max-md:rounded-b-xl md:-ml-8.5 md:rounded-full lg:text-2xl',
                        active === 'tab3'
                            ? 'z-50 bg-likar3 text-xl md:rounded-l-full lg:text-2xl'
                            : 'z-20 bg-[#a14614] text-base md:rounded-l-none lg:text-xl',
                    )}
                >
                    Play by Play
                </button>
            </div>
        </div>
    );
}
