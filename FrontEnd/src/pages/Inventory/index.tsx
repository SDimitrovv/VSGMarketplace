import { useGetInventoryQuery } from '../../services/productsService';
import { useState, useEffect } from 'react';
import { Box, TextField, } from '@mui/material';
import { IProduct } from '../../types/types.ts';
import AddProductModal from './AddProductModal.tsx';
import InventoryTable from './InventoryTable.tsx';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Inventory = () => {
    const { data, isLoading } = useGetInventoryQuery();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        data && setProducts(data);
    }, [data]);

    const filteredProducts = products.filter((p) =>
        p.fullName.toLowerCase().includes(searchString.toLowerCase())
    );

    return (
        <>
            <AddProductModal products={data} setProducts={setProducts} showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
            <main id='inventoryMain'>
                <div id='searchSpace'>
                    <Box className='searchProduct'>
                        <SearchIcon />
                        <TextField label='Search...' variant='standard'
                            onInput={(e) => setSearchString((e.target as HTMLInputElement).value)}
                        />
                    </Box>
                    <button id='addButton' onClick={() => setShowAddModal(true)}>
                        <div id='addButtonSpace'>
                            <AddIcon />
                            <span>Add new</span>
                        </div>
                    </button>
                </div>
                {products &&
                    <InventoryTable
                        isLoading={isLoading}
                        setProducts={setProducts}
                        filteredProducts={filteredProducts}
                    />
                }
            </main>
        </>
    );
};

export default Inventory;
