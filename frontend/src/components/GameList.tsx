import React, { useEffect, useState } from "react";

interface Game {
    id: number;
    name: string;
    slug: string;
}

export default function GameList() {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/games')
        .then(response => response.json())
        .then(data => setGames(data))
        .catch(error => console.error('API games fetch error:', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setSelectedGame(selectedId);
        console.log('Game selected:', selectedId);
        console.log('Game selected:', selectedGame);
        // TODO: salva in context o props per altri componenti
    };

    return (
        <div className="p-4 border rounded bg-white shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">Seleziona un Gioco</h2>
            <select 
                onChange={handleChange}
                className="border p-2 rounded w-full"
                defaultValue="">
                <option value="" disabled>-- Seleziona un gioco --</option>
                {games.map((game: Game) => (
                    <option key={game.id} value={game.id}>
                        {game.name}
                    </option>
                ))}
            </select>
        </div>
    );
}