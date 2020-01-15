import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, Input, TextField, CircularProgress, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import api from '../services/api';
import Tool from '../components/Tool'
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
    const [tools, setTools] = useState([]);
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tagsOnly, setTagsOnly] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [term, setTerm] = useState('');

    const styles = useStyles();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const response = await api.get('/tools');
            setTools(response.data);
            setLoading(false);
        }

        getData();
    }, [reload])

    useEffect(() => {
        handleSearch(term)
    }, [tools])

    async function handleAdd(tool) {
        handleClose();
        setLoading(true);
        await api.post(`/tools/`, tool);
        handleClose();
        setReload(reload => (!reload));
        setLoading(false);
    }

    async function handleDelete(id) {
        setLoading(true);
        await api.delete(`/tools/${id}`);
        setReload(reload => (!reload));
        setLoading(false);
    }

    function handleSearch(term) {
        setTerm(term)
        if (term === '') { return setSearch(false); }

        setSearch(true);
        let results = [];
        if (!tagsOnly) {
            results = tools.filter(tool => (
                (tool.name.toLowerCase().includes(term.toLowerCase())) ||
                (tool.description.toLowerCase().includes(term.toLowerCase()))
            ))
        }
        else {
            tools.map(tool => {
                if (tool.tags.join(' ').toLowerCase().includes(term.toLowerCase())) {
                    results = [...results, tool]
                }
            })
        }
        setSearchResults(results);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Container style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h3">VUTTR</Typography>
            <Typography variant="h4">Very Useful Tools To Remember</Typography>
            <Box display="flex" justifyContent="center">
                {loading && <CircularProgress />}
            </Box>

            <Box display='flex' justifyContent="space-between" mt="40px" mb="40px">
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Search />
                    </Grid>
                    <Grid item>
                        <TextField label="Search" onChange={e => handleSearch(e.target.value)} />
                    </Grid>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={tagsOnly}
                                onChange={e => setTagsOnly(e.target.checked)}
                                value="tagsOnly"
                                color="primary" />
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

            {!search ?
                tools.map((item) => (
                    <Tool key={item.id} tool={item} handleDelete={handleDelete} />
                )) :
                searchResults.map((item, index) => (
                    <Tool key={index.toString()} tool={item} handleDelete={handleDelete} />
                ))
            }
        </Container >
    )
}