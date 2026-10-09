export default function PlayerSeasonAveragesHeader() {
    return (
        <thead>
            <tr className="border-b border-likar1 bg-slate-900 text-slate-100">
                <th className="p-1 text-center text-nowrap" colSpan={2}>
                    Season
                </th>
                <th className="p-1 text-center text-nowrap" colSpan={2}>
                    Team
                </th>
                <th className="p-1 text-center text-nowrap">GP</th>
                <th className="p-1 text-center text-nowrap">MIN</th>
                <th className="p-1 text-center text-nowrap">PTS</th>
                <th className="p-1 text-center text-nowrap">REB</th>
                <th className="p-1 text-center text-nowrap">STL</th>
                <th className="p-1 text-center text-nowrap">BLK</th>
                <th className="p-1 text-center text-nowrap">FG</th>
                <th className="p-1 text-center text-nowrap">FG%</th>
                <th className="p-1 text-center text-nowrap">2P</th>
                <th className="p-1 text-center text-nowrap">2P%</th>
                <th className="p-1 text-center text-nowrap">3P</th>
                <th className="p-1 text-center text-nowrap">3P%</th>
                <th className="p-1 text-center text-nowrap">FT</th>
                <th className="p-1 text-center text-nowrap">FT%</th>
                <th className="p-1 text-center text-nowrap">DRB</th>
                <th className="p-1 text-center text-nowrap">ORB</th>
                <th className="p-1 text-center text-nowrap">TO</th>
            </tr>
        </thead>
    );
}
