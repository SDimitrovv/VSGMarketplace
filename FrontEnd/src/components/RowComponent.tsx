import { TableCell, TableRow, tableCellClasses, styled, Fade } from '@mui/material';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { IProduct } from "../types/types.ts";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditProductModal from "./EditProductModal.tsx";
import EditIcon from '@mui/icons-material/Edit';
import Popup from './Popup.tsx';
import { useDeleteProductMutation } from '../services/productsService.ts';

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

    const openPopup = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleDelete = async () => {
        setAnchorEl(null);
        const res = await deleteProduct(product.id);
        setProducts(oldProducts => oldProducts.filter(p => p !== product))
        console.log("DELETE", res);
    }

    const str = `Are you sure you want to remove this item ?`;

    return (
        <>
            <EditProductModal product={product} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
            <Popup string={str} onYes={handleDelete} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Fade in={true} timeout={500}>
                <StyledTableRow ref={rowRef} id={`${product.id}`} className="productRow">
                    <StyledTableCell>{product.code}</StyledTableCell>
                    <StyledTableCell>{product.fullName}</StyledTableCell>
                    <StyledTableCell>{product.type}</StyledTableCell>
                    <StyledTableCell>{product.quantityForSale}</StyledTableCell>
                    <StyledTableCell>{product.quantity}</StyledTableCell>
                    <StyledTableCell>
                        <a className="edit" onClick={() => setShowEditModal(true)}>
                            <EditIcon sx={{ fontSize: "medium" }} />
                        </a>
                        <a className="delete" onClick={openPopup}>
                            <DeleteOutlineIcon sx={{ fontSize: "medium" }} />
                        </a>
                    </StyledTableCell>
                </StyledTableRow>
            </Fade>
        </>
    );
};

export default RowComponent;
