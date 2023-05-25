import { useGetMarketplaceQuery } from '../../services/productsService';
import { IProduct } from "../../types/types";
import CardComponent from "../../components/CardComponent";

const Marketplace = () => {
    const { data: products, isLoading } = useGetMarketplaceQuery();

    return (
        <main id='marketplaceMain'>
            {products && products.map((product: IProduct) => <CardComponent product={product} key={product.id} />)}
            {isLoading && <div>Loading...</div>}
            {products?.length === 0 && <div>No products</div>}
        </main>
    )
};

export default Marketplace;
