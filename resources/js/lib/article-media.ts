/** Accept public storage paths and existing HTTP(S)/root-relative image URLs. */
export function publicImageUrl(
    path: string | null | undefined,
): string | undefined {
    if (!path) return undefined;
    if (/^https?:\/\//i.test(path) || /^\/(?!\/)/.test(path)) return path;
    if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//'))
        return undefined;
    return `/storage/${path.replace(/^\/+/, '')}`;
}

/** Fancybox treats captions as HTML; gallery captions and alt text are plain text. */
export function lightboxCaption(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
