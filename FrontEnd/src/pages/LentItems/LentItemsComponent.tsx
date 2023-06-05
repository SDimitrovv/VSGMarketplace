import { useCompleteLendMutation } from '../../services/lendService';
import { ILendItem } from '../../types/types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Fade } from '@mui/material';

type LentItemProps = {
    lentItem: ILendItem;
}

const LentItemsComponent = ({ lentItem }: LentItemProps) => {
    const [completeOrder] = useCompleteLendMutation();
    const [returnStatus, setReturnStatus] = useState<string>(lentItem.endDate);

    const onReturn = async () => {
        const response = await completeOrder(lentItem.id);
        if ('error' in response) {
            return;
        }

        setReturnStatus('Just Now');
        toast.success('Item returned!');
    }

    return (
        <Fade in={true} timeout={1000}>
            <div className='lend' id={lentItem.id.toString()} role='cell'>
                <div className='firstTwo'>
                    <span className='codeColumn'>{lentItem.productCode}</span>
                    <span className='qtyColumn'>{lentItem.quantity}</span>
                </div>
                <span className='nameColumn'>{lentItem.productFullName}</span>
                <span className='startDateColumn'>{lentItem.startDate}</span>
                {returnStatus
                    ? <span className='returnColumn'>{returnStatus}</span>
                    : <button className='returnButton' onClick={onReturn}>Return</button>}
            </div >
        </Fade>
    );
};

export default LentItemsComponent;