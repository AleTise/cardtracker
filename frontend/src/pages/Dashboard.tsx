import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface UserInfo {
    username: string;
    email: string;
    joined: string;
}

export default function Dashboard() {
    const {token, logout} = useAuth();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
    if (!token) {
        console.warn("Token mancante, fetch non avviata");
        return;
    }

    console.log("Token presente, avvio fetch");

    fetch('http://localhost:8000/info', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
        console.log("Status fetch /info:", res.status);
        if (!res.ok) throw new Error(`Errore fetch: ${res.status}`);
        return res.json();
    })
    .then(data => {
        console.log("UserInfo Response:", data);
        setUserInfo({
            username: data.username,
            email: data.email,
            joined: data.created_at || data.joined || new Date().toISOString()
        });
    })
    .catch(error => {
            console.error('User info fetch error:', error);
            logout();
        });
    }, [token]);


    if (!userInfo) return <div className="p-4">Caricamento dati...</div>

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded space-y-4">
            <h2 className="text-2xl font-bold">Benvenuto, {userInfo.username} 👋</h2>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Iscritto dal:</strong> {new Date(userInfo.joined).toLocaleDateString()}</p>
            <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
            </button>
        </div>
    );
}