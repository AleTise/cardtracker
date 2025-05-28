import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    graded: boolean;
}

interface Expansion {
    id: number;
    name: string;
}

interface Blueprint {
    id: number;
    name: string;
}

const LANGUAGES = ['en', 'it', 'de', 'fr', 'es', 'jp'];

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [expansions, setExpansions] = useState<Expansion[]>([]);
    const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
    const [selectedExpansion, setSelectedExpansion] = useState<number | null>(null);
    const [selectedBlueprint, setSelectedBlueprint] = useState<number | null>(null);
    const [foil, setFoil] = useState<boolean | null>(null);
    const [language, setLanguage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/expansions')
            .then((res) => res.json())
            .then(setExpansions)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!selectedExpansion) return;

        fetch(`http://localhost:8000/blueprints?expansion_id=${selectedExpansion}`)
            .then((res) => res.json())
            .then(setBlueprints)
            .catch(console.error);
    }, [selectedExpansion]);

    useEffect(() => {
        if (!selectedExpansion) return;

        setLoading(true);

        const params = new URLSearchParams({
            expansion_id: String(selectedExpansion),
            ...(selectedBlueprint !== null ? { blueprint_id: String(selectedBlueprint) } : {}),
            ...(foil !== null ? { foil: String(foil) } : {}),
            ...(language ? { language } : {}),
    });

        fetch(`http://localhost:8000/products?${params.toString()}`)
            .then((res) => res.json())
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [selectedExpansion, selectedBlueprint, foil, language]);

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold">Filtra Prodotti</h2>      
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <Label>Espansione</Label>
                    <Select value={selectedExpansion !== null ? String(selectedExpansion) : undefined} onValueChange={(val) => setSelectedExpansion(Number(val))}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Seleziona..." />
                        </SelectTrigger>
                        <SelectContent>
                            {expansions.map((e) => (
                                <SelectItem key={e.id} value={String(e.id)}>{e.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Blueprint</Label>
                    <Select value={selectedBlueprint !== null ? String(selectedBlueprint) : undefined} onValueChange={(val) => setSelectedBlueprint(Number(val))}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Tutte" />
                        </SelectTrigger>
                        <SelectContent>
                            {blueprints.map((b) => (
                                <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Foil</Label>
                    <Select value={foil !== null ? String(foil) : undefined} onValueChange={(val) => setFoil(val === "true")}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Tutti" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Foil</SelectItem>
                            <SelectItem value="false">Non Foil</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Lingua</Label>
                    <Select value={language || undefined} onValueChange={(val) => setLanguage(val)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Tutte" />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((lang) => (
                                <SelectItem key={lang} value={lang}>{lang.toUpperCase()}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {loading ? (
                <p>Caricamento...</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                    <Card key={p.id}>
                        <CardContent className="p-4 space-y-2">
                            <h3 className="text-lg font-bold">{p.name}</h3>
                            <p className="text-sm text-gray-700">{p.description || "Nessuna descrizione"}</p>
                            <p className="text-sm text-gray-600">Prezzo: €{p.price}</p>
                            <p className="text-sm">Graded: {p.graded ? "✅" : "❌"}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            )}
        </div>
    );
}