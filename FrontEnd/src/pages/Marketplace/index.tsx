import { useGetMarketplaceQuery } from '../../services/productsService';
import { IProduct } from "../../types/types";
import CardComponent from "../../components/CardComponent";

const Marketplace = () => {
    const { data: products } = useGetMarketplaceQuery();

    return (
        <main id='marketplaceMain'>
            {products
                ? products.map((product: IProduct) => <CardComponent product={product} key={product.id} />)
                : <div>No products</div>}
        </main>
    )
};

export default Marketplace;
