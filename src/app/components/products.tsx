"use client";
import { useEffect, useState } from "react";

export default function Products() {
    interface Item {
        id: number;
        name: string;
    }

    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    function handleClick() {
        const newItem: Item = { id: data.length + 1, name: "Spaghetti" };
        const newData: Item[] = [...data, newItem];
        setData(newData);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response: Response = await fetch("products.json");
            const items: Item[] = await response.json();
            setData(items);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <ul>
                {data.map((item: Item) => <li key={item.id}>{item.name}</li>)}
            </ul>
            <button
                onClick={handleClick}
                value="Spaghetti"
            >
                Add Spaghetti
            </button>
        </div>
    );
}
