import { TableCell, TableRow, tableCellClasses, styled, Fade } from '@mui/material';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { deleteProduct } from "../services/itemsService.ts";
import { IProduct } from "../types/types.ts";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditProductModal from "./EditProductModal.tsx";
import EditIcon from '@mui/icons-material/Edit';
import Popup from './Popup.tsx';

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
    const [showEditModal, setShowEditModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const rowRef = useRef<HTMLTableRowElement>(null);

    const openPopup = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleDelete = async () => {
        setAnchorEl(null);
        const res = await deleteProduct(product.id);
        setProducts(oldProducts => oldProducts.filter(p => p !== product))
        console.log(res);
    }

    const str = `Are you sure you want to remove this item ?`;

    return (
        <>
            {showEditModal && <EditProductModal product={product} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />}
            <Fade in={true} timeout={1000}>
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
            <Popup string={str} onYes={handleDelete} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
    );
};

export default RowComponent;