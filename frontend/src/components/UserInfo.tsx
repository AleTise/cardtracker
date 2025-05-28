import { useEffect, useState } from "react";

export default function UserInfo() {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/info')
        .then(response => response.json())
        .then(data => setInfo(data))
        .catch(error => console.error('API "info" fetch error: ', error));
    }, []);

    return (
        <div className="p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Info dal backend</h2>
            <pre className="text-sm">{JSON.stringify(info, null, 2)}</pre>
        </div>
    );
}