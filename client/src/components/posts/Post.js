import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Typography, Grid, IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { likePost } from "../../actions/post";

const ButtonLikeHandler = (id, accountLike,dispatch) => {
    dispatch(likePost(id, accountLike));
}

export const Post = ({ id, title, accountName, content, index, tags }) => {
    const dispatch = useDispatch();
    const currentPosts = useSelector(state => state.post.posts);

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
                                <Typography variant="subtitle1" fontSize="1.5em">
                                    {currentPosts[index].likesFromAccounts.length}
                                </Typography>
                                <IconButton
                                    aria-label="like"
                                    onClick={() => ButtonLikeHandler(id, JSON.parse(localStorage.getItem('user')).accountName, dispatch)}>
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}