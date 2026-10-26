import { createContext, useContext } from "react";
import { useGlobalContext } from "./GlobalContext";
import useStorage from "../hooks/useStorage";

const CompareContext = createContext();

function CompareProvider({ children }) {
    const { fetchProduct } = useGlobalContext();
    const [productsToCompare, setProductsToCompare] = useStorage("productsToCompare", []);

    const isSameProduct = (a, b) => a.id === b.id && a.type === b.type;
    const isInCompare = (product) => productsToCompare.some(p => isSameProduct(p, product));

    const removeFromCompare = (product) => {
        setProductsToCompare(prev => prev.filter(p => !isSameProduct(p, product)));
    }

    const toggleCompare = async (event, product) => {
        event.preventDefault();
        if (isInCompare(product)) {
            removeFromCompare(product);
            return
        }
        if (productsToCompare.length >= 3) {
            alert("You reached product limit.");
            return
        }
        try {
            const fullProduct = await fetchProduct(product.type, product.id);
            setProductsToCompare(prev => {
                if (prev.length >= 3 || prev.some(p => isSameProduct(p, product))) return prev;
                return [...prev, { ...fullProduct, type: product.type }];
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
            <CompareContext
                value={{
                    productsToCompare,
                    toggleCompare,
                    isInCompare,
                    removeFromCompare
                }}
            >
                {children}
            </CompareContext>
        );
}

const useComparedProducts = () => useContext(CompareContext);

export {
    CompareContext,
    CompareProvider,
    useComparedProducts
}