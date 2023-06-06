import { useCompleteLendMutation } from '../../services/lendService';
import { ILendItem } from '../../types/types';
import { useState } from 'react';
import { toast } from 'react-toastify';

type LentItemProps = {
    lentItem: ILendItem;
}

const LentItemsComponent = ({ lentItem }: LentItemProps) => {
    const [completeOrder] = useCompleteLendMutation();
    const [returnStatus, setReturnStatus] = useState<string>(lentItem.endDate);

    const onReturn = async () => {
        const response = await completeOrder(lentItem.id);
        if ('data' in response) {
            toast.success('Item returned!');
            setReturnStatus(response.data);
        }
    }

    return (
        <div className='lend' role='cell'>
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
    );
};

export default LentItemsComponent;