import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handle_register = async () => {
        const res = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        if (res.ok) {
            alert('Registration successful! Now log in.');
            navigate('/login');
        } else {
            alert('Registration failed! Retry.');
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
            <button onClick={handle_register} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                Registrati
            </button>
        </div>
    );
}