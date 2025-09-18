export default function Keyboard() {
    const rows = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"]
    ];

    return (
        <div className="flex flex-col items-center gap-2 mt-6">
            {rows.map((row, i) => (
                <div key={i} className="flex gap-1">
                    {row.map((key) => (
                        <div
                            key={key}
                            className="w-10 h-12 flex items-center justify-center border rounded bg-gray-200 dark:bg-gray-700 text-sm font-bold"
                        >
                            {key}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
