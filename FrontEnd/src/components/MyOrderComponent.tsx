import { rejectOrder } from "../services/itemsService.ts";
import { useState } from "react";
import { IOrder } from "../types/types.ts";
import CloseIcon from '@mui/icons-material/Close';
import Popup from "./Popup.tsx";

type MyOrderProps = {
    order: IOrder;
}

const MyOrderComponent = ({ order }: MyOrderProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleCancel = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const str = `Are you sure you want to reject this order ?`;

    const onCancel = async () => {
        const res = await rejectOrder(order.id);
        console.log(res);
        setAnchorEl(null);
        order.status = "Declined";
    }

    return (
        <>
            <div id={`${order.id}`} className="order" >
                <span className="nameColumn">{order.fullName}</span>
                <div className="firstTwo">
                    <span className="qtyColumn">{order.quantity}</span>
                    <span className="priceColumn">{order.price} BGN</span>
                </div>
                <span className="orderDateColumn">{order.date}</span>
                <div className="orderStatus">
                    <span>{order.status}</span>
                    {order.status === "Pending" &&
                        <a className="cancelOrder" onClick={handleCancel}>
                            <CloseIcon sx={{ fontSize: "large", color: "#ED1C25" }} />
                        </a>}
                </div>
            </div>
            <Popup string={str} onYes={onCancel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
    );
};

export default MyOrderComponent;