import { Paper, Box, Typography, Grid } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const Post = ({ title, accountName, content, likes, tags }) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Grid container spacing={2}>
                <Grid item>
                    <AccountCircleIcon Size="3em" sx={{ marginTop: "6px" }} />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                {title}
                            </Typography>
                            <Typography variant="subtitle2">
                                {accountName}
                            </Typography>
                            <hr />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {content}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <hr />
                            <Box display="flex" flexDirection="row" alignItems="left" justifyContent="left">
                                <Typography variant="body2">
                                    Tags: {String(tags).replace(/,/g, ", ")}
                                </Typography>
                            </Box>
                            <Box display="flex" flexDirection="row" alignItems="right" justifyContent="right">
                                <Typography variant="body2">
                                    {likes}
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