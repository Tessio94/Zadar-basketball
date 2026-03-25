import React from 'react';

export default function AdminUpperGrid({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid auto-rows-min gap-4 xl:grid-cols-2">
            {children}
        </div>
    );
}
