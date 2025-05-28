import CardSearch from "../components/CardSearch";
import GameList from "../components/GameList";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">Card Tracker</h1>
            <div className="flex justify-end space-x-4">
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </div>
            <GameList />
            <CardSearch />
        </div>
    );
}