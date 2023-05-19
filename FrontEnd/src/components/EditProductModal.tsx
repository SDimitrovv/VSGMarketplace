import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useDeleteImageMutation, useEditImageMutation } from "../services/imageService.ts";
import { useState, Dispatch, SetStateAction, } from "react";
import { IFormInputs, ICategory, IProduct } from "../types/types.ts";
import { useEditProductMutation } from "../services/productsService.ts";
import { useGetCategoriesQuery } from "../services/categoriesService.ts";
import { imagePlaceholder } from "../utils/imagePlaceholder.ts";
import { uploadImage } from "../utils/uploadImage.ts";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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
        height: "34px !important",
        mb: "40px",
    },
};

type EditModalProps = {
    product: IProduct;
    showEditModal: boolean;
    setShowEditModal: Dispatch<SetStateAction<boolean>>;
};

const EditProductModal = ({ product, showEditModal, setShowEditModal }: EditModalProps) => {
    const [imageUrl, setImageUrl] = useState(product.imageUrl ? product.imageUrl : imagePlaceholder);
    const [option, setOption] = useState(product.categoryId.toString());
    const { data: categories } = useGetCategoriesQuery();
    const [editProduct] = useEditProductMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [editImage] = useEditImageMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<IFormInputs>({
        defaultValues: {
            code: product.code,
            fullName: product.fullName,
            description: product.description,
            categoryId: product.categoryId,
            quantityForSale: product.quantityForSale ? product.quantityForSale : null,
            price: product.price ? product.price : null,
            quantity: product.quantity,
            image: null
        },
        mode: 'all',
    });

    const onSubmit = async (data: IFormInputs) => {
        let image: { name: string } | File = { name: '' };
        if (data.image) {
            image = data.image[0];
        }

        const currentImg = document.querySelector(".currentImg") as HTMLImageElement;

        if (image.name) {
            const imageForm = new FormData();
            imageForm.append("newPicture", image as File);
            const id = product.id
            const imgRes = await editImage({ id, imageForm }) as { data: string };
            const newImgUrl = imgRes.data;
            console.log("Image PUT", newImgUrl);
            setImageUrl(newImgUrl);
        } else if (currentImg.src !== product.imageUrl) {
            const res = await deleteImage(product.id as number);
            setImageUrl(imagePlaceholder);
            console.log("Image DELETE", res);
        }

        const id = product.id
        const response = await editProduct({ id, data }) as { data: IProduct };
        if (!('error' in response)) {
            toast.success('Modified successfully!');
        } else {
            setShowEditModal(false);
            return
        }

        setShowEditModal(false);
    };

    return (
        <Modal showModal={showEditModal} setShowModal={setShowEditModal} >
            <form className="editForm modalContent" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="leftModal">
                        <h2>Modify Item</h2>
                        <TextField
                            sx={inputStyle}
                            type="text"
                            label="Code *"
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                            error={Boolean(errors.code)}
                            helperText={errors.code?.message}
                            {...register('code', { required: 'Code field is required' })}
                        />
                        <TextField
                            sx={inputStyle}
                            type="text"
                            label="Name *"
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName?.message}
                            {...register('fullName', { required: 'Name field is required' })}
                        />
                        <TextField
                            sx={{
                                mb: "20px",
                                width: "100%",
                                ".MuiInputBase-root::after": {
                                    borderBottom: "#000",
                                },
                            }}
                            label="Description"
                            multiline
                            rows={4}
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                            {...register('description')}
                        />
                        <FormControl variant="standard" sx={inputStyle}>
                            <InputLabel focused={false}>Category *</InputLabel>
                            <Select
                                value={option}
                                error={Boolean(errors.categoryId)}
                                {...register('categoryId', {
                                    onChange: (e) => setOption(e.currentTarget.value as string),
                                    required: 'Category field is required'
                                })}>
                                <MenuItem value={option} key={option}>
                                    {product.type}
                                </MenuItem>
                                {categories?.map((c: ICategory) => (
                                    c.type !== product.type &&
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
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                            error={Boolean(errors.quantityForSale)}
                            helperText={errors.quantityForSale?.message}
                            {...register("quantityForSale", {
                                min: {
                                    value: 0,
                                    message: 'You cannot input less than 0'
                                },
                            })}
                        />
                        <TextField
                            sx={inputStyle}
                            type="number"
                            label="Sale Price"
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                            {...register("price", {
                                min: {
                                    value: 0,
                                    message: 'You cannot input less than 0'
                                }
                            })}
                        />
                        <TextField
                            sx={inputStyle}
                            type="number"
                            label="Qty *"
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                },
                            }}
                            error={Boolean(errors.quantity)}
                            helperText={errors.quantity?.message}
                            {...register('quantity', {
                                required: 'Quantity field is required',
                                min: {
                                    value: 0,
                                    message: 'Quantity must be 0 or higher'
                                },
                                validate: value => value as number >= Number(getValues("quantityForSale")) || 'Qty cannot be less than Qty For Sale'
                            })}
                        />
                    </div>
                    <div className="rightModal">
                        <img className="currentImg" src={imageUrl} />
                        <input
                            id="editUploadInput"
                            className="inputImage"
                            accept="image/*"
                            type="file"
                            {...register('image', {
                                onChange: (e) => setImageUrl(uploadImage(e))
                            })}
                        />
                        <div className="uploadDelete">
                            <label htmlFor="editUploadInput" className="uploadImg">
                                Upload
                            </label>
                            <button type='button' className="deleteImg" onClick={() => setImageUrl(imagePlaceholder)}>Remove</button>
                        </div>
                    </div>
                </div>
                <button type="submit">Modify</button>
            </form>
        </Modal>
    );
};


export default EditProductModal;
