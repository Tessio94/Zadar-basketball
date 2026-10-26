export default function StatisticsAverageHeader({
    type,
    jerseyColor,
}: {
    type: 'avg' | 'pcg' | 'daily';
    jerseyColor: string | undefined;
}) {
    const headers =
        type === 'avg' && !jerseyColor
            ? ['', 'Tim', 'Igrač', 'Utakmice', 'Ukupno', 'Prosjek']
            : (type === 'avg' && jerseyColor) || (type === 'pcg' && jerseyColor)
              ? ['', '', 'Igrač', 'Utakmice', 'Ukupno', 'Prosjek']
              : type === 'pcg'
                ? ['', 'Tim', 'Igrač', 'Ubačaji', 'Pokušaji', 'Prosjek']
                : ['', 'Tim', 'Igrač', 'Ukupno'];

    return (
        <thead>
            <tr className="bg-slate-900 font-heading text-slate-100 [&_th]:p-2 [&_th]:text-center">
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </thead>
    );
}
