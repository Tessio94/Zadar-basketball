export default function LastNewsCard() {
    return (
        <div className="flex flex-row items-center gap-4 rounded-xl bg-linear-to-l from-transparent to-likar2 px-3 py-1.5">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-likar3" />
            <div className="flex flex-col gap-2">
                <h4 className="font-heading text-xl font-medium text-slate-100">
                    Dobrodošli na službenu stranicu Likar Krombacher - Lige
                    košarkaških amatera i rekreativaca
                </h4>
                <p className="text-sm font-normal text-slate-100 text-slate-300">
                    <span>Objavljeno prije:</span> 2h
                </p>
            </div>
        </div>
    );
}
