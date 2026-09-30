import { useSortable } from '@dnd-kit/react/sortable';

export function SortableImageCard({
    id,
    index,
    children,
}: {
    id: number;
    index: number;
    children: React.ReactNode;
}) {
    const { ref, isDragging } = useSortable({
        id: String(id),
        index,
    });

    return (
        <div
            ref={ref}
            className={`overflow-hidden rounded-lg border bg-white ${
                isDragging ? 'opacity-50' : ''
            }`}
        >
            {children}
        </div>
    );
}
