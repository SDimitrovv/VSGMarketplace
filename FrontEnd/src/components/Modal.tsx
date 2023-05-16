import { Fade, Dialog, IconButton } from '@mui/material';
import { Dispatch, SetStateAction, forwardRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const modalStyle = {
    borderRadius: "20px",
    margin: 0,
    width: "92%",
    maxHeight: "740px",
    "@media screen and (max-width: 768px)": {
        maxHeight: "96%",
    }
}

type ModalProps = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    children: JSX.Element;
    modalType?: string;
}

const Modal = ({ showModal, setShowModal, children, modalType }: ModalProps) => {
    if (modalType === 'productModal') {
        modalStyle.width = "fit-content";
    } else {
        modalStyle.width = "92%";
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <Dialog
            open={showModal}
            TransitionComponent={Fade}
            transitionDuration={300}
            keepMounted
            onClose={handleClose}
            PaperProps={{ sx: { ...modalStyle } }}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
                <CloseIcon sx={{ color: '#000' }} />
            </IconButton>
            {children}
        </Dialog>
    );
};

export default Modal;