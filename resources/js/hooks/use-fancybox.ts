import { Fancybox, type FancyboxOptions } from '@fancyapps/ui/dist/fancybox/';
import { useEffect, useState } from 'react';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

const DEFAULT_OPTIONS: Partial<FancyboxOptions> = {};

// Keep provided options stable (module constant or useMemo) to avoid rebinding.
export default function useFancybox(options: Partial<FancyboxOptions> = DEFAULT_OPTIONS) {
    const [root, setRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!root) return;

        Fancybox.bind(root, '[data-fancybox]', options);

        return () => {
            Fancybox.unbind(root);
        };
    }, [root, options]);

    return [setRoot] as const;
}
