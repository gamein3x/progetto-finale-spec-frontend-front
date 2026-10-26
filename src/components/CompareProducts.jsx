import { useComparedProducts } from "../context/CompareContext";

export default function CompareProducts() {
    const { productsToCompare, removeFromCompare } = useComparedProducts();


    if (productsToCompare.length === 0) {
        return <h6 className="empty-compare-text">No products to compare yet !!</h6>;
    }

    const backgroundStyle = (product) => {
        return product.image
            ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url("${product.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }
            : undefined
    };

    if (productsToCompare.length >= 2) {
        return productsToCompare.map(product => (
            <div key={`${product.type}-${product.id}`} className='compare-card'>
                <div style={backgroundStyle(product)} className="compare-card-title-box">
                    <h5>{product.title}</h5>
                </div>
                <p>{product.description}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><p>{product.price}</p></td>
                            <td><p>{product.condition}</p></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => removeFromCompare(product)}>Remove product</button>
            </div>
        ))
    } else {
        return productsToCompare.map(product => (<div key={`${product.type}-${product.id}`} className="compare-box">
            <div className='compare-card'>
                <div style={backgroundStyle(product)} className="compare-card-title-box">
                    <h5>{product.title}</h5>
                </div>
                <p>{product.description}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><p>{product.price}</p></td>
                            <td><p>{product.condition}</p></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => removeFromCompare(product)}>Remove product</button>
            </div>
            <h6>Add more than one product to compare (limit: 3 products).</h6>
        </div>

        ))
    };
};
