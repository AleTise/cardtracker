import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handle_register = async () => {
        setLoading(true);

        try {
            const res = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            });

            if (!res.ok) throw new Error('Registration failed! Retry.');

            const loginRes = await fetch('http://localhost:8000/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    username,
                    password,
                }),
            });

            if (!loginRes.ok) throw new Error('Registration ok, but login failed');
            
            const data = await loginRes.json();
            login(data.access_token);
            navigate('/login');
        } catch (err) {
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded bg-white shadow mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Registrati</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-3 border rounded"
                placeholder="Username"/>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-3 border rounded"
                placeholder="Password"/>
            <button
                onClick={handle_register}
                disabled={loading}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50">
                {loading ? "Registrazione in corso..." : "Registrati"}
            </button>
        </div>
    );
}