import { useState, Dispatch, SetStateAction } from 'react';
import { useCreateLendMutation } from '../../services/lendService.ts';
import { ILendInputs, IProduct } from '../../types/types.ts';
import { imagePlaceholder } from '../../utils/imagePlaceholder.ts';
import { useForm } from 'react-hook-form';
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
    showLendModal,
    setShowLendModal,
}: LendModalProps) => {
    const [selectOption, setSelectOption] = useState('');
    const [createLend] = useCreateLendMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch
    } = useForm<ILendInputs>({
        defaultValues: {
            email: '',
            quantity: null,
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: ILendInputs): Promise<void> => {
        const response = await createLend({ productId: product.id, quantity: data.quantity, email: data.email });
        if ('error' in response) {
            setShowLendModal(false);
            return;
        }

        setSelectOption('');
        toast.success('Lent successfully!');
        setShowLendModal(false);
        reset();
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
                            {...register('email', { required: 'Name field is required' })}
                        />
                        <FormControl variant='standard' className='formInput'>
                            <InputLabel focused={false}>Qty For Lend *</InputLabel>
                            <Select
                                value={selectOption}
                                error={(Boolean(errors.quantity) && Boolean(errors.quantity?.message))}
                                {...register('quantity', {
                                    onChange: (e) => setSelectOption(e.target.value),
                                    required: 'Qty For Lend field is required',
                                })}
                            >
                                {Array(product.quantityForLend).fill(1).map((n, i) => n + i).map((o) => (
                                    <MenuItem value={o} key={o}>
                                        {o}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error>
                                {watch('quantity') === null && errors.quantity?.message ? errors.quantity?.message : ''}
                            </FormHelperText>
                        </FormControl>
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
        </Modal>
    );
};

export default LendModal;
