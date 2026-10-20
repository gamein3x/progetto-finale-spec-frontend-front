import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import { useState, useEffect } from 'react';



export default function DetailPage() {
    const { type, id } = useParams();
    const { fetchProduct } = useGlobalContext();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct(type, id).then(setProduct).catch(console.error)
    }, [type, id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-card">
            <h2>{product.title}</h2>
            <p>{product.price}</p>
        </div>
    );
}