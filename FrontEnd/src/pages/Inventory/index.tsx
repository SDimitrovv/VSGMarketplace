import { useState, useEffect } from 'react';
import AddProductModal from "../../components/AddProductModal.tsx";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InventoryTable from '../../components/Table.tsx';
import { IProduct } from "../../types/types.ts";
import { loadInventory } from '../../services/itemsService.ts';

const Inventory = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [opacity, setOpacity] = useState(0);
    setTimeout(() => {
        setOpacity(1);
    }, 300);

    useEffect(() => {
        loadInventory().then((result: IProduct[]) => {
            setProducts(result);
        });
    }, []);

    const filteredProducts = products.filter((p: IProduct) =>
        p.fullName.toLowerCase().includes(searchString));

    return (
        <>
            {showAddModal && <AddProductModal setProducts={setProducts} onClose={() => setShowAddModal(false)} />}
            <main id="inventoryMain" >
                <div id="searchSpace" style={{ opacity }}>
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
        </>
    );
};

export default Inventory;   
