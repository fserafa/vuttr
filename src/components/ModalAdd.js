import React, { useState } from 'react'
import { Modal, TextField, Backdrop, Fade, Box, Button, Input, FormGroup, Typography } from '@material-ui/core';
import {Save, Cancel} from '@material-ui/icons';

export default function ModalAdd(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);

    const { open, handleClose, handleAdd } = props;

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
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Fade in={open} style={{ backgroundColor: '#fff', width: 400, padding: 20 }}>

                <form onSubmit={handleSubmit}>
                <Typography variant="h4">Add</Typography>

                    {/* <Box display="flex" flexDirection="column"> */}
                    <FormGroup>
                        <TextField label="Name"
                            onChange={e => setName(e.target.value)}
                            value={name} />
                        <TextField label="Link"
                            onChange={e => setLink(e.target.value)}
                            value={link}
                        />
                        <TextField label="Description"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                        />
                        <TextField label="Tags"
                            onChange={e => setTags(e.target.value)}
                            value={tags}
                        />
                    </FormGroup>
                    {/* </Box> */}
                    <Box display="flex" justifyContent="flex-end" mt="20px">
                        <Button
                            startIcon={<Cancel />}
    
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                        >
                            <span>Save</span>
                        </Button>
                    </Box>
                </form>

            </Fade>
        </Modal>
    )
}