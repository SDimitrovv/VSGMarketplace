import { useRef, useState } from "react";
import { Box, Popper, ClickAwayListener } from "@mui/material";
import { Dispatch, SetStateAction } from 'react';

const arrow = {
    position: "relative",
    "&::before": {
        backgroundColor: "white",
        content: '""',
        display: "block",
        position: "absolute",
        mt: "4px",
        width: 14,
        height: 14,
        top: "-22px",
        transform: "rotate(45deg)",
        left: "-7px",
        zIndex: 99
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
    const [opacity, setOpacity] = useState(0);
    setTimeout(() => {
        setOpacity(1);
    }, 300);

    if (popupRef.current) {
        popupRef.current.style.opacity = `${opacity}`;
    }

    const onBuyClose = () => {
        setOpacity(0);
        setTimeout(() => {
            setAnchorEl(null);
        }, 300);
    }

    return (
        <Popper
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            placement="bottom"
            disablePortal={false}
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
            <ClickAwayListener onClickAway={onBuyClose}>
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
            </ClickAwayListener>
        </Popper >
    )
}

export default Popup;