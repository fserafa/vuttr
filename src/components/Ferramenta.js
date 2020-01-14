import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    card: {
        padding: 30,
        marginBottom: 30
    },
});

export default function Ferramenta(props) {
    const styles = useStyles();
    const { ferramenta, handleDelete } = props;

    return (
        <Card className={styles.card}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <a href={ferramenta.link}><Typography variant="h4">{ferramenta.name}</Typography></a>
                <Button
                    onClick={() => handleDelete(ferramenta.id)}
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete />}
                >
                    <span>Delete</span>
                </Button>
            </Box>
            <Typography variant="h4">{ferramenta.link}</Typography>
            <Typography variant="body1">{ferramenta.description}</Typography>
            <Typography variant="body1">
                {ferramenta.tags.map((tag, index) => <span key={index}>#{tag} </span>)}
            </Typography>
        </Card>
    )
}