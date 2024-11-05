"use client";
import React, { useEffect, useState, useRef } from "react";

export default function Products() {
    interface Item {
        id: number;
        name: string;
    }

    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newItem, setNewItem] = useState<string>("Spaghetti");
    const inputRef = useRef<HTMLInputElement>(null);

    function addItem() {
        if (newItem === "") return;
        const item: Item = { id: data.length + 1, name: newItem };
        const newData: Item[] = [...data, item];
        setData(newData);
        setNewItem("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    function deleteItem() {
        // delete last itm in data
        const newData: Item[] = [...data];
        newData.pop();
        setData(newData);
    }

    function handleItemChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewItem(event.target.value);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            addItem();
        }
        if (event.key === "Delete") {
            deleteItem();
        }
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
            <ul aria-label="Product List">
                {data.map((item: Item) => <li key={item.id}>{item.name}</li>)}
            </ul>
            <input 
                type="text" 
                aria-label="Enter New Item Field" 
                value={newItem}
                onChange={handleItemChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <button
                onClick={addItem}
                aria-label="Add Item"
            >
                Add Item
            </button>
            <button
                onClick={deleteItem}
                aria-label="Delete Item"
            >
                Delete Item
            </button>
        </div>
    );
}
