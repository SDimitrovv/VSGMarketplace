import { ILendItem, IUserLentItems } from '../../types/types.ts';
import { useGetLentItemsQuery } from '../../services/lendService.ts';
import { Fade } from '@mui/material';
import LentItemsComponent from './LentItemsComponent.tsx';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Typography';

const LentItems = () => {
    const { data: lentItems, isLoading } = useGetLentItemsQuery();

    return (
        <main id='lendOrdersMain'>
            {lentItems?.length !== 0 && (
                lentItems?.map((userLentItem: IUserLentItems) => (
                    <Fade in={true} timeout={1000} key={userLentItem.email}>
                        <Accordion className='accordion'>
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
                                    <span className='returnColumn'>Returned</span>
                                </div>
                                {userLentItem.lentItems?.map((lentItem: ILendItem) => (
                                    <LentItemsComponent lentItem={lentItem} key={lentItem.id} />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Fade>
                ))
            )}
            {(lentItems?.length === 0 || !lentItems) && !isLoading && <div className='lend'>No Items</div>}
            {isLoading && <div className='lend'>Loading...</div>}
        </main>
    );
};

export default LentItems;
