import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { TableContainer } from '@mui/material';
import { IProduct } from '../../types/types.ts';
import RowComponent from './RowComponent.tsx';

type InventoryTableProps = {
    isLoading: boolean;
    filteredProducts: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const InventoryTable = ({ isLoading, filteredProducts, setProducts }: InventoryTableProps) => {
    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', flex: 2 },
        { field: 'name', headerName: 'Name', flex: 3 },
        { field: 'category', headerName: 'Category', flex: 2 },
        { field: 'location', headerName: 'Location', flex: 2 },
        { field: 'forSale', headerName: 'For Sale', flex: 2 },
        { field: 'qty', headerName: 'QTY', flex: 2 },
        {
            field: 'actions', headerName: 'Actions', flex: 2, disableColumnMenu: true, hideSortIcons: true,
            renderCell: (params) => {
                const product = params.value as IProduct;
                return (<RowComponent setProducts={setProducts} product={product} />)
            },
        },
    ];

    const rows: GridRowsProp = filteredProducts.map((product: IProduct) => ({
        id: product.id,
        code: product.code,
        name: product.fullName,
        category: product.type,
        location: product.city,
        forSale: product.quantityForSale,
        qty: product.quantity,
        actions: product
    }));

    return (
        <TableContainer component='div' id='tableBorder'>
            {isLoading ? <div>Loading...</div> :
                <DataGrid
                    disableRowSelectionOnClick
                    disableColumnSelector
                    columns={columns}
                    rows={rows}
                    pagination
                    pageSizeOptions={[10, 20]}
                    rowCount={filteredProducts.length}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 }
                        }
                    }}
                />
            }
        </TableContainer >
    );
};

export default InventoryTable;   
