import { Dispatch, SetStateAction } from 'react';
import { IProduct } from "../types/types";
import Modal from './Modal';
import { imagePlaceholder } from '../utils/imagePlaceholder';

type ProductModalProps = {
    product: IProduct;
    showProductModal: boolean;
    setShowProductModal: Dispatch<SetStateAction<boolean>>;
};

const ProductModal = ({ product, showProductModal, setShowProductModal }: ProductModalProps) => {
    return (
        <Modal showModal={showProductModal} setShowModal={setShowProductModal} modalType='productModal'>
            <div id="productModal" className="modalContent" >
                <img id="modalImage" src={product.imageUrl || imagePlaceholder} />
                <div id="modalFrameOne">
                    <div id="modalFrameTwo">
                        <div id="productName">
                            <b>{product.fullName}</b>
                            <small>{product.type}</small>
                        </div>
                        <div id="priceAndQty">
                            <b>{product.price} BGN</b>
                            <small>Qty: {product.quantityForSale}</small>
                        </div>
                    </div>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;