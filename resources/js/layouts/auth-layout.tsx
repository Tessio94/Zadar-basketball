import { Head } from '@inertiajs/react';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <Head>
                <meta
                    head-key="robots"
                    name="robots"
                    content="noindex, follow"
                />
            </Head>
            {children}
        </AuthLayoutTemplate>
    );
}
