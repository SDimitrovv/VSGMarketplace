import { useGetMarketplaceQuery } from '../../services/productsService';
import { IProduct } from '../../types/types';
import CardComponent from './CardComponent';

const Marketplace = () => {
    const { data: products, isLoading } = useGetMarketplaceQuery();

    return (
        <main id='marketplaceMain'>
            {products?.length !== 0 && (
                products?.map((product: IProduct) => (
                    <CardComponent product={product} key={product.id} />
                ))
            )}
            {(products?.length === 0 || !products) && !isLoading && <div>No Products</div>}
            {isLoading && <div>Loading...</div>}
        </main>
    );
};

export default Marketplace;
