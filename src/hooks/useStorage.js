import { useEffect, useState } from "react";

export default function useStorage( itemKey, initialValue ) {
    const [ state, setState ] = useState(() => {
        const prevState = localStorage.getItem(itemKey);
        if (prevState){
            return JSON.parse(prevState);
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(itemKey, JSON.stringify(state));
    }, [state, itemKey]);

    return [state, setState];
}