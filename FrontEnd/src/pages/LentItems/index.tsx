import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Typography';
import { ILendItem, IUserLentItems } from '../../types/types.ts';
import { useGetLentItemsQuery } from '../../services/lendService.ts';
import LentItemsComponent from './LentItemsComponent.tsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LentItems = () => {
    const { data: lentItems, isLoading } = useGetLentItemsQuery();

    return (
        <main id='lendOrdersMain'>
            {lentItems?.length !== 0 && (
                lentItems?.map((userLentItem: IUserLentItems) => (
                    <Accordion sx={{ width: '100%', mt: 2 }} key={userLentItem.email}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Box component='div'>
                                <img src='/images/profile-image.png' />
                                <span>{userLentItem.email}</span>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div id='headingSection'>
                                <span className='codeColumn'>Code</span>
                                <span className='qtyColumn'>QTY</span>
                                <span className='nameColumn'>Name</span>
                                <span className='startDateColumn'>Start Date</span>
                                <span className='returnColumn'>Return</span>
                            </div>
                            {userLentItem.lentItems?.map((lentItem: ILendItem) => (
                                <LentItemsComponent lentItem={lentItem} key={lentItem.id} />
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
            {(lentItems?.length === 0 || !lentItems) && !isLoading && <div className='lend'>No Items</div>}
            {isLoading && <div className='lend'>Loading...</div>}
        </main>
    );
};

export default LentItems;
