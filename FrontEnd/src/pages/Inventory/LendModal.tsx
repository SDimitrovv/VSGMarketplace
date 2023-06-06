import { Dispatch, SetStateAction } from 'react';
import { useCreateLendMutation } from '../../services/lendService.ts';
import { ILendInputs, IProduct } from '../../types/types.ts';
import { useForm, Controller } from 'react-hook-form';
import { imagePlaceholder } from '../../utils/imagePlaceholder.ts';
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

type LendModalProps = {
    product: IProduct;
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    showLendModal: boolean;
    setShowLendModal: Dispatch<SetStateAction<boolean>>;
};

const LendModal = ({
    product,
    setProducts,
    showLendModal,
    setShowLendModal,
}: LendModalProps) => {
    const [createLend] = useCreateLendMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm<ILendInputs>({
        defaultValues: {
            email: '',
            quantity: null,
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: ILendInputs): Promise<void> => {
        const response = await createLend({ productId: product.id, ...data });
        if ('data' in response) {
            setProducts(oldProducts => oldProducts.map(p =>
                p.id === product.id
                    ? { ...p, quantityForLend: (p.quantityForLend as number) - (data.quantity as number), quantity: (p.quantity as number) - (data.quantity as number) }
                    : p)
            );
            toast.success('Lent successfully!');
            setShowLendModal(false);
            reset();
        }
    };

    return (
        <Modal showModal={showLendModal} setShowModal={setShowLendModal}>
            <form className='modalContent' onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='leftModal'>
                        <h2>Lend Item</h2>
                        <TextField
                            className='formInput'
                            type='text'
                            label='Email *'
                            variant='standard'
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                            {...register('email', { required: 'Email field is required' })}
                        />
                        <Controller
                            control={control}
                            name='quantity'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Quantity field is required'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <FormControl variant='standard' className='formInput'>
                                    <InputLabel focused={false}>Quantity *</InputLabel>
                                    <Select
                                        value={value || ''}
                                        error={Boolean(errors.quantity)}
                                        onChange={onChange}
                                    >
                                        {Array(product.quantityForLend).fill(1).map((n, i) => n + i).map((o) => (
                                            <MenuItem value={o} key={o}>
                                                {o}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>
                                        {errors.quantity && errors.quantity.message}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className='rightModal'>
                        <img className='currentImg' src={product.imageUrl || imagePlaceholder} />
                    </div>
                </div>
                {isSubmitting
                    ? <CircularProgress className='circular' />
                    : <button type='submit'>Lend</button>
                }
            </form>
        </Modal >
    );
};

export default LendModal;
