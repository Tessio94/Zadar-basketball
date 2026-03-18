import { useRef } from 'react';
import ButtonScroll from '@/components/myComponents/common/ButtonScroll';
import type { PlayerWithPivot } from '@/types/propTypes';
import RosterRowData from './rosterRowData';
import RosterRowHeader from './rosterRowHeader';

export default function TeamPlayers({
    players,
}: {
    players: PlayerWithPivot[];
}) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="p-5">
            <div className="relative">
                <ButtonScroll scrollRef={scrollRef} />
                <div
                    className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-10 scrollbar-thin overflow-x-auto rounded-xl border border-likar1 shadow-xl shadow-likar1 scrollbar-thumb-likar3 scrollbar-track-likar3"
                    ref={scrollRef}
                >
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
            </div>
        </div>
    );
}
