import { createContext, useContext, useState, useEffect } from "react";

export const GlobalContext = createContext();
const { VITE_API_URL } = import.meta.env;



export function GlobalProvider({ children }) {

    const [products, setProducts] = useState([]);

    function fetchConsoles() {
        return fetch(`${VITE_API_URL}/consoles`)
            .then(res => res.json())
    };

    function fetchVideogames() {
        return fetch(`${VITE_API_URL}/videogames`)
            .then(res => res.json())
    };

    async function fetchProducts() {
        try {
            const [consoles, videogames] = await Promise.all([
                fetchConsoles(),
                fetchVideogames(),
            ]);
            setProducts([...consoles, ...videogames]);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    console.log(products);

    return (
        <GlobalContext.Provider value={{ ...products, setProducts }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}