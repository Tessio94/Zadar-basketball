import React from 'react';
import { cn } from '@/lib/utils';
import GoldMedalIcon from '../../ui/icons/goldMedalIcon';
import MvpIcon from '../../ui/icons/mvpIcon';
import SilverMedalIcon from '../../ui/icons/silverMedalIcon';

const seasons = [
    {
        season: '2020./21.',
        champion: 'Veterani KK Puntamika',
        runnerUp: 'KK Vrsi',
        mvp: 'Ivan Bulić* / Ivan Kaštropil**',
    },
    {
        season: '2021./22.',
        champion: 'KK Vrsi',
        runnerUp: 'Veterani KK Puntamika',
        mvp: 'Marko Popović* / Domagoj Vidaković**',
    },
    {
        season: '2022./23.',
        champion: 'KK Vrsi',
        runnerUp: 'KK Voštarnica',
        mvp: 'Mario Pešut',
    },
    {
        season: '2023./24.',
        champion: 'KK Vrsi',
        runnerUp: 'Veterani KK Puntamika',
        mvp: 'Ivan Kaštropil',
    },
    {
        season: '2024./25.',
        champion: 'KK Voštarnica',
        runnerUp: 'KK Sabunjar Privlaka',
        mvp: 'Ive Begonja',
    },
    {
        season: '2025./26.',
        champion: 'KK Sfinga Staffords',
        runnerUp: 'Veterani KK Voštarnica',
        mvp: 'Toni Kolanović',
    },
];

export default function ChampionHistory() {
    return (
        <>
            <div className="block overflow-hidden rounded-xl max-sm:hidden">
                <table className="w-full">
                    <thead>
                        <tr className="rounded-t-xl bg-linear-to-r from-likar3 via-likar1 to-likar3 font-heading text-slate-100 *:p-3 *:text-start *:last:border-0 max-[500px]:*:p-2">
                            <th className="text-center! text-xl">Sezona</th>
                            <th className="text-center!">
                                <div className="flex items-center justify-center gap-2 text-xl">
                                    Prvak
                                    <GoldMedalIcon
                                        width={30}
                                        height={30}
                                        fill="#FFD700"
                                    />
                                </div>
                            </th>
                            <th className="text-center!">
                                <div className="flex items-center justify-center gap-2 text-xl">
                                    Doprvak
                                    <SilverMedalIcon
                                        width={30}
                                        height={30}
                                        fill="#C0C0C0"
                                    />
                                </div>
                            </th>
                            <th className="text-center!">
                                <div className="flex items-center justify-center gap-2 text-xl">
                                    MVP
                                    <MvpIcon
                                        width={30}
                                        height={30}
                                        fill="#FFD700"
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {seasons.map((season, i) => (
                            <tr
                                key={i}
                                className={cn(
                                    'font-heading text-slate-100 *:border-b *:p-3.5 *:text-start *:last:border-r-0 max-[500px]:*:px-2 max-[500px]:*:py-3',
                                    i === seasons.length - 1 && '*:border-b-0',
                                )}
                            >
                                <td className="text-center">{season.season}</td>
                                <td className="text-center!">
                                    {season.champion}
                                </td>
                                <td className="text-center!">
                                    {season.runnerUp}
                                </td>
                                <td className="text-center!">{season.mvp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <table className="table w-full text-slate-100 sm:hidden">
                <tbody>
                    {seasons.map((season, i) => (
                        <React.Fragment key={i}>
                            <tr className="bg-linear-to-r from-likar3 via-likar1 to-likar3">
                                <th
                                    className={cn(
                                        'w-1/3 border-r p-3 text-center',
                                        i === 0 && 'rounded-tl-xl',
                                    )}
                                >
                                    Sezona
                                </th>
                                <th
                                    className={cn(
                                        'p-3 text-center',
                                        i === 0 && 'rounded-tr-xl',
                                    )}
                                >
                                    {season.season}
                                </th>
                            </tr>

                            <tr>
                                <th className="w-1/3 border-r border-b p-3 text-center">
                                    Prvak
                                </th>
                                <td className="border-b p-3 text-center">
                                    {season.champion}
                                </td>
                            </tr>

                            <tr>
                                <th className="w-1/3 border-r border-b p-3 text-center">
                                    Doprvak
                                </th>
                                <td className="border-b p-3 text-center">
                                    {season.runnerUp}
                                </td>
                            </tr>

                            <tr>
                                <th
                                    className={cn(
                                        'w-1/3 border-r p-3 text-center',
                                        i === seasons.length - 1 && 'border-b',
                                    )}
                                >
                                    MVP
                                </th>
                                <td
                                    className={cn(
                                        'p-3 text-center',
                                        i === seasons.length - 1 && 'border-b',
                                    )}
                                >
                                    {season.mvp}
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
}
