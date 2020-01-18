import React from 'react';
import { Typography, Box, Container } from '@material-ui/core';

export default function Header() {

    return (
        <div>
            <Box display="flex" justifyContent="center" bgcolor='primary.main' color='#fff' padding='20px 0'>
                <Container>
                    <Typography variant="h4">Very Useful Tools To Remember</Typography>
                </Container>
            </Box>
        </div>
    );
}

