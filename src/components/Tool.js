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

export default function Tool(props) {
    const styles = useStyles();
    const { tool, handleDelete } = props;

    return (
        <Card className={styles.card}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                <a href={tool.link}><Typography variant="h4">{tool.name}</Typography></a>
                <Button
                    onClick={() => handleDelete(tool.id)}
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete />}
                >
                    <span>Remove</span>
                </Button>
            </Box>
            <Typography variant="body1" style={{ marginBottom: 20 }}>{tool.description}</Typography>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                {tool.tags.map((tag, index) => <span key={index}>#{tag} </span>)}
            </Typography>
        </Card>
    )
}