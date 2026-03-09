export default function GameTitle() {
    return (
        <div className="flex flex-row items-center justify-start gap-6 bg-linear-to-r from-transparent to-likar1 px-[5%] py-3">
            <img
                src="/logo.png"
                alt="Likar Krombacher logo"
                className="h-8 w-8"
            />
            <h3 className="font-heading text-2xl font-semibold text-slate-100">
                Likar Krombacher
            </h3>
        </div>
    );
}
