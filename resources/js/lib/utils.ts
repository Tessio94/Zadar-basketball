import type { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function formatRelativeTime(date: string | Date): string {
    const publishedAt = new Date(date);
    const now = new Date();

    const diffInSeconds = (publishedAt.getTime() - now.getTime()) / 1000;

    const formatter = new Intl.RelativeTimeFormat('hr', {
        numeric: 'auto',
    });

    const units = [
        { unit: 'year' as const, seconds: 60 * 60 * 24 * 365 },
        { unit: 'month' as const, seconds: 60 * 60 * 24 * 30 },
        { unit: 'week' as const, seconds: 60 * 60 * 24 * 7 },
        { unit: 'day' as const, seconds: 60 * 60 * 24 },
        { unit: 'hour' as const, seconds: 60 * 60 },
        { unit: 'minute' as const, seconds: 60 },
        { unit: 'second' as const, seconds: 1 },
    ];

    for (const { unit, seconds } of units) {
        if (Math.abs(diffInSeconds) >= seconds) {
            return formatter.format(Math.round(diffInSeconds / seconds), unit);
        }
    }

    return formatter.format(0, 'second');
}
