import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, forwardRef } from 'react';
import {
    IconButton, Slide, Dialog, TextField, FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { createProduct, loadCategories } from "../services/itemsService.ts";
import { createImage } from "../services/pictureService.ts";
import { ICategory, IProduct } from "../types/types.ts";
import { imagePlaceholder } from "../utils/imagePlaceholder.ts";
import { uploadImage } from '../utils/uploadImage.ts';

const modalStyle = {
    borderRadius: "20px",
    margin: 0,
    width: "92%",
    maxHeight: "740px",
    "@media screen and (max-width: 768px)": {
        maxHeight: "96%",
    }
}

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

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type RowComponentProps = {
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
    onClose: () => void;
}

const AddProductModal = ({ setProducts, onClose }: RowComponentProps) => {
    const [categories, setCategories] = useState<ICategory[]>();
    const [image, setImage] = useState(imagePlaceholder);
    const [option, setOption] = useState('');
    const [open, setOpen] = useState(true);
    if (!open) {
        setTimeout(() => {
            onClose();
        }, 100)
    }

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
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
            PaperProps={{ sx: { ...modalStyle } }}
        >
            <form className="addForm modalContent" onSubmit={onSubmit}>
                <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 0, top: 0 }}>
                    <CloseIcon sx={{ color: '#000' }} />
                </IconButton>
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
        </Dialog >
    );
};

export default AddProductModal;