import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-green-700 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/info" className="hover:underline">Info</Link>
        <Link to="/games" className="hover:underline">Giochi</Link>
        <Link to="/expansions" className="hover:underline">Espansioni</Link>
        <Link to="/products" className="hover:underline">Prodotti</Link>
    </nav>
    );
}