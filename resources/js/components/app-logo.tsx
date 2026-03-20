export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                <img
                    src="/images/design/logo.png"
                    alt="Likar Krombacher logo"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-lg">
                <span className="mb-0.5 truncate font-heading leading-tight font-semibold text-black dark:text-slate-100">
                    Likar Krombacher
                </span>
            </div>
        </>
    );
}
