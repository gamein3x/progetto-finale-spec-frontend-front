export default function HomeProductCard({ product }) {
    return <>
                <h2>{product.title}</h2>
                <p>{product.category}</p>
            </>
}