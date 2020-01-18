import React, { useState } from 'react'
import { Modal, TextField, Backdrop, Fade, Box, Button, Typography } from '@material-ui/core';
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
    const [tool, setTool] = useState({
        name: '',
        link: '',
        description: '',
        tags: ''
    })
    const [error, setError] = useState({
        status: true,
        message: ''
    });
    const [info, setInfo] = useState(null);


    const styles = useStyles();
    const { open, handleCloseAdd, handleAdd } = props;

    function handleChange(field, value) {
        if (field === 'link') {
            if (!value.toLowerCase().startsWith('http')) {
                setError({ status: true, message: 'Link must start with http or https' })
            }
            else {
                setError({ status: false, message: '' })
            }
        }

        setTool(tool => ({ ...tool, [field]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (error.status) {
            setError({ status: true, message: 'Link must start with http or https' })
            return;
        }


        const _tool = { ...tool };
        _tool.tags = _tool.tags.split(' ');

        setTool({
            name: '',
            link: '',
            description: '',
            tags: ''
        });
        setError({ status: true, message: '' });

        handleAdd(_tool);
    }
    function handleClose() {
        setTool({
            name: '',
            link: '',
            description: '',
            tags: ''
        });
        setError({ status: true, message: '' });
        handleCloseAdd();
    }

    return (
        <Modal
            className={styles.modal}
            open={open}
            onClose={handleClose}
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
                            onChange={e => handleChange('name', e.target.value)}
                            value={tool.name} />
                        <TextField
                            className={styles.input}
                            size="medium"
                            variant="outlined"
                            label="Tool Link"
                            onChange={e => handleChange('link', e.target.value)}
                            value={tool.link}
                            autoCapitalize='none'
                            autoCorrect='false'
                        />

                        {error.status &&
                            <Box color='error.main' marginTop='-15px' marginBottom="10px">
                                <Typography>{error.message}</Typography>
                            </Box>}

                        <TextField
                            className={styles.input}
                            size="medium"
                            variant="outlined"
                            label="Tool Description"
                            onChange={e => handleChange('description', e.target.value)}
                            value={tool.description}
                        />
                        <TextField
                            className={styles.input}
                            size="medium"
                            variant="outlined"
                            label="Tags"
                            onChange={e => handleChange('tags', e.target.value)}
                            value={tool.tags}
                            onFocus={() => setInfo('Write your tags without # and separated by space')}
                            onBlur={() => setInfo(null)}
                            autoCapitalize='none'
                            autoCorrect='false'
                        />
                        {info &&
                            <Box color='info.main' marginTop='-15px' marginBottom="10px">
                                <Typography>{info}</Typography>
                            </Box>}

                        <Box display="flex" justifyContent="flex-end" mt="20px">
                            <Button
                                startIcon={<Cancel />}
                                color="secondary"
                                style={{ marginRight: 10 }}
                                onClick={() => handleClose()}
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