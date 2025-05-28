import GameList from "../components/GameList";

export default function GamePage() {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold">Lista Giochi</h2>
            <GameList />
        </div>
    );
}