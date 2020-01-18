import React, { useState, useEffect } from 'react';
import { Container, Box, Button, TextField, Grid, Checkbox, FormControlLabel, InputAdornment, Typography } from '@material-ui/core';
import api from '../services/api';
import Tool from '../components/Tool'
import ModalAdd from '../components/ModalAdd';
import { Search, Add } from '@material-ui/icons';
import ModalRemove from '../components/ModalRemove';
import Loading from '../components/Loading';



export default function Index() {
    const [tools, setTools] = useState([]);
    const [reload, setReload] = useState(false)
    const [openAdd, setOpenAdd] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tagsOnly, setTagsOnly] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [term, setTerm] = useState('');
    const [tool, setTool] = useState('');

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const response = await api.get('/tools');
            setTools(response.data.reverse());
            setLoading(false);
        }

        getData();
    }, [reload])

    useEffect(() => {
        handleSearch(term)
    }, [tools])

    async function handleAdd(tool) {
        handleCloseAdd();
        setLoading(true);
        await api.post(`/tools/`, tool); 
        setReload(reload => (!reload));
        setLoading(false);
    }

    async function handleRemove(id) {
        handleCloseRemove();
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

    function handleOpenRemove(tool) {
        setTool(tool);
        setOpenRemove(true);
    }

    function handleCloseAdd() {
        setOpenAdd(false);
    }

    function handleCloseRemove() {
        setOpenRemove(false);
    }

    return (
        <Container style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>


            <Loading loading={loading} />

            <Box display='flex' justifyContent="space-between" mt="40px" mb="40px">
                <Grid container spacing={1} alignItems="center">
                    <TextField
                        label="Search VUTTR"
                        onChange={e => handleSearch(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
                        }}
                        variant="outlined"
                        style={{ marginRight: 10 }}
                        autoCorrect='false'
                        autoCapitalize='none'
                    />
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
                    onClick={() => setOpenAdd(true)}
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                >
                    <span>Add</span>
                </Button>
            </Box>

            <ModalAdd open={openAdd} handleCloseAdd={handleCloseAdd} handleAdd={handleAdd} />
            <ModalRemove open={openRemove} handleCloseRemove={handleCloseRemove} tool={tool} handleRemove={handleRemove} />

            {search && searchResults.length === 0 ? (
                <Typography variant='h5'>No tools found</Typography>
            ) : null}

            {!search ?
                tools.map((item) => (
                    <Tool key={item.id} tool={item} handleOpenRemove={handleOpenRemove} />
                )) :
                searchResults.map((item, index) => (
                    <Tool key={index.toString()} tool={item} handleOpenRemove={handleOpenRemove} />
                ))
            }
        </Container >
    )
}