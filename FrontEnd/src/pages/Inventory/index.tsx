import { useGetInventoryQuery } from '../../services/productsService';
import { useState, useEffect, useRef } from 'react';
import { IProduct } from "../../types/types.ts";
import AddProductModal from "../../components/AddProductModal.tsx";
import InventoryTable from '../../components/Table.tsx';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Inventory = () => {
    const { data } = useGetInventoryQuery("/Product/Inventory");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchString, setSearchString] = useState("");
    // const filteredProducts = useRef<IProduct[] | null>(null);
    // const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        if (data) {
            const newData = data.filter((p: IProduct) =>
                p.fullName.toLowerCase().includes(searchString))
            setProducts(newData);
        }
    }, [data]);

    return (
        <>
            {showAddModal && <AddProductModal setProducts={setProducts} showAddModal={showAddModal} setShowAddModal={setShowAddModal} />}
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
                {products.length > 0 && <InventoryTable setProducts={setProducts} filteredProducts={products} />}
            </main>
        </>
    );
};

export default Inventory;   
