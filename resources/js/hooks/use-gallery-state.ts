import type { EmblaCarouselType } from 'embla-carousel';
import { useMemo, useSyncExternalStore } from 'react';

type GalleryState = {
    selectedIndex: number;
    canGoBack: boolean;
    canGoForward: boolean;
};

const INITIAL_STATE: GalleryState = {
    selectedIndex: 0,
    canGoBack: false,
    canGoForward: false,
};

const getServerSnapshot = () => INITIAL_STATE;

// Cache snapshots: React must receive the same object until values change.
function createGalleryStore(api: EmblaCarouselType | undefined) {
    let snapshot = INITIAL_STATE;

    return {
        subscribe(notify: () => void) {
            if (!api) return () => {};
            api.on('select', notify).on('reInit', notify);
            return () => {
                api.off('select', notify).off('reInit', notify);
            };
        },
        getSnapshot(): GalleryState {
            if (!api) return INITIAL_STATE;
            const selectedIndex = api.selectedScrollSnap();
            const canGoBack = api.canScrollPrev();
            const canGoForward = api.canScrollNext();

            if (
                snapshot.selectedIndex !== selectedIndex ||
                snapshot.canGoBack !== canGoBack ||
                snapshot.canGoForward !== canGoForward
            ) {
                snapshot = { selectedIndex, canGoBack, canGoForward };
            }
            return snapshot;
        },
    };
}

export default function useGalleryState(api: EmblaCarouselType | undefined) {
    const store = useMemo(() => createGalleryStore(api), [api]);
    return useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot);
}
