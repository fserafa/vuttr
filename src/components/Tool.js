import React from 'react';
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
    const { tool, handleOpenRemove } = props;

    return (
        <Card className={styles.card}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                <a href={tool.link} target='_blank' rel='noopener noreferrer'><Typography variant="h4">{tool.name}</Typography></a>
                <Button
                    onClick={() => handleOpenRemove(tool)}
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete />}
                >
                    <span>Remove</span>
                </Button>
            </Box>
            <Typography variant="body1" style={{ marginBottom: 20 }}>{tool.description}</Typography>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                #{tool.tags.join(' #')}

                {/* {tool.tags.map((tag, index) => <span key={index}>#{tag} </span>)} */}
            </Typography>
        </Card>
    )
}