import { Box, Popper, ClickAwayListener, Fade, styled } from "@mui/material";
import { Dispatch, SetStateAction } from 'react';
import { useRef } from "react";

const StyledPopper = styled(Popper)(() => ({
    '&[data-popper-placement*="bottom"] .arrow': {
        top: 0,
        left: 0,
    },
    '&[data-popper-placement*="top"] .arrow': {
        bottom: -2,
        left: 0,
    }
}));

const arrow = {
    position: "absolute",
    "&::before": {
        backgroundColor: "white",
        content: '""',
        display: "block",
        width: 14,
        height: 14,
        transform: "rotate(45deg)",
    }
}

type PopupProps = {
    string: string,
    onYes: () => void,
    anchorEl: HTMLElement | null,
    setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}

const Popup = ({ string, onYes, anchorEl, setAnchorEl }: PopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null);

    const onBuyClose = () => {
        setAnchorEl(null);
    }

    return (
        <StyledPopper
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            placement="bottom"
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
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: true,
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
                <ClickAwayListener onClickAway={onBuyClose}>
                    <Fade {...TransitionProps} timeout={500} >
                        <div className="popup" ref={popupRef}>
                            <Box component="span" className="arrow" sx={arrow} />
                            <p>
                                {string}
                            </p>
                            <div className="buttons">
                                <button className="yes" onClick={onYes}>
                                    Yes
                                </button>
                                <button className="no" onClick={onBuyClose}>
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