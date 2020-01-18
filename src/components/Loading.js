import React from 'react'
import { Modal, Backdrop, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginBottom: 20
    }
});

export default function Loading(props) {
    const styles = useStyles();
    const { loading } = props;

    return (
        <Modal
            className={styles.modal}
            open={loading}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >

            <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                justifyContent='center'
                padding='10px'
                style={{ backgroundColor: '#fff', borderRadius: 4 }}>
                <CircularProgress />
            </Box>
        </Modal>
    )
}