export type Console = {
    id: number;
    title: string;
    category: string;
    image?: string;
    price: number;
    description?: string;
    release_date: string;
    brand: string;
    condition: "As new" | "Used" | "Damaged";
};

export type Videogame = {
    id: number;
    title: string;
    category: string;
    image?: string;
    price: number;
    description?: string;
    release_date: string;
    publisher: string;
    developer: string;
    console: string;
    condition: "As new" | "Used" | "Damaged";
};