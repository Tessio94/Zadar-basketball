import { cn } from '@/lib/utils';

export default function GameDetailButtons({ active }) {
    return (
        <div className="px-[5%]">
            <div className="my-15 flex flex-col justify-center overflow-hidden rounded-t-xl rounded-b-xl md:flex-row">
                <div
                    className={cn(
                        'text-heading z-20 border border-likar3 px-10 py-2 font-semibold text-slate-100 uppercase md:-mr-8.5 md:rounded-l-full',
                        active === 'tab1'
                            ? 'z-50 bg-likar3 text-xl md:rounded-full lg:text-2xl'
                            : 'z-20 bg-[#a14614] text-base lg:text-xl',
                    )}
                >
                    Statistika utakmice
                </div>
                <div
                    className={cn(
                        'text-heading border border-likar3 px-10 py-2 font-semibold text-slate-100 uppercase',
                        active === 'tab2'
                            ? 'z-50 bg-likar3 text-xl md:rounded-full lg:text-2xl'
                            : active === 'tab1'
                              ? 'z-30 bg-[#a14614] text-base md:rounded-l-none md:rounded-r-full lg:text-xl'
                              : 'z-30 bg-[#a14614] text-base md:rounded-l-full lg:text-xl',
                    )}
                >
                    Najbolji pojedinci
                </div>
                <div
                    className={cn(
                        'text-heading z-10 border border-likar3 px-10 py-2 text-base font-semibold text-slate-100 uppercase md:-ml-8.5 md:rounded-full lg:text-2xl',
                        active === 'tab3'
                            ? 'z-50 bg-likar3 text-xl md:rounded-l-full lg:text-2xl'
                            : 'z-20 bg-[#a14614] text-base md:rounded-l-none lg:text-xl',
                    )}
                >
                    Play by Play
                </div>
            </div>
        </div>
    );
}
