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
    const [createProduct] = useCreateProductMutation();
    const [createImage] = useCreateImageMutation();
    const { data: categories } = useGetCategoriesQuery();
    const [imageUrl, setImageUrl] = useState(imagePlaceholder);
    const [option, setOption] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
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
        mode: 'all'
    });

    const onSubmit = async (data: IFormInputs): Promise<void> => {
        let image: { name: string } | File = { name: "" };
        if (data.image) {
            image = data.image[0];
        }

        const response = await createProduct(data) as { data: IProduct };
        const responseData = response.data;
        console.log("POST", responseData);
        if (image.name) {
            const imageForm = new FormData();
            imageForm.set("picture", image as File);
            const id = responseData.id
            const imgRes = await createImage({ id, imageForm }) as { data: string };
            const newImgUrl = imgRes.data;
            console.log("Image POST", newImgUrl);
            const newProduct = { ...responseData, imageUrl: newImgUrl }
            setProducts((oldProducts) => [...oldProducts, newProduct]);
        } else {
            setProducts((oldProducts) => [...oldProducts, { ...responseData }]);
        }

        setShowAddModal(false);
    };

    return (
        <Modal showModal={showAddModal} setShowModal={setShowAddModal}>
            <form className="addForm modalContent" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="leftModal">
                        <h2>Add New Item</h2>
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
                            {...register("code", { required: "Code field is required" })}
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
                        <FormControl variant="standard" sx={inputStyle}>
                            <InputLabel focused={false}>Category *</InputLabel>
                            <Select
                                value={option}
                                error={Boolean(errors.categoryId)}
                                {...register("categoryId", {
                                    onChange: (e) => setOption(e.target.value as string),
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
                                }
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
                                onChange: (e) => setImageUrl(uploadImage(e)),
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
                <button type="submit">Add</button>
            </form>
        </Modal>
    );
};

export default AddProductModal;
