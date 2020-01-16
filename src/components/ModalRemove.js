import React, { useState } from 'react'
import { Modal, TextField, Backdrop, Fade, Box, Button, FormGroup, Typography, Card } from '@material-ui/core';
import { Delete, Cancel } from '@material-ui/icons';
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

export default function ModalRemove(props) {
    const styles = useStyles();
    const { open, handleCloseRemove, handleRemove, tool } = props;

    return (
        <Modal
            className={styles.modal}
            open={open}
            onClose={handleCloseRemove}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open} style={{ backgroundColor: '#fff', width: 400, borderRadius: 4 }}>
                <Box>
                    <Box style={{ borderTopRightRadius: 4, borderTopLeftRadius: 4 }} bgcolor="secondary.main" color="background.paper" p="20px" display="flex" alignItems='center'>
                        <Delete style={{ fontSize: 26 }} /><Typography variant="h5">Remove Tool</Typography>
                    </Box>
                    <Box p="30px" display="flex" flexDirection="column">
                        <Typography variant="body1">Are you sure you want to remove {tool.name}?</Typography>
                        <Box display="flex" justifyContent="flex-end" mt="20px">
                            <Button
                                startIcon={<Cancel />}
                                color="secondary"
                                style={{ marginRight: 10 }}
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<Delete />}
                                onClick={() => handleRemove(tool.id)}
                            >
                                <span>Yes, remove</span>
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Fade>
        </Modal>
    )
}