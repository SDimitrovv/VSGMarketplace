import { Dialog, IconButton, Slide } from '@mui/material';
import { Dispatch, SetStateAction, forwardRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

    return (
        <Dialog
            open={showModal}
            TransitionComponent={Transition}
            onClose={() => setShowModal(false)}
            PaperProps={{ sx: modalStyle }}>
            <IconButton onClick={() => setShowModal(false)} sx={{ position: 'absolute', right: 0, top: 0 }}>
                <CloseIcon sx={{ color: '#000' }} />
            </IconButton>
            {children}
        </Dialog >
    );
};

export default Modal;