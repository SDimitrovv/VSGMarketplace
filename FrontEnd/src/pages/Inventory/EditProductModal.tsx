import { useDeleteImageMutation, useEditImageMutation } from '../../services/imageService.ts';
import { IFormInputs, ICategory, IProduct, ILocation } from '../../types/types.ts';
import { useState, Dispatch, SetStateAction } from 'react';
import { useEditProductMutation } from '../../services/productsService.ts';
import { useGetCategoriesQuery } from '../../services/categoriesService.ts';
import { useGetLocationQuery } from '../../services/locationsService.ts';
import { imagePlaceholder } from '../../utils/imagePlaceholder.ts';
import { uploadImage } from '../../utils/uploadImage.ts';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.tsx';
import {
    CircularProgress,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

type EditModalProps = {
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    product: IProduct;
    showEditModal: boolean;
    setShowEditModal: Dispatch<SetStateAction<boolean>>;
};

const EditProductModal = ({ setProducts, product, showEditModal, setShowEditModal }: EditModalProps) => {
    const [locationOption, setLocationOption] = useState(product.locationId.toString());
    const [categoryOption, setCategoryOption] = useState(product.categoryId.toString());
    const [imageUrl, setImageUrl] = useState(product.imageUrl || imagePlaceholder);
    const [editProduct] = useEditProductMutation();
    const [editImage] = useEditImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    const { data: categories } = useGetCategoriesQuery();
    const { data: locations } = useGetLocationQuery();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues
    } = useForm<IFormInputs>({
        defaultValues: {
            code: product.code,
            fullName: product.fullName,
            description: product.description,
            categoryId: product.categoryId,
            locationId: product.locationId,
            quantityForSale: product.quantityForSale || null,
            quantityForLend: product.quantityForLend || null,
            price: product.price || null,
            quantity: product.quantity,
            image: null
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: IFormInputs) => {
        const image: { name: string } | File = data.image ? data.image[0] : { name: '' };
        data.quantityForSale = data.quantityForSale || 0;
        data.quantityForLend = data.quantityForLend || 0;
        data.price = data.price || 0;

        const selectedCategory = categories?.filter(c => data.categoryId === c.id)[0] as ICategory;
        const selectedCity = locations?.filter(l => data.locationId === l.id)[0] as ILocation;
        const id = product.id;

        if (image.name) {
            const imageForm = new FormData();
            imageForm.append('newPicture', image as File);
            const imgRes = await editImage({ id, imageForm }) as { data: string };
            const newImgUrl = imgRes.data;
            setImageUrl(newImgUrl);
            const editedProduct = { ...data, id: id, type: selectedCategory.type, city: selectedCity.city, imageUrl: newImgUrl } as IProduct;
            setProducts(oldProducts => oldProducts.map(p => p.id === editedProduct.id ? editedProduct : p));
        } else if (imageUrl === imagePlaceholder) {
            await deleteImage(id);
        }

        const response = await editProduct({ id, data }) as { data: IProduct };

        if ('error' in response) {
            return
        } else {
            toast.success('Modified successfully!');
        }

        const editedProduct = { ...data, id: id, type: selectedCategory.type, city: selectedCity.city } as IProduct;
        setProducts(oldProducts => oldProducts.map(p => p.id === editedProduct.id ? editedProduct : p));
        setShowEditModal(false);
    };

    return (
        <Modal showModal={showEditModal} setShowModal={setShowEditModal} >
            <form className='modalContent' onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='leftModal'>
                        <h2>Modify Item</h2>
                        <TextField
                            className='formInput'
                            type='text'
                            label='Code *'
                            variant='standard'
                            error={Boolean(errors.code)}
                            helperText={errors.code?.message}
                            {...register('code', { required: 'Code field is required' })}
                        />
                        <TextField
                            className='formInput'
                            type='text'
                            label='Name *'
                            variant='standard'
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName?.message}
                            {...register('fullName', { required: 'Name field is required' })}
                        />
                        <TextField
                            className='description'
                            label='Description'
                            multiline
                            rows={4}
                            variant='standard'
                            {...register('description')}
                        />
                        <FormControl variant='standard' className='formInput'>
                            <InputLabel focused={false}>Category *</InputLabel>
                            <Select
                                value={categoryOption}
                                {...register('categoryId', {
                                    onChange: (e) => setCategoryOption(e.target.value),
                                    required: 'Category field is required',
                                })}
                            >
                                <MenuItem value={categoryOption} key={categoryOption}>
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
                        <FormControl variant='standard' className='formInput'>
                            <InputLabel focused={false}>Location *</InputLabel>
                            <Select
                                value={locationOption}
                                {...register('locationId', {
                                    onChange: (e) => setLocationOption(e.target.value),
                                    required: 'Location field is required',
                                })}
                            >
                                {locations?.map((l: ILocation) => (
                                    <MenuItem value={l.id} key={l.id}>
                                        {l.city}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            className='formInput'
                            type='number'
                            label='Qty For Sale'
                            variant='standard'
                            error={Boolean(errors.quantityForSale)}
                            helperText={errors.quantityForSale?.message}
                            {...register('quantityForSale', {
                                min: {
                                    value: 0,
                                    message: 'You cannot input less than 0'
                                },
                            })}
                        />
                        <TextField
                            className='formInput'
                            type='number'
                            label='Qty For Lend'
                            variant='standard'
                            error={Boolean(errors.quantityForLend)}
                            helperText={errors.quantityForLend?.message}
                            {...register('quantityForLend', {
                                min: {
                                    value: 0,
                                    message: 'You cannot input less than 0'
                                },
                            })}
                        />
                        <TextField
                            className='formInput'
                            type='number'
                            label='Sale Price'
                            variant='standard'
                            {...register('price', {
                                min: {
                                    value: 0,
                                    message: 'You cannot input less than 0'
                                }
                            })}
                        />
                        <TextField
                            className='formInput'
                            type='number'
                            label='Qty *'
                            variant='standard'
                            error={Boolean(errors.quantity)}
                            helperText={errors.quantity?.message}
                            {...register('quantity', {
                                required: 'Quantity field is required',
                                min: {
                                    value: 0,
                                    message: 'Quantity must be 0 or higher'
                                },
                                validate: value =>
                                    value as number >= Number(getValues('quantityForSale')) + Number(getValues('quantityForLend'))
                                    || 'Qty cannot be less than Qty For Sale + Qty For Lend'
                            })}
                        />
                    </div>
                    <div className='rightModal'>
                        <img className='currentImg' src={imageUrl} />
                        <input
                            id='editUploadInput'
                            className='inputImage'
                            accept='image/*'
                            type='file'
                            {...register('image', {
                                onChange: (e) => setImageUrl(uploadImage(e))
                            })}
                        />
                        <div className='uploadDelete'>
                            <label htmlFor='editUploadInput' className='uploadImg'>
                                Upload
                            </label>
                            <button type='button' className='deleteImg' onClick={() => setImageUrl(imagePlaceholder)}>Remove</button>
                        </div>
                    </div>
                </div>
                {isSubmitting
                    ? <CircularProgress className='circular' />
                    : <button type='submit'>Modify</button>
                }
            </form>
        </Modal>
    );
};


export default EditProductModal;
