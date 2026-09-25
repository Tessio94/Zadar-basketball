import { cn } from '@/lib/utils';
import TabButton from './tabButton';

export default function TabComponent({
    active,
    setActive,
    tabs,
    className,
}: {
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
    tabs: {
        id: string;
        title: string;
    }[];
    className?: string;
}) {
    return (
        <div className="px-[5%]">
            <div
                className={cn(
                    'mb-15 flex flex-col justify-center overflow-hidden md:flex-row',
                    className,
                )}
                role="tablist"
            >
                {tabs.map((tab) => {
                    return (
                        <TabButton
                            key={tab.id}
                            active={active}
                            setActive={setActive}
                            title={tab.title}
                            tabId={tab.id}
                            lastTab={tabs.length}
                        />
                    );
                })}
            </div>
        </div>
    );
}
