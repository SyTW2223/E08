import { Paper, Box, Typography, Grid } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const Post = (post) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Grid container spacing={2}>
                <Grid item>
                    <AccountCircleIcon Size="1em" />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="subtitle1">
                                {post.AccountName}
                            </Typography>
                            <Typography variant="body2">
                                {post.content}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography variant="body2">
                                    {post.likes}
                                </Typography>
                                <FavoriteBorderIcon />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}