import type { PlayerWithPivot } from '@/types/players';
import RosterRowData from './rosterRowData';
import RosterRowHeader from './rosterRowHeader';

export default function TeamPlayers({
    players,
    jerseyColor,
}: {
    players: PlayerWithPivot[];
    jerseyColor: string;
}) {
    return (
        <div className="p-5">
            <div className="relative mb-10 overflow-hidden rounded-xl border border-likar1 shadow-xl shadow-likar1">
                <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto rounded-xl scrollbar-thumb-likar3 scrollbar-track-slate-900">
                    <table className="w-full">
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

                                const datumRodenja = new Date(
                                    date_of_birth ?? '',
                                );
                                const today = new Date();

                                let age =
                                    today.getFullYear() -
                                    datumRodenja.getFullYear();

                                const monthDiff =
                                    today.getMonth() - datumRodenja.getMonth();

                                if (
                                    monthDiff < 0 ||
                                    (monthDiff === 0 &&
                                        today.getDate() <
                                            datumRodenja.getDate())
                                ) {
                                    age--;
                                }

                                return (
                                    <RosterRowData
                                        key={id}
                                        id={id}
                                        name={name}
                                        dateOfBirth={date_of_birth}
                                        age={age}
                                        height={height}
                                        position={position}
                                        broj={jersey_number}
                                        jerseyColor={jerseyColor}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
