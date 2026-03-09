export default function RosterRowHeader() {
    return (
        <thead>
            <tr className="border-b border-likar1 bg-likar2 text-lg text-slate-100">
                <th className="p-1 text-center text-nowrap">BROJ</th>
                <th className="p-1 text-center text-nowrap"></th>
                <th className="p-1 text-center text-nowrap">IGRAČ</th>
                <th className="p-1 text-center text-nowrap">DATUM ROĐENJA</th>
                <th className="p-1 text-center text-nowrap">GODINE</th>
                <th className="p-1 text-center text-nowrap">VISINA</th>
                <th className="p-1 text-center text-nowrap">POZICIJA</th>
            </tr>
        </thead>
    );
}
