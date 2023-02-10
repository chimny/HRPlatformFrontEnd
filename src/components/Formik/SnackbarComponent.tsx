import React from 'react';
import {Snackbar, Alert, AlertColor} from '@mui/material';

interface SnackbarProps {
    open: boolean,
    handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void,
    severityStatus: {
        status: AlertColor,
        message: string
    }
}

export const SnackbarComponent: React.FC<SnackbarProps> = ({open, handleClose, severityStatus}) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severityStatus.status}>
                {severityStatus.message.toString()}
            </Alert>
        </Snackbar>
    );
};
