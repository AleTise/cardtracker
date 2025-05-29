const API = 'http://localhost:8000';

export const get = async (path: string) => {
    const res = await fetch(`${API}${path}`);

    if (!res.ok) throw new Error('API \'Get\' error!');
    return res.json();
};

export const post = async (path: string, body: any) => {
    const res = await fetch(`${API}${path}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('API \'Post\' error');
    return res.json();
}