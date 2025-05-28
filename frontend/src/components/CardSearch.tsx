import { useState } from "react";

interface CardResponse {
    name: string;
    price: number;
    url: string;
}

export default function CardSearch() {
    const [name, setName] = useState('');
    const [result, setResult] = useState<CardResponse | null>(null);

    const handleSearch = async () => {
        const res = await fetch('http://localhost:8000/cardtrader', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });

        const data = await res.json();
        setResult(data)
    };

    return (
        <div className="p-4 border rounded bg-white shadow">
            <h2 className="text-xl font-semibold mb-2">Ricerca Prezzo Carta</h2>
            <div className="flex gap-2 mb-2">
                <input 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border p-2 rounded flex-1"
                    placeholder="Nome carta"/>
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Cerca
                </button>
            </div>
            {result && (
            <div className="bg-gray-100 p-3 rounded">
                <p><strong>Nome:</strong> {result.name}</p>
                <p><strong>Prezzo:</strong> €{result.price}</p>
                <a href={result.url} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                Vai alla carta
                </a>
            </div>
            )}
        </div>
    );
}