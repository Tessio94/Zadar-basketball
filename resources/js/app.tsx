import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { initializeTheme } from './hooks/use-appearance';
import LandingLayout from './layouts/landing/landing-layout';

const appName = 'Likar Krombacher | Zadar';

createInertiaApp({
    title: (title) => (title ? title : appName),
    resolve: async (name) => {
        const page = (await resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        )) as {
            default: {
                layout?: (page: React.ReactNode) => React.ReactNode;
            };
        };

        page.default.layout =
            page.default.layout ||
            ((page) => <LandingLayout children={page} />);
        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#ff6e00',
    },
});

// This will set light / dark mode on load...
initializeTheme();
