import type { PlayersWithPivot } from '@/types/propTypes';
import RosterRowData from './rosterRowData';
import RosterRowHeader from './rosterRowHeader';

export default function TeamPlayers({
    players,
}: {
    players: PlayersWithPivot;
}) {
    // console.log('players', players);
    return (
        <div className="p-5">
            <table className="w-full overflow-hidden rounded-2xl">
                <RosterRowHeader />
                <tbody>
                    {players.map((player) => {
                        const {
                            id,
                            first_name,
                            last_name,
                            date_of_birth,
                            height,
                            position,
                            pivot: { jersey_number },
                        } = player;

                        const name = `${first_name} ${last_name}`;

                        const datumRodenja = new Date(date_of_birth);
                        const today = new Date();

                        let age =
                            today.getFullYear() - datumRodenja.getFullYear();

                        const monthDiff =
                            today.getMonth() - datumRodenja.getMonth();

                        if (
                            monthDiff < 0 ||
                            (monthDiff === 0 &&
                                today.getDate() < datumRodenja.getDate())
                        ) {
                            age--;
                        }

                        return (
                            <RosterRowData
                                key={id}
                                id={id}
                                name={name}
                                date_of_birth={date_of_birth}
                                age={age}
                                height={height}
                                position={position}
                                broj={jersey_number}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
