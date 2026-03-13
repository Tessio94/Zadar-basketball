import { cn } from '@/lib/utils';

export default function TabButton({
    active,
    setActive,
    title,
    tabId,
    lastTab,
}: {
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    tabId: string;
    lastTab: number;
}) {
    if (tabId === 'tab1') {
        return (
            <button
                role="tab"
                aria-selected={active === `tab1`}
                aria-controls="panel-tab1"
                type="button"
                onClick={() => setActive('tab1')}
                className={cn(
                    'text-heading z-20 cursor-pointer border border-likar3 px-10 py-2 font-semibold text-slate-100 uppercase max-md:rounded-t-xl md:-mr-8.5 md:rounded-l-full',
                    active === 'tab1'
                        ? 'z-50 bg-likar3 text-xl md:rounded-full lg:text-2xl'
                        : 'z-20 bg-[#a14614] text-base lg:text-xl',
                )}
            >
                {title}
            </button>
        );
    } else if (tabId === `tab${lastTab}`) {
        return (
            <button
                role="tab"
                aria-selected={active === tabId}
                aria-controls={`panel-tab${tabId}`}
                type="button"
                onClick={() => setActive(tabId)}
                className={cn(
                    'text-heading cursor-pointer border border-likar3 px-10 py-2 font-semibold text-slate-100 uppercase max-md:rounded-b-xl md:-ml-8.5 md:rounded-full lg:text-2xl',
                    active === tabId
                        ? 'z-50 bg-likar3 text-xl md:rounded-l-full lg:text-2xl'
                        : 'z-20 bg-[#a14614] text-base md:rounded-l-none lg:text-xl',
                )}
            >
                {title}
            </button>
        );
    } else {
        return (
            <button
                role="tab"
                aria-selected={active === tabId}
                aria-controls={`panel-tab${tabId}`}
                type="button"
                onClick={() => setActive(tabId)}
                className={cn(
                    'text-heading cursor-pointer border border-likar3 px-10 py-2 font-semibold text-slate-100 uppercase',
                    active === tabId
                        ? 'z-50 bg-likar3 text-xl md:rounded-full lg:text-2xl'
                        : active === 'tab1'
                          ? 'z-30 bg-[#a14614] text-base md:rounded-l-none md:rounded-r-full lg:text-xl'
                          : 'z-30 bg-[#a14614] text-base md:rounded-l-full lg:text-xl',
                )}
            >
                {title}
            </button>
        );
    }
}
