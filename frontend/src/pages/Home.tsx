import CardSearch from "../components/CardSearch";
import GameList from "../components/GameList";

export default function Home() {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">Card Tracker</h1>
            <GameList />
            <CardSearch />
        </div>
    );
}