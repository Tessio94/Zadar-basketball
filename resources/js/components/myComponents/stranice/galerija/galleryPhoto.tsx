import { ImageOff } from 'lucide-react';
import { useState } from 'react';

type GalleryPhotoProps = {
    src: string;
    fallbackSrc: string;
    alt: string;
    thumbnail?: boolean;
    priority?: boolean;
};

export default function GalleryPhoto({
    src,
    fallbackSrc,
    alt,
    thumbnail = false,
    priority = false,
}: GalleryPhotoProps) {
    const [source, setSource] = useState(src);
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);

    return (
        <>
            {!loaded && !failed && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 animate-pulse bg-white/5 motion-reduce:animate-none"
                />
            )}
            {failed ? (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 text-center text-slate-400" role="img" aria-label={`${alt} — fotografija nije dostupna`}>
                    <ImageOff className="size-5 shrink-0" aria-hidden="true" />
                    {!thumbnail && <span className="text-sm">Fotografija nije dostupna</span>}
                </span>
            ) : (
                <img
                    src={source}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority && !thumbnail ? 'high' : 'auto'}
                    decoding="async"
                    draggable={false}
                    className={thumbnail
                        ? 'absolute inset-0 block h-full w-full object-cover'
                        : 'absolute inset-0 block h-full w-full object-scale-down'}
                    onLoad={() => setLoaded(true)}
                    onError={() => {
                        if (source !== fallbackSrc) {
                            setSource(fallbackSrc);
                            setLoaded(false);
                        } else {
                            setFailed(true);
                        }
                    }}
                />
            )}
        </>
    );
}
