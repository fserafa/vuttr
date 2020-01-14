import React, { useState } from 'react'
import { Modal, TextField, Backdrop, Fade, Box, Button, Input, FormGroup } from '@material-ui/core';
import Save from '@material-ui/icons/Save';

export default function ModalAdd(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [ferramenta, setFerramenta] = useState({
        name: '',
        link: '',
        description: '',
        tags: []
    });

    const { open, handleClose, handleAdd } = props;


    function handleSubmit(e) {
        e.preventDefault()

        let ferramenta = {
            name: name,
            link: link,
            description: description,
            tags: tags.split(' ')
        };

        handleAdd(ferramenta);
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                    >
                        <span>Save</span>
                    </Button>
                </form>

            </Fade>
        </Modal>
    )
}