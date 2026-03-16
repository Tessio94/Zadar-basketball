export default function StatisticsAverageHeader({
    type,
}: {
    type: 'avg' | 'pcg' | 'daily';
}) {
    const headers =
        type === 'avg'
            ? ['', 'Tim', 'Igrač', 'Utakmice', 'Ukupno', 'Prosjek']
            : type === 'pcg'
              ? ['', 'Tim', 'Igrač', 'Pokušaji', 'Ubačaji', 'Prosjek']
              : ['', 'Tim', 'Igrač', 'Ukupno'];

    return (
        <thead>
            <tr className="bg-slate-900 text-slate-100 [&_th]:p-2 [&_th]:text-center">
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </thead>
    );
}
