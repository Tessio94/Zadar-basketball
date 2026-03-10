import type { GamesWithTeams } from '@/types/propTypes';
import GameCard from './gameCard';

export default function LastFive({ games }: { games: GamesWithTeams }) {
    const numberOfGames = games.length;

    return (
        <div className="flex shrink-0 flex-col rounded-2xl bg-likar1/30 p-5 max-xl:w-full">
            <h4 className="mb-5 font-heading text-xl text-slate-100 xl:mb-2.5">
                {numberOfGames === 1 && 'Posljednja utakmica'}
                {numberOfGames === 2 && 'Posljednje dvije utakmice'}
                {numberOfGames === 3 && 'Posljednje tri utakmice'}
                {numberOfGames === 4 && 'Posljednje četiri utakmice'}
                {numberOfGames >= 5 && 'Posljednjih pet utakmica'}
            </h4>
            <div className="max-xl:flex max-xl:w-full max-xl:flex-row max-xl:flex-wrap max-xl:gap-y-5">
                {games.map((game, i) =>
                    i <= 4 ? <GameCard key={game.id} game={game} /> : null,
                )}
            </div>
        </div>
    );
}
