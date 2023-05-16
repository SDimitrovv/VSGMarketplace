import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter, styled ,tableCellClasses} from "@mui/material";
import { useState, useRef } from 'react';
import { IProduct } from "../types/types.ts";
import RowComponent from "./RowComponent.tsx";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

type InventoryTableProps = {
    filteredProducts: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const InventoryTable = ({ filteredProducts, setProducts }: InventoryTableProps) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    return (
        <TableContainer component="div" id="tableBorder" ref={tableRef}>
            <Table aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell><b>Code</b></StyledTableCell>
                        <StyledTableCell><b>Name</b></StyledTableCell>
                        <StyledTableCell><b>Category</b></StyledTableCell>
                        <StyledTableCell><b>For Sale</b></StyledTableCell>
                        <StyledTableCell><b>QTY</b></StyledTableCell>
                        <StyledTableCell><b>Actions</b></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts.length !== 0
                        ? filteredProducts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product: IProduct) => <RowComponent setProducts={setProducts} product={product} key={product.id} />)
                        : <TableRow>
                            <StyledTableCell>No Products</StyledTableCell>
                        </TableRow>}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 20]}
                            count={filteredProducts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default InventoryTable;   
