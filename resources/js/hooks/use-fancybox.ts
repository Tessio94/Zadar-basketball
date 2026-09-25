import { Fancybox, type FancyboxOptions } from '@fancyapps/ui/dist/fancybox/';
import { useEffect, useState } from 'react';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default function useFancybox(options: Partial<FancyboxOptions> = {}) {
    const [root, setRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!root) return;

        Fancybox.bind(root, '[data-fancybox]', options);

        return () => {
            Fancybox.unbind(root, '[data-fancybox]');
        };
    }, [root, options]);

    return [setRoot] as const;
}
