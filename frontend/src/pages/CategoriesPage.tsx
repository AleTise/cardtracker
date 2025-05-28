import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error("Categorie error:", err));
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold">Categorie</h2>
            <ul className="list-disc pl-6">
                {categories.map((c) => (
                <li key={c.id}>{c.name}</li>
                ))}
            </ul>
        </div>
    );
}