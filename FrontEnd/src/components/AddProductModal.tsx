import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import { useState, Dispatch, SetStateAction } from "react";
import { useCreateProductMutation } from "../services/productsService.ts";
import { useCreateImageMutation } from "../services/imageService.ts";
import { useGetCategoriesQuery } from "../services/categoriesService.ts";
import { ICategory, IFormInputs, IProduct } from "../types/types.ts";
import { imagePlaceholder } from "../utils/imagePlaceholder.ts";
import { uploadImage } from "../utils/uploadImage.ts";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Modal from "./Modal.tsx";

type AddModalProps = {
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    showAddModal: boolean;
    setShowAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddProductModal = ({
    setProducts,
    showAddModal,
    setShowAddModal,
}: AddModalProps) => {
    const [createProduct, { isLoading: fetchingProduct }] = useCreateProductMutation();
    const [createImage, { isLoading: fetchingImage }] = useCreateImageMutation();
    const { data: categories } = useGetCategoriesQuery();
    const [imageUrl, setImageUrl] = useState(imagePlaceholder);
    const [option, setOption] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset
    } = useForm<IFormInputs>({
        defaultValues: {
            code: "",
            fullName: "",
            description: "",
            categoryId: null,
            quantityForSale: null,
            price: null,
            quantity: null,
            image: null,
        },
        mode: 'all',
    });

    const onSubmit = async (data: IFormInputs): Promise<void> => {
        const image: { name: string } | File = data.image ? data.image[0] : { name: '' };
        data.quantityForSale = data.quantityForSale || null;
        data.price = data.price || null;

        const response = await createProduct(data) as { data: IProduct };
        if ('error' in response) {
            setShowAddModal(false);
            return
        }

        const responseData = response.data;
        const selectedCategory = categories?.filter(c => data.categoryId === c.id)[0] as ICategory;

        if (image.name) {
            const imageForm = new FormData();
            imageForm.set("picture", image as File);
            const id = responseData.id
            const imgRes = await createImage({ id, imageForm }) as { data: string };
            const newImgUrl = imgRes.data;
            console.log("Image POST", newImgUrl);
            const newProduct = { ...responseData, imageUrl: newImgUrl, type: selectedCategory.type }
            setProducts((oldProducts) => [...oldProducts, newProduct]);
        } else {
            const newProduct = { ...responseData, type: selectedCategory.type }
            setProducts((oldProducts) => [...oldProducts, newProduct]);
        }

        setOption('');
        toast.success('Created successfully!');
        setShowAddModal(false);
        setImageUrl(imagePlaceholder);
        reset();
    };

    return (
        <Modal showModal={showAddModal} setShowModal={setShowAddModal}>
            <form className="addForm modalContent" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="leftModal">
                        <h2>Add New Item</h2>
                        <TextField
                            className='formInput'
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
                            {...register("code", { required: "Code field is required" })}
                        />
                        <TextField
                            className='formInput'
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
                            {...register("fullName", { required: "Name field is required" })}
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
                            {...register("description")}
                        />
                        <FormControl variant="standard" className='formInput'>
                            <InputLabel focused={false}>Category *</InputLabel>
                            <Select
                                value={option}
                                error={Boolean(errors.categoryId)}
                                {...register("categoryId", {
                                    onChange: (e) => setOption(e.target.value),
                                    required: "Category field is required",
                                })}
                            >
                                {categories?.map((c: ICategory) => (
                                    <MenuItem value={c.id} key={c.id}>
                                        {c.type}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error>
                                {errors.categoryId?.message}
                            </FormHelperText>
                        </FormControl>
                        <TextField
                            className='formInput'
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
                            className='formInput'
                            type="number"
                            label="Sale Price"
                            variant="standard"
                            InputLabelProps={{
                                style: {
                                    color: "#9A9A9A",
                                }
                            }}
                            error={Boolean(errors.price)}
                            helperText={errors.price?.message}
                            {...register("price", {
                                min: {
                                    value: 0,
                                    message: 'You cannot input less than 0'
                                }
                            })}
                        />
                        <TextField
                            className='formInput'
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
                                validate: value => value as number >= Number(getValues("quantityForSale")) || 'Qty For Sale cannot be higher than Qty'
                            })}
                        />
                    </div>
                    <div className="rightModal">
                        <img className="currentImg" src={imageUrl} />
                        <input
                            id="uploadInput"
                            className="inputImage"
                            accept="image/*"
                            type="file"
                            {...register("image", {
                                onChange: (e) => setImageUrl(uploadImage(e))
                            })}
                        />
                        <div className="uploadDelete">
                            <label htmlFor="uploadInput" className="uploadImg">
                                Upload
                            </label>
                            <button type='button' className="deleteImg" onClick={() => setImageUrl(imagePlaceholder)}>Remove</button>
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={fetchingProduct || fetchingImage}>{(fetchingProduct || fetchingImage) ? 'Submitting...' : 'Add'}</button>
            </form>
        </Modal>
    );
};

export default AddProductModal;
