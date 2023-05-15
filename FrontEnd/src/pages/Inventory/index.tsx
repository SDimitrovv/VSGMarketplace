import { useState, useEffect } from 'react';
import AddProductModal from "../../components/AddProductModal.tsx";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InventoryTable from '../../components/Table.tsx';
import { IProduct } from "../../types/types.ts";
import { loadInventory } from '../../services/itemsService.ts';
import { Fade } from '@mui/material';

const Inventory = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        loadInventory().then((result: IProduct[]) => {
            setProducts(result);
        });
    }, []);

    const filteredProducts = products.filter((p: IProduct) =>
        p.fullName.toLowerCase().includes(searchString));

    return (
        <>
            {showAddModal && <AddProductModal setProducts={setProducts} showAddModal={showAddModal} setShowAddModal={setShowAddModal} />}
            <Fade in={true} timeout={500}>
                <main id="inventoryMain" >
                    <div id="searchSpace" >
                        <div id="input">
                            <SearchIcon sx={{ fontSize: "14px" }} />
                            <input
                                onInput={e => setSearchString((e.target as HTMLInputElement).value)}
                                type="text"
                                id="searchText"
                                placeholder="Search..."
                            />
                        </div>
                        <button id="addButton" onClick={() => setShowAddModal(true)}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <AddIcon sx={{ fontSize: "24px" }} />
                                <span>Add new</span>
                            </div>
                        </button>
                    </div>
                    <InventoryTable setProducts={setProducts} filteredProducts={filteredProducts} />
                </main>
            </Fade>
        </>
    );
};

export default Inventory;   
