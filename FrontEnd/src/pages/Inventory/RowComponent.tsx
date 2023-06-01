import { TableCell, TableRow, tableCellClasses, styled, Fade } from '@mui/material';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { useDeleteProductMutation } from '../../services/productsService.ts';
import { IProduct } from '../../types/types.ts';
import { toast } from 'react-toastify';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditProductModal from './EditProductModal.tsx';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '../../components/Popup.tsx';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child StyledTableCell, &:last-child th': {
        border: 0,
    },
}));

type RowComponentProps = {
    product: IProduct;
    setProducts: Dispatch<SetStateAction<IProduct[]>>
};

const RowComponent = ({ product, setProducts }: RowComponentProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteProduct] = useDeleteProductMutation();
    const rowRef = useRef<HTMLTableRowElement>(null);

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
            <Fade in={true} timeout={500}>
                <StyledTableRow ref={rowRef} id={product.id.toString()}>
                    <StyledTableCell>{product.code}</StyledTableCell>
                    <StyledTableCell>{product.fullName}</StyledTableCell>
                    <StyledTableCell>{product.type}</StyledTableCell>
                    <StyledTableCell>{product.quantityForSale || 0}</StyledTableCell>
                    <StyledTableCell>{product.quantity}</StyledTableCell>
                    <StyledTableCell>
                        <a className='edit' onClick={() => setShowEditModal(true)}>
                            <EditIcon />
                        </a>
                        <a className='delete' onClick={e => setAnchorEl(e.currentTarget)}>
                            <DeleteOutlineIcon />
                        </a>
                    </StyledTableCell>
                </StyledTableRow>
            </Fade>
        </>
    );
};

export default RowComponent;
