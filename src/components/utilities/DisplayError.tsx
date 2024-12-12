import { Alert, Snackbar } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface IProp {
    message: string;
}

export type DisplayErrorHandle = {
    displayError: () => void;
};

const DisplayError: React.ForwardRefRenderFunction<
    DisplayErrorHandle,
    IProp
> = (props, ref) => {
    const [showError, setShowError] = useState(false);

    useImperativeHandle(ref, () => ({
        displayError,
    }));

    const displayError = () => {
        setShowError(!showError);
    };
    return (
        <Snackbar
            open={showError}
            autoHideDuration={3000}
            onClose={displayError}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert variant='filled' severity='error'>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default forwardRef(DisplayError);
