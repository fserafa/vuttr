import React, { useState } from 'react'
import { Modal, TextField, Backdrop, Fade, Box, Button, FormGroup, Typography, Card } from '@material-ui/core';
import { Add, Cancel } from '@material-ui/icons';
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

export default function ModalAdd(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);

    const styles = useStyles();
    const { open, handleCloseAdd, handleAdd } = props;

    function handleSubmit(e) {
        e.preventDefault()

        let tool = {
            name: name,
            link: link,
            description: description,
            tags: tags.split(' ')
        };

        handleAdd(tool);
        setName('');
        setLink('');
        setDescription('');
        setTags('');
    }

    return (
        <Modal
            className={styles.modal}
            open={open}
            onClose={handleCloseAdd}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open} style={{ backgroundColor: '#fff', width: 400, borderRadius: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Box style={{ borderTopRightRadius: 4, borderTopLeftRadius: 4 }} bgcolor="primary.main" color="background.paper" p="20px" display="flex" alignItems='center'>
                        <Add style={{ fontSize: 24 }} /><Typography variant="h5">Add New Tool</Typography>
                    </Box>
                    <Box p="30px" display="flex" flexDirection="column">
                        <TextField
                            className={styles.input}
                            size="medium"
                            variant="outlined"
                            label="Tool Name"
                            onChange={e => setName(e.target.value)}
                            value={name} />
                        <TextField
                            className={styles.input}
                            size="medium"
                            variant="outlined"
                            label="Tool Link"
                            onChange={e => setLink(e.target.value)}
                            value={link}
                        />
                        <TextField
                            className={styles.input}
                            size="medium"
                            variant="outlined"
                            label="Tool Description"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                        />
                        <TextField
                            className={styles.input}
                            size="medium"
                            variant="outlined"
                            label="Tags"
                            onChange={e => setTags(e.target.value)}
                            value={tags}
                        />
                        <Box display="flex" justifyContent="flex-end" mt="20px">
                            <Button
                                startIcon={<Cancel />}
                                color="secondary"
                                style={{marginRight: 10}}
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                            >
                                <span>Add Tool</span>
                            </Button>
                        </Box>
                    </Box>
                </form>

            </Fade>
        </Modal>
    )
}