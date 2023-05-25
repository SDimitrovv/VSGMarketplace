import { useGetInventoryQuery } from "../../services/productsService";
import { useState, useEffect } from "react";
import { ILocation, IProduct } from "../../types/types.ts";
import AddProductModal from "../../components/AddProductModal.tsx";
import InventoryTable from "../../components/Table.tsx";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useGetLocationQuery } from "../../services/locationsService.ts";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    InputAdornment,
    MenuItem,
} from "@mui/material";

const Inventory = () => {
    const { data, isLoading } = useGetInventoryQuery();
    const { data: locations } = useGetLocationQuery();
    const [locationOption, setLocationOption] = useState('');
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        if (data) {
            if (!locationOption) {
                setProducts(data);
            } else {
                const filteredByLocation = data.filter(p => p.locationId === Number(locationOption));
                setProducts(filteredByLocation);
            }
        }
    }, [data, locationOption]);

    const filteredProducts = products.filter((p) =>
        p.fullName.toLowerCase().includes(searchString.toLowerCase())
    );

    return (
        <>
            <AddProductModal setProducts={setProducts} showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
            <main id="inventoryMain">
                <div id="searchSpace" style={{ overflowX: 'hidden' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: 160 }}>
                        <SearchIcon sx={{ mr: 1, my: 0.5 }} />
                        <TextField label="Search..." variant="standard"
                            onInput={(e) => setSearchString((e.currentTarget as HTMLInputElement).value)}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: 160 }}>
                        <LocationOnIcon sx={{ mr: 1, my: 0.5 }} />
                        <FormControl variant="standard" sx={{ minWidth: 160 }}>
                            <InputLabel>Location</InputLabel>
                            <Select
                                value={locationOption}
                                onChange={(e) => setLocationOption(e.target.value)}
                            >
                                <MenuItem value={locationOption} key={locationOption}>
                                    All Locations
                                </MenuItem>
                                {locations?.map((l: ILocation) => (
                                    <MenuItem value={l.id} key={l.id}>
                                        {l.city}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <button id="addButton" onClick={() => setShowAddModal(true)}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <AddIcon sx={{ fontSize: "24px" }} />
                            <span>Add new</span>
                        </div>
                    </button>
                </div>
                {isLoading && <div>Loading...</div>}
                {products && (
                    <InventoryTable
                        setProducts={setProducts}
                        filteredProducts={filteredProducts}
                    />
                )}
            </main>
        </>
    );
};

export default Inventory;
