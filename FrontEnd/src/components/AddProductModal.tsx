import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
    TextField, FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { createProduct, loadCategories } from "../services/itemsService.ts";
import { createImage } from "../services/pictureService.ts";
import { ICategory, IProduct } from "../types/types.ts";
import { imagePlaceholder } from "../utils/imagePlaceholder.ts";
import { uploadImage } from '../utils/uploadImage.ts';
import Modal from './Modal.tsx';

const inputStyle = {
    color: "#9A9A9A",
    mb: "66px",
    width: "100%",
    height: "0px",
    ".MuiInputBase-root::after": {
        borderBottom: "#000",
    },
    "@media screen and (max-width: 768px)": {
        input: {
            height: "34px !important",
        },
    },
};

type AddModalProps = {
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    showAddModal: boolean;
    setShowAddModal: Dispatch<SetStateAction<boolean>>;
}

const AddProductModal = ({ setProducts, showAddModal, setShowAddModal }: AddModalProps) => {
    const [categories, setCategories] = useState<ICategory[]>();
    const [image, setImage] = useState(imagePlaceholder);
    const [option, setOption] = useState('');

    useEffect(() => {
        loadCategories().then(result => setCategories(result))
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const image = formData.get("picture") as File;
        formData.delete("picture");

        const imageForm = new FormData();
        imageForm.append("picture", image);
        const itemData = Object.fromEntries(formData) as unknown as IProduct;

        if (itemData.quantityForSale) {
            if (itemData.quantity < itemData.quantityForSale && itemData.quantity < 0) {
                return alert("Make sure that quantity is not less than quantity for sale!");
            }
        }

        const response = await createProduct(itemData);
        console.log("POST", response);
        if (image.name) {
            const imgRes = await createImage(response.id, imageForm) as string;
            console.log("Image POST", imgRes);
            response.imageUrl = imgRes;
        }

        setProducts(oldProducts => [...oldProducts, response]);
        setShowAddModal(false);
    };

    return (
        <Modal showModal={showAddModal} setShowModal={setShowAddModal} >
            <form className="addForm modalContent" onSubmit={onSubmit}>
                <div className="row">
                    <div className="leftModal">
                        <h2>Add New Item</h2>
                        <TextField
                            sx={inputStyle}
                            type="text"
                            label="Code"
                            name="code"
                            variant="standard"
                            required
                            InputLabelProps={{
                                style: {
                                    color: '#9A9A9A'
                                }
                            }}
                        />
                        <TextField
                            sx={inputStyle}
                            type="text"
                            label="Name"
                            name="fullName"
                            variant="standard"
                            required
                            InputLabelProps={{
                                style: {
                                    color: '#9A9A9A'
                                }
                            }}
                        />
                        <TextField
                            sx={{
                                mb: "20px",
                                width: "100%",
                                ".MuiInputBase-root::after": {
                                    borderBottom: "#000",
                                },
                            }}
                            name="description"
                            label="Description"
                            multiline
                            rows={4}
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: '#9A9A9A'
                                }
                            }}
                        />
                        <FormControl variant="standard" sx={inputStyle} required>
                            <InputLabel focused={false}>Category</InputLabel>
                            <Select
                                name="categoryId"
                                label="Category"
                                value={option}
                                onChange={(e) => setOption(e.target.value as string)}
                            >
                                {categories?.map((c: ICategory) => <MenuItem value={c.id} key={c.id}>{c.type}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={inputStyle}
                            type="number"
                            label="Qty For Sale"
                            name="quantityForSale"
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: '#9A9A9A'
                                }
                            }}
                        />
                        <TextField
                            sx={inputStyle}
                            type="number"
                            label="Sale Price"
                            name="price"
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: '#9A9A9A'
                                }
                            }}
                        />
                        <TextField
                            sx={inputStyle}
                            type="number"
                            label="Qty"
                            name="quantity"
                            variant="standard"
                            required
                            InputLabelProps={{
                                style: {
                                    color: '#9A9A9A'
                                }
                            }}
                        />
                    </div>
                    <div className="rightModal">
                        <img className="currentImg" src={image} />
                        <input id="uploadInput" className="inputImage" accept="image/*" name="picture" type="file" onChange={(e) => setImage(uploadImage(e))} />
                        <div className="uploadDelete">
                            <label htmlFor="uploadInput" className="uploadImg">Upload</label>
                            <button className="deleteImg">Remove</button>
                        </div>
                    </div>
                </div>
                <button type="submit">Add</button>
            </form>
        </Modal>
    );
};

export default AddProductModal;