export default function AdminMainContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full flex-col gap-4 overflow-x-auto rounded-xl p-4">
            {children}
        </div>
    );
}
