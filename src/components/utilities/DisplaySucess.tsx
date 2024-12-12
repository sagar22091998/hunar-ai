import { Alert, Snackbar } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface IProp {
    message: string;
}

export type DisplaySuccessHandle = {
    displaySuccess: () => void;
};

const DisplaySuccess: React.ForwardRefRenderFunction<
    DisplaySuccessHandle,
    IProp
> = (props, ref) => {
    const [showSuccess, setShowSuccess] = useState(false);

    useImperativeHandle(ref, () => ({
        displaySuccess,
    }));

    const displaySuccess = () => {
        setShowSuccess(!showSuccess);
    };
    return (
        <Snackbar
            open={showSuccess}
            autoHideDuration={2000}
            onClose={displaySuccess}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert variant='filled' severity='success'>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default forwardRef(DisplaySuccess);
