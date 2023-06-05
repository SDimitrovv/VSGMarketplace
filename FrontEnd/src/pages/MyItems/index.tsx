import { useGetMyLentItemsQuery } from '../../services/lendService.ts';
import { ILendItem } from '../../types/types.ts';
import MyItemComponent from './MyItemComponent.tsx';

const MyItems = () => {
    const { data: myLentItems, isLoading } = useGetMyLentItemsQuery();

    return (
        <main id='myItemsMain'>
            <div id='headingSection'>
                <span className='nameColumn'>Name</span>
                <span className='qtyColumn'>QTY</span>
                <span className='startDateColumn'>Start Date</span>
                <span className='returnColumn'>End Date</span>
            </div>
            {myLentItems?.length !== 0 && (
                myLentItems?.map((lentItem: ILendItem) => (
                    <MyItemComponent lentItem={lentItem} key={lentItem.id} />
                ))
            )}
            {(myLentItems?.length === 0 || !myLentItems) && !isLoading && <div className='lend'>No Items</div>}
            {isLoading && <div className='lend'>Loading...</div>}
        </main>
    );
};

export default MyItems;
