export default function GameHeaderCard({ game }) {
    const { home_team, away_team, home_score, away_score } = game;

    return (
        <div className="embla__slide relative px-2.5 first:pl-0 last:pr-0">
            {/* <div className="bg-theme4/85 absolute inset-0 rounded-2xl"></div> */}
            <div className="relative rounded-xl border border-likar3/40 bg-likar4/90 p-2.5">
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col items-start justify-between">
                        <p className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                            <img
                                src={home_team.logo}
                                alt={`${home_team.name} logo`}
                                className="h-6 w-6 rounded-full bg-white"
                            />
                            <span>{home_team.name}</span>
                        </p>
                        <hr className="w-full border border-likar1" />
                        <p className="flex flex-row flex-nowrap items-center justify-between justify-center gap-4 text-nowrap">
                            <img
                                src={away_team.logo}
                                alt={`${away_team.name} logo`}
                                className="h-6 w-6 rounded-full bg-white"
                            />
                            <span>{away_team.name}</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-nowrap">{home_score}</p>
                        <span>Final</span>
                        <p className="text-nowrap">{away_score}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
