import { Head } from '@inertiajs/react';

const SITE_URL = 'https://likarzadar.com';
// Already present on your live site. Replace with a dedicated share image when ready.
const DEFAULT_SHARE_IMAGE = '/images/design/landing.jpg';

type SeoProps = {
    /** Complete title, including the site name if appropriate. */
    title: string;
    description: string;
    /** Canonical path or absolute URL; preserve meaningful season/page/tag filters. */
    url: string;
    /** Public, root-relative or absolute image URL, e.g. /storage/articles/photo.jpg. */
    image?: string | null;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    type?: 'website' | 'article';
    publishedAt?: string | null;
    modifiedAt?: string | null;
    noindex?: boolean;
};

function absoluteUrl(value: string): string {
    return new URL(value, `${SITE_URL}/`).href;
}

export default function Seo({
    title,
    description,
    url,
    image,
    imageAlt = 'Likar Zadar — Liga košarkaških amatera i rekreativaca',
    imageWidth,
    imageHeight,
    type = 'website',
    publishedAt,
    modifiedAt,
    noindex = false,
}: SeoProps) {
    const canonical = absoluteUrl(url);
    const shareImage = absoluteUrl(image || DEFAULT_SHARE_IMAGE);
    const cleanDescription = description.replace(/\s+/g, ' ').trim();

    return (
        <Head>
            <title>{title}</title>
            <meta
                head-key="description"
                name="description"
                content={cleanDescription}
            />
            <link head-key="canonical" rel="canonical" href={canonical} />
            <meta
                head-key="robots"
                name="robots"
                content={
                    noindex ? 'noindex, follow' : 'max-image-preview:large'
                }
            />

            <meta head-key="og:title" property="og:title" content={title} />
            <meta
                head-key="og:description"
                property="og:description"
                content={cleanDescription}
            />
            <meta head-key="og:type" property="og:type" content={type} />
            <meta head-key="og:url" property="og:url" content={canonical} />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content="Likar Zadar"
            />
            <meta head-key="og:locale" property="og:locale" content="hr_HR" />
            <meta
                head-key="og:image"
                property="og:image"
                content={shareImage}
            />
            <meta
                head-key="og:image:alt"
                property="og:image:alt"
                content={imageAlt}
            />
            {imageWidth !== undefined && imageWidth > 0 && (
                <meta
                    head-key="og:image:width"
                    property="og:image:width"
                    content={String(imageWidth)}
                />
            )}
            {imageHeight !== undefined && imageHeight > 0 && (
                <meta
                    head-key="og:image:height"
                    property="og:image:height"
                    content={String(imageHeight)}
                />
            )}
            {type === 'article' && publishedAt && (
                <meta
                    head-key="article:published_time"
                    property="article:published_time"
                    content={publishedAt}
                />
            )}
            {type === 'article' && modifiedAt && (
                <meta
                    head-key="article:modified_time"
                    property="article:modified_time"
                    content={modifiedAt}
                />
            )}

            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={title}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={cleanDescription}
            />
            <meta
                head-key="twitter:image"
                name="twitter:image"
                content={shareImage}
            />
            <meta
                head-key="twitter:image:alt"
                name="twitter:image:alt"
                content={imageAlt}
            />
        </Head>
    );
}
