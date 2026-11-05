export type StaffRole = 'admin' | 'editor';

export type StaffPermissions = {
    manageLeague: boolean;
    manageContent: boolean;
    deleteContent: boolean;
};

export type User = {
    id: number;
    role: StaffRole | null;
    is_active: boolean;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
    permissions: StaffPermissions;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
