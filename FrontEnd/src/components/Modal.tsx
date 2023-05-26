import { Dispatch, SetStateAction, forwardRef } from 'react';
import { Dialog, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const modalStyle = {
    width: "92%",
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
            <IconButton className='closeIcon' onClick={() => setShowModal(false)}>
                <CloseIcon />
            </IconButton>
            {children}
        </Dialog >
    );
};

export default Modal;