import { useEffect, useState } from "react";
import { loadMarketplace } from "../../services/itemsService";
import { IProduct } from "../../types/types";
import CardComponent from "../../components/CardComponent";

const Marketplace = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        loadMarketplace().then(result => {
            setProducts(result);
        })
    }, []);

    return (
        <main id='marketplaceMain'>
            {products.length > 0
                ? products.map((product: IProduct) => <CardComponent product={product} key={product.id} />)
                : <div>No products</div>}
        </main>
    )
};

export default Marketplace;
