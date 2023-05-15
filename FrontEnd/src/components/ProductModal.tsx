import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Slide, Dialog } from '@mui/material';
import { useState, forwardRef } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { IProduct } from "../types/types";

const modalStyle = {
    borderRadius: "20px",
    margin: 0,
    width: "fit-content",
    maxHeight: "740px",
    maxWidth: "600px",
    "@media screen and (max-width: 768px)": {
        maxHeight: "96%",
        maxWidth: "94%",
    }
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type CardComponentProps = {
    product: IProduct;
    onClose: () => void;
}

const ProductModal = ({ product, onClose }: CardComponentProps) => {
    const [open, setOpen] = useState(true);
    if (!open) {
        setTimeout(() => {
            onClose();
        }, 100)
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
            PaperProps={{ sx: { ...modalStyle } }}
            aria-describedby="alert-dialog-slide-description"
        >
            <div id="productModal" className="modalContent" >
                <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 0, top: 0 }}>
                    <CloseIcon sx={{ color: '#000' }} />
                </IconButton>
                <img id="modalImage" src={product.imageUrl} />
                <div id="modalFrameOne">
                    <div id="modalFrameTwo">
                        <div id="productName">
                            <b>{product.fullName}</b>
                            <small>{product.type}</small>
                        </div>
                        <div id="priceAndQty">
                            <b>{product.price} BGN</b>
                            <small>Qty: {product.quantityForSale}</small>
                        </div>
                    </div>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        </Dialog>
    );
};

export default ProductModal;