import { ILendItem } from '../../types/types.ts';
import { Fade } from '@mui/material';

type MyItemProps = {
    lentItem: ILendItem;
}

const MyItemComponent = ({ lentItem }: MyItemProps) => {
    return (
        <Fade in={true} timeout={1000}>
            <div className='lend' role='cell'>
                <span className='nameColumn'>{lentItem.productFullName}</span>
                <span className='qtyColumn'>{lentItem.quantity}</span>
                <span className='startDateColumn'>{lentItem.startDate}</span>
                <span className='returnColumn'>{lentItem.endDate || 'Not Returned'}</span>
            </div>
        </Fade>
    );
};

export default MyItemComponent;