import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const {isAuthenticated, logout} = useAuth();

    return (
        <nav className="bg-green-700 text-white p-4 flex gap-4 justify-between items-center">
            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/info">Info</Link>
                <Link to="/games">Giochi</Link>
                <Link to="/expansions">Espansioni</Link>
                <Link to="/products">Prodotti</Link>
                {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
            </div>
            <div>
                {isAuthenticated ? (
                    <button onClick={logout} className="hover:underline">Logout</button>
                ) : (
                <>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline ml-2">Registrati</Link>
                </>
                )}
            </div>
        </nav>
    );
}