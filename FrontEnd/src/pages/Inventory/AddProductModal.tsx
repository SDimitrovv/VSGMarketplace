import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    FormHelperText,
} from '@mui/material';
import { ICategory, IFormInputs, ILocation, IProduct } from '../../types/types.ts';
import { useState, Dispatch, SetStateAction } from 'react';
import { useCreateProductMutation } from '../../services/productsService.ts';
import { useCreateImageMutation } from '../../services/imageService.ts';
import { useGetCategoriesQuery } from '../../services/categoriesService.ts';
import { useGetLocationQuery } from '../../services/locationsService.ts';
import { imagePlaceholder } from '../../utils/imagePlaceholder.ts';
import { uploadImage } from '../../utils/uploadImage.ts';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.tsx';

type AddModalProps = {
    products: IProduct[] | undefined;
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    showAddModal: boolean;
    setShowAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddProductModal = ({
    //products,
    setProducts,
    showAddModal,
    setShowAddModal,
}: AddModalProps) => {
    const [createProduct] = useCreateProductMutation();
    const [createImage] = useCreateImageMutation();
    const { data: categories } = useGetCategoriesQuery();
    const { data: locations } = useGetLocationQuery();
    const [imageUrl, setImageUrl] = useState(imagePlaceholder);
    const [selectOption, setSelectOption] = useState('');
    const [locationOption, setLocationOption] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        reset,
        watch
    } = useForm<IFormInputs>({
        defaultValues: {
            code: '',
            fullName: '',
            description: '',
            categoryId: null,
            locationId: null,
            quantityForSale: null,
            price: null,
            quantity: null,
            image: null,
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: IFormInputs): Promise<void> => {
        const image: { name: string } | File = data.image ? data.image[0] : { name: '' };
        data.quantityForSale = data.quantityForSale || null;
        data.price = data.price || null;

        const response = await createProduct(data) as { data: IProduct };
        if ('error' in response) {
            setShowAddModal(false);
            return;
        }

        const responseData = response.data;
        const selectedCategory = categories?.filter(c => data.categoryId === c.id)[0] as ICategory;
        const selectedCity = locations?.filter(l => data.locationId === l.id)[0] as ILocation;
        const id = responseData.id;

        if (image.name) {
            const imageForm = new FormData();
            imageForm.set('picture', image as File);
            const imgRes = await createImage({ id, imageForm }) as { data: string };
            const newImgUrl = imgRes.data;
            const newProduct = { ...data, id: id, type: selectedCategory.type, city: selectedCity.city, imageUrl: newImgUrl } as IProduct;
            setProducts((oldProducts) => [...oldProducts, newProduct]);
        } else {
            const newProduct = { ...data, id: id, type: selectedCategory.type, city: selectedCity.city } as IProduct;
            setProducts((oldProducts) => [...oldProducts, newProduct]);
        }

        setSelectOption('');
        setLocationOption('');
        toast.success('Created successfully!');
        setShowAddModal(false);
        setImageUrl(imagePlaceholder);
        reset();
    };

    return (
        <Modal showModal={showAddModal} setShowModal={setShowAddModal}>
            <form className='modalContent' onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='leftModal'>
                        <h2>Add New Item</h2>
                        <TextField
                            className='formInput'
                            type='text'
                            label='Code *'
                            variant='standard'
                            error={Boolean(errors.code)}
                            helperText={errors.code?.message}
                            {...register('code', {
                                required: 'Code field is required',
                                // validate: value => products ? products.some(p => p.code !== value) : false || 'Code already exists'
                            })}
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
                                value={selectOption}
                                error={(Boolean(errors.categoryId) && Boolean(errors.categoryId?.message))}
                                {...register('categoryId', {
                                    onChange: (e) => setSelectOption(e.target.value),
                                    required: 'Category field is required',
                                })}
                            >
                                {categories?.map((c: ICategory) => (
                                    <MenuItem value={c.id} key={c.id}>
                                        {c.type}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error>
                                {watch('categoryId') === null && errors.categoryId?.message ? errors.categoryId?.message : ''}
                            </FormHelperText>
                        </FormControl>
                        <FormControl variant='standard' className='formInput'>
                            <InputLabel focused={false}>Location *</InputLabel>
                            <Select
                                value={locationOption}
                                error={Boolean(errors.locationId)}
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
                            <FormHelperText error>
                                {watch('locationId') === null && errors.locationId?.message ? errors.locationId?.message : ''}
                            </FormHelperText>
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
                            label='Sale Price'
                            variant='standard'
                            error={Boolean(errors.price)}
                            helperText={errors.price?.message}
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
                                validate: value => value as number >= Number(getValues('quantityForSale')) || 'Qty For Sale cannot be higher than Qty'
                            })}
                        />
                    </div>
                    <div className='rightModal'>
                        <img className='currentImg' src={imageUrl} />
                        <input
                            id='uploadInput'
                            className='inputImage'
                            accept='image/*'
                            type='file'
                            {...register('image', {
                                onChange: (e) => setImageUrl(uploadImage(e))
                            })}
                        />
                        <div className='uploadDelete'>
                            <label htmlFor='uploadInput' className='uploadImg'>
                                Upload
                            </label>
                            <button type='button' className='deleteImg' onClick={() => setImageUrl(imagePlaceholder)}>Remove</button>
                        </div>
                    </div>
                </div>
                {isSubmitting
                    ? <CircularProgress className='circular' />
                    : <button type='submit'>Add</button>
                }
            </form>
        </Modal>
    );
};

export default AddProductModal;
