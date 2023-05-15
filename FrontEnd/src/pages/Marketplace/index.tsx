import { useEffect, useState } from "react";
import { loadMarketplace } from "../../services/itemsService";
import { IProduct } from "../../types/types";
import CardComponent from "../../components/CardComponent";
import { Fade } from '@mui/material';

const Marketplace = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        loadMarketplace().then(result => {
            setProducts(result);
        })
    }, []);

    return (
        <Fade in={true} timeout={500}>
            <main id='marketplaceMain'>
                {products.length > 0
                    ? products.map((product: IProduct) => <CardComponent product={product} key={product.id} />)
                    : <div>No products</div>}
            </main>
        </Fade>
    )
};

export default Marketplace;
