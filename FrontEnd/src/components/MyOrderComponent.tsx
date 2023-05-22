import { useRejectOrderMutation } from "../services/ordersService.ts";
import { useState, useRef } from "react";
import { IOrder } from "../types/types.ts";
import { toast } from "react-toastify";
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Popup from "./Popup.tsx";

type MyOrderProps = {
    order: IOrder;
}

const MyOrderComponent = ({ order }: MyOrderProps) => {
    const [rejectOrder, { isLoading }] = useRejectOrderMutation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const currentStatus = useRef(order.status);

    const str = `Are you sure you want to reject this order ?`;

    const onCancel = async () => {
        const response = await rejectOrder(order.id);
        setAnchorEl(null);
        if (!('error' in response)) {
            setTimeout(() => {
                currentStatus.current = "Declined";
            }, 600);
            toast.info('Order declined.');
        }
    }

    return (
        <>
            <Popup string={str} onYes={onCancel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Fade in={true} timeout={1000}>
                <div id={order.id.toString()} className="order" >
                    <span className="nameColumn">{order.productFullName}</span>
                    <div className="firstTwo">
                        <span className="qtyColumn">{order.quantity}</span>
                        <span className="priceColumn">{order.price} BGN</span>
                    </div>
                    <span className="orderDateColumn">{order.date}</span>
                    <div className="orderStatus">
                        <span>{isLoading ? currentStatus.current = 'Rejecting...' : currentStatus.current}</span>
                        {currentStatus.current === "Pending" &&
                            <a className="cancelOrder" onClick={e => setAnchorEl(e.currentTarget)}>
                                <CloseIcon sx={{ fontSize: "large", color: "#ED1C25" }} />
                            </a>}
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default MyOrderComponent;