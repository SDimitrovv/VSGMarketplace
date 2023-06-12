import { ICategory, IFormInputs, ILocation, IProduct } from '../../types/types.ts';
import { useState, Dispatch, SetStateAction } from 'react';
import { useCreateProductMutation } from '../../services/productsService.ts';
import { useCreateImageMutation } from '../../services/imageService.ts';
import { useGetCategoriesQuery } from '../../services/categoriesService.ts';
import { useGetLocationQuery } from '../../services/locationsService.ts';
import { useForm, Controller } from 'react-hook-form';
import { imagePlaceholder } from '../../utils/imagePlaceholder.ts';
import { uploadImage } from '../../utils/uploadImage.ts';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.tsx';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    FormHelperText,
} from '@mui/material';

type AddModalProps = {
    products: IProduct[] | undefined;
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
    const { data: locations } = useGetLocationQuery();
    const [imageUrl, setImageUrl] = useState(imagePlaceholder);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        reset,
        control
    } = useForm<IFormInputs>({
        defaultValues: {
            code: '',
            fullName: '',
            description: '',
            categoryId: '',
            locationId: '',
            quantityForSale: null,
            quantityForLend: null,
            price: null,
            quantity: null,
            image: null,
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: IFormInputs): Promise<void> => {
        const image: { name: string } | File = data.image ? data.image[0] : { name: '' };
        data.quantityForSale = data.quantityForSale || 0;
        data.quantityForLend = data.quantityForLend || 0;
        data.price = data.price || 0;

        const response = await createProduct(data) as { data: IProduct };
        if ('error' in response) {
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
                        <Controller
                            control={control}
                            name='categoryId'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Category field is required'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <FormControl variant='standard' className='formInput'>
                                    <InputLabel htmlFor='categoryId' focused={false}>Category *</InputLabel>
                                    <Select
                                        value={value}
                                        error={Boolean(errors.categoryId)}
                                        onChange={onChange}
                                        inputProps={{
                                            id: 'categoryId'
                                        }}
                                    >
                                        {categories?.map((c: ICategory) => (
                                            <MenuItem value={c.id} key={c.id}>
                                                {c.type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>
                                        {errors.categoryId && errors.categoryId.message}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name='locationId'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Location field is required'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <FormControl variant='standard' className='formInput'>
                                    <InputLabel htmlFor='locationId' focused={false}>Location *</InputLabel>
                                    <Select
                                        value={value}
                                        error={Boolean(errors.locationId)}
                                        onChange={onChange}
                                        inputProps={{
                                            id: 'locationId'
                                        }}
                                    >
                                        {locations?.map((l: ILocation) => (
                                            <MenuItem value={l.id} key={l.id}>
                                                {l.city}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>
                                        {errors.locationId && errors.locationId.message}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        />
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
                                validate: value =>
                                    value as number >= Number(getValues('quantityForSale')) + Number(getValues('quantityForLend'))
                                    || 'Qty cannot be less than Qty For Sale + Qty For Lend'
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
        </Modal >
    );
};

export default AddProductModal;
