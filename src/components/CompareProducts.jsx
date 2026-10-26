import { useComparedProducts } from "../context/CompareContext";

export default function CompareProducts() {
    const { productsToCompare } = useComparedProducts();

    if (productsToCompare.length === 0) {
        return <h6 className="empty-compare-text">No products to compare yet !!</h6>;
    }

    if (productsToCompare.length >= 2) {
        return productsToCompare.map(product => (
            <div key={`${product.type}-${product.id}`} className='compare-card'>
                <h5>{product.title}</h5>
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
            </div>
        ))
    } else {
        return productsToCompare.map(product => (<>
            <div key={`${product.type}-${product.id}`} className='compare-card'>
                <h5>{product.title}</h5>
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
            </div>
            <h6>Add more than one product to compare (limit: 3 products).</h6>
        </>
        ))
    };
};
