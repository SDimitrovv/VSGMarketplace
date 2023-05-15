import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { editProduct, loadCategories } from "../services/itemsService.ts";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { deleteImage, editImage } from "../services/pictureService.ts";
import { ICategory, IProduct } from "../types/types.ts";
import { imagePlaceholder } from "../utils/imagePlaceholder.ts";
import { uploadImage } from "../utils/uploadImage.ts";
import Modal from "./Modal.tsx";

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

type EditModalProps = {
    product: IProduct;
    showEditModal: boolean;
    setShowEditModal: Dispatch<SetStateAction<boolean>>;
};

const EditProductModal = ({ product, showEditModal, setShowEditModal }: EditModalProps) => {
    if (!product.imageUrl) {
        product.imageUrl = imagePlaceholder;
    }

    const [image, setImage] = useState(product.imageUrl);
    const [categories, setCategories] = useState<ICategory[]>();
    const [option, setOption] = useState(``);

    useEffect(() => {
        loadCategories().then((result) => setCategories(result));
        setTimeout(() => {
            setOption(`${product.categoryId}`);
        }, 100);
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const image = formData.get("picture") as File;
        formData.delete("picture");
        const imageForm = new FormData();
        imageForm.append("newPicture", image);

        const currentImg = document.querySelector(
            ".currentImg"
        ) as HTMLImageElement;
        const itemData = Object.fromEntries(formData) as unknown as IProduct;

        if (itemData.quantityForSale) {
            if (
                itemData.quantity < itemData.quantityForSale &&
                itemData.quantity < 0
            ) {
                return alert(
                    "Make sure that quantity is not less than quantity for sale!"
                );
            }
        }

        if (image.name) {
            const imgRes = await editImage(product.id as number, imageForm);
            console.log("Image PUT", imgRes);
            product.imageUrl = imgRes as string;
        } else if (currentImg.src !== product.imageUrl) {
            const res = await deleteImage(product.id as number);
            product.imageUrl = imagePlaceholder;
            console.log("Image DELETE", res);
        }

        const res = await editProduct(product.id as number, itemData);
        console.log("PUT", res);
        setShowEditModal(false);
    };

    return (
        <Modal showModal={showEditModal} setShowModal={setShowEditModal} >
            <form className="editForm modalContent" onSubmit={onSubmit}>
                <div className="row">
                    <div className="leftModal">
                        <h2>Modify Item</h2>
                        <TextField
                            sx={inputStyle}
                            type="text"
                            label="Code"
                            name="code"
                            variant="standard"
                            required
                            defaultValue={product.code}
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                        />
                        <TextField
                            sx={inputStyle}
                            type="text"
                            label="Name"
                            name="fullName"
                            variant="standard"
                            required
                            defaultValue={product.fullName}
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
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
                            defaultValue={product.description}
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                        />
                        <FormControl variant="standard" sx={inputStyle} required>
                            <InputLabel focused={false}>Category</InputLabel>
                            <Select
                                name="categoryId"
                                label="Category"
                                onChange={(e) => setOption(e.target.value as string)}
                                value={option}
                            >
                                {categories?.map((c: ICategory) => (
                                    <MenuItem value={c.id} key={c.id}>
                                        {c.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={inputStyle}
                            type="number"
                            label="Qty For Sale"
                            name="quantityForSale"
                            variant="standard"
                            defaultValue={product.quantityForSale}
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                        />
                        <TextField
                            sx={inputStyle}
                            type="number"
                            label="Sale Price"
                            name="price"
                            variant="standard"
                            defaultValue={product.price}
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                        />
                        <TextField
                            sx={inputStyle}
                            type="number"
                            label="Qty"
                            name="quantity"
                            variant="standard"
                            required
                            defaultValue={product.quantity}
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                        />
                    </div>
                    <div className="rightModal">
                        <img className="currentImg" src={image} />
                        <input
                            id="uploadInput"
                            className="inputImage"
                            accept="image/*"
                            name="picture"
                            type="file"
                            onChange={(e) => setImage(uploadImage(e))}
                        />
                        <div className="uploadDelete">
                            <label htmlFor="uploadInput" className="uploadImg">
                                Upload
                            </label>
                            <button className="deleteImg">Remove</button>
                        </div>
                    </div>
                </div>
                <button type="submit">Modify</button>
            </form>
        </Modal>
    );
};

export default EditProductModal;
