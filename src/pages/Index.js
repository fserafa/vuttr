import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, Input, TextField, CircularProgress, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import api from '../services/api';
import Ferramenta from '../components/Ferramenta'
import ModalAdd from '../components/ModalAdd';
import { makeStyles } from '@material-ui/core/styles';
import { Search, Add } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});

export default function Index() {
    const [ferramentas, setFerramentas] = useState([]);
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tagsOnly, setTagsOnly] = useState(false);

    const styles = useStyles();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const response = await api.get('/ferramentas');
            setFerramentas(response.data);
            setLoading(false);
        }

        getData();
    }, [reload])

    async function handleAdd(ferramenta) {
        setLoading(true);
        await api.post(`/ferramentas/`, ferramenta);
        handleClose();
        setReload(reload => (!reload));
        setLoading(false);
    }

    async function handleDelete(id) {
        setLoading(true);
        await api.delete(`/ferramentas/${id}`);
        setReload(reload => (!reload));
        setLoading(false);

    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Container>
            <Typography variant="h3">VUTTR</Typography>
            <Typography variant="h4">Very Useful Tools To Remember</Typography>
            <Box display="flex" justifyContent="center">
                {loading && <CircularProgress />}
            </Box>

            <Box display='flex' justifyContent="space-between">
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Search />
                    </Grid>
                    <Grid item>
                        <TextField label="Search" />
                    </Grid>
                
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={tagsOnly}
                            onChange={e => setTagsOnly(e.target.checked)}
                            value="tagsOnly" 
                            color="primary"/>
                    }
                    label="search in tags only"
                />
                </Grid>
                <Button
                    onClick={() => setOpen(true)}
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                >
                    <span>Add</span>
                </Button>
            </Box>

            <ModalAdd open={open} handleClose={handleClose} handleAdd={handleAdd} />

            {
                ferramentas.map((item) => (
                    <Ferramenta key={item.id} ferramenta={item} handleDelete={handleDelete} s />
                ))
            }


        </Container >
    )
}