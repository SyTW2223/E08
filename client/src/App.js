import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

function App() {
    return(
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit" sx={{
                borderRadius: 15,
                margin: '30px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography variant="h2" align="center" sx={{
                    color: 'rgba(0,183,255, 1)',
                }}>
                    Utopia
                </Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;
