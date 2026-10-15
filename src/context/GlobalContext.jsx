import { createContext, useContext } from "react";

import useProducts from "../hooks/useProducts";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const products = useProducts();

    return (
        <GlobalContext.Provider value={{ products }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}