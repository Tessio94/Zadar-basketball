export default function PlayoffBracketCard() {
    return (
        <div className="flex flex-col rounded-2xl p-2.5 odd:pb-1.25 even:pt-1.25">
            <div className="rounded-t-xl rounded-b-xl bg-linear-to-r from-likar2 to-likar1">
                <div className="group relative border-b border-likar3 bg-likar2 px-5 py-5 text-base font-semibold text-slate-100 first:rounded-t-xl first:border-t last:rounded-b-xl lg:border-likar1 lg:py-1.5">
                    <div className="flex w-full flex-row items-center justify-between gap-2">
                        <div className="flex flex-row items-center gap-2 max-sm:gap-1.5">
                            <img
                                src={'images/teams/sfinga.jpg'}
                                alt=""
                                className="h-10 w-10 rounded-full max-sm:h-9 max-sm:w-9"
                            />
                            <span className="hidden text-start font-heading text-xl 2xl:inline">
                                KK Sfinga Staffordi
                            </span>
                            <span className="inline text-start font-heading 2xl:hidden">
                                KK SFI
                            </span>
                        </div>
                        <div className="font-heading text-2xl text-slate-100">
                            1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
