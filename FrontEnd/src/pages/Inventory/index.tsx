import { useGetInventoryQuery } from "../../services/productsService";
import { useGetLocationQuery } from "../../services/locationsService.ts";
import { ILocation, IProduct } from "../../types/types.ts";
import { useState, useEffect } from "react";
import AddProductModal from "./AddProductModal.tsx";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryTable from "./InventoryTable.tsx";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

const Inventory = () => {
    const { data: locations } = useGetLocationQuery();
    const { data, isLoading } = useGetInventoryQuery();
    const [locationOption, setLocationOption] = useState(0);
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
                <div id="searchSpace">
                    <Box className='searchProduct'>
                        <SearchIcon />
                        <TextField label="Search..." variant="standard"
                            onInput={(e) => setSearchString((e.target as HTMLInputElement).value)}
                        />
                    </Box>
                    <Box className='location' >
                        <LocationOnIcon />
                        <FormControl variant='standard'>
                            <InputLabel>Location</InputLabel>
                            <Select
                                value={locationOption}
                                onChange={(e) => setLocationOption(Number(e.target.value))}
                            >
                                <MenuItem value='0' key='0'>All Locations</MenuItem>
                                {locations?.map((l: ILocation) => (
                                    <MenuItem value={l.id} key={l.id}>
                                        {l.city}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <button id="addButton" onClick={() => setShowAddModal(true)}>
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
