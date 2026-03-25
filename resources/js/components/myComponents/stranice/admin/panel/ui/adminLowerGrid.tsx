import React from 'react';

export default function AdminLowerGrid({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen flex-1 gap-4 xl:min-h-min xl:grid-cols-2">
            {children}
        </div>
    );
}
