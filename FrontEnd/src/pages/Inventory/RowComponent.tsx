import { useState, Dispatch, SetStateAction } from 'react';
import { useDeleteProductMutation } from '../../services/productsService.ts';
import { IProduct } from '../../types/types.ts';
import { toast } from 'react-toastify';
import { Fade } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditProductModal from './EditProductModal.tsx';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '../../components/Popup.tsx';

type RowComponentProps = {
    product: IProduct;
    setProducts: Dispatch<SetStateAction<IProduct[]>>
};

const RowComponent = ({ product, setProducts }: RowComponentProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async () => {
        setAnchorEl(null);
        const response = await deleteProduct(product.id);
        if ('error' in response) {
            return;
        }

        toast.success('Deleted successfully!');
        setProducts(oldProducts => oldProducts.filter(p => p !== product));
    }

    const popupMessage = `Are you sure you want to remove this item ?`;

    return (
        <>
            <EditProductModal setProducts={setProducts} product={product} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
            <Popup popupMessage={popupMessage} onYes={handleDelete} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Fade in={true} timeout={1000}>
                <div>
                    <a className='edit' onClick={() => setShowEditModal(true)}>
                        <EditIcon />
                    </a>
                    <a className='delete' onClick={e => setAnchorEl(e.currentTarget)}>
                        <DeleteOutlineIcon />
                    </a>
                </div>
            </Fade>
        </>
    );
};

export default RowComponent;
