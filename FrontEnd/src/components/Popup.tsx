import { Box, Popper, ClickAwayListener, Fade, styled } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const StyledPopper = styled(Popper)(() => ({
    "&[data-popper-placement*='bottom'] .arrow": {
        top: 0,
        left: 0,
    },
    "&[data-popper-placement*='top'] .arrow": {
        bottom: -2,
        left: 0,
    }
}));

type PopupProps = {
    popupMessage: string,
    onYes: () => void,
    anchorEl: HTMLElement | null,
    setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}

const Popup = ({ popupMessage, onYes, anchorEl, setAnchorEl }: PopupProps) => {
    return (
        <StyledPopper
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            placement='bottom'
            disablePortal={false}
            transition
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                },
                {
                    name: 'arrow',
                    enabled: true,
                    options: {
                        element: '.arrow'
                    }
                }
            ]}>
            {({ TransitionProps }) => (
                <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                    <Fade {...TransitionProps} timeout={500} >
                        <div className='popup'>
                            <Box component='span' className='arrow' />
                            <p>
                                {popupMessage}
                            </p>
                            <div className='buttons'>
                                <button className='yes' onClick={onYes}>
                                    Yes
                                </button>
                                <button className='no' onClick={() => setAnchorEl(null)}>
                                    No
                                </button>
                            </div>
                        </div>
                    </Fade>
                </ClickAwayListener>
            )}
        </StyledPopper >
    )
}

export default Popup;