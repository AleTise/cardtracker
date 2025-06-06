import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const form_data = new URLSearchParams();
        form_data.append('username', email);
        form_data.append('password', password);

        const res = await fetch('http://localhost:8000/token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: form_data.toString()
        });

        if (res.ok) {
            const data = await res.json();
            login(data.access_token);
            navigate('/dashboard');
        } else {
            alert('Wrong credentials');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded bg-white shadow mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-3 border rounded"
                placeholder="Email"/>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-3 border rounded"
                placeholder="Password"/>
            <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Accedi
            </button>
            <p className="text-center mt-4 text-sm">
                Non hai un account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Registrati
                </Link>
            </p>
        </div>
    );
}