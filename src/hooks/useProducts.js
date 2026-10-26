import { useState, useEffect } from "react";

const { VITE_API_URL } = import.meta.env;

export default function useProducts() {
    const [products, setProducts] = useState([]);

    function fetchConsoles() {
        return fetch(`${VITE_API_URL}/consoles`)
            .then(res => res.json())
    };

    function fetchVideogames() {
        return fetch(`${VITE_API_URL}/videogames`)
            .then(res => res.json())
    };

    async function fetchProduct(type, id) {
        const res = await fetch(`${VITE_API_URL}/${type}s/${id}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        return data[type];
    }

    async function fetchProducts() {
        try {
            const [consoles, videogames] = await Promise.all([
                fetchConsoles(),
                fetchVideogames()
            ]);

            const list = [
                ...consoles.map(c => ({ ...c, type: "console" })),
                ...videogames.map(v => ({ ...v, type: "videogame" })),
            ];

            const results = await Promise.allSettled(
                list.map(item => fetchProduct(item.type, item.id)));
            return results.map((result, i) => {
                if (result.status === "fulfilled") {
                    return { ...list[i], ...result.value, type: list[i].type };
                }
                console.error(`Details failed for ${list[i].type} ${list[i].id}`, result.reason);
                return list[i];
            });
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        fetchProducts()
        .then(fullProducts => setProducts(fullProducts));
    }, []);

    console.log(products);

    return { products, fetchProduct }
}