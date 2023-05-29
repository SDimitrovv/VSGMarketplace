import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter, styled, tableCellClasses } from '@mui/material';
import { IProduct } from '../../types/types.ts';
import { useState } from 'react';
import RowComponent from './RowComponent.tsx';

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
    isLoading: boolean;
    filteredProducts: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const InventoryTable = ({ isLoading, filteredProducts, setProducts }: InventoryTableProps) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        e;
        setPage(newPage);
    }

    const rowHeight = (10 - filteredProducts.length) * 55;

    return (
        <TableContainer component='div' id='tableBorder'>
            <Table aria-label='sticky table'>
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
                            <StyledTableCell>{isLoading ? 'Loading...' : 'No Products'}</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>}
                </TableBody>
                <TableFooter>
                    {filteredProducts.length < 10 && window.innerWidth > 768 &&
                        <TableRow sx={{ height: rowHeight }}>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>}
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10]}
                            count={filteredProducts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer >
    );
};

export default InventoryTable;   
