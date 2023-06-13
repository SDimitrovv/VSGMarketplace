import { AccordionSummary, AccordionDetails, Avatar, Fade, Accordion } from '@mui/material';
import { ILendItem, IUserLentItems } from '../../types/types.ts';
import { useGetLentItemsQuery } from '../../services/lendService.ts';
import { useGetUsersQuery } from '../../utils/userApi.ts';
import LentItemsComponent from './LentItemsComponent.tsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Typography';

const LentItems = () => {
    const { data: lentItems, isLoading } = useGetLentItemsQuery();
    const { data: employees } = useGetUsersQuery();

    return (
        <main id='lendOrdersMain'>
            {lentItems?.length !== 0 && (
                lentItems?.map((userLentItem: IUserLentItems) => (
                    <Fade in={true} timeout={1000} key={userLentItem.email}>
                        <Accordion className='accordion'>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box component='div'>
                                    <Avatar src={employees?.find(e => e.email === userLentItem.email)?.avatar}>{userLentItem.email[0].toUpperCase()}</Avatar>
                                    <span>{employees?.find(e => e.email === userLentItem.email)?.name}</span>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div id='headingSection'>
                                    <span className='codeColumn'>Code</span>
                                    <span className='nameColumn'>Name</span>
                                    <span className='qtyColumn'>QTY</span>
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
