import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Typography, Grid, IconButton, Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { likePost } from "../../actions/post";
import { deletePost } from "../../actions/post";


const ButtonLikeHandler = (id, accountLike, dispatch) => {
    console.log("like");
    dispatch(likePost(id, accountLike));
}

const ButtonDeleteHandler = (id, accountDelete, dispatch) => {
    console.log("delete");
    dispatch(deletePost(id, accountDelete));
}

function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        color: "white"
      },
      children: `${name[0].toUpperCase()}`,
    };
  }


export const Post = ({ id, title, accountName, content, index, tags }) => {
    const dispatch = useDispatch();
    const currentPosts = useSelector(state => state.post.posts);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { user: currentUser } = useSelector(state => state.auth);

    return (
        <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
            <Grid container alignItems="center">
                <Grid container md={1} xs={1} justifyContent="center">
                    <Avatar {...stringAvatar(accountName)} />
                </Grid>
                <Grid item md={10} xs={10}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle2">
                        by: <b>{accountName}</b>
                    </Typography>
                </Grid>
                <Grid item md={1} xs={1}>
                    {isLoggedIn && accountName === currentUser.accountName
                        ? <Box display="flex" alignItems="right" float="right" justifyContent="right">
                            <IconButton aria-label="delete" onClick={() => ButtonDeleteHandler(id, currentUser.accountName, dispatch)} sx={{ justifyContent: "right" }}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </Box>
                        : null}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <Typography  sx={{marginLeft:"2em", marginRight:"2em", marginTop:"1em", marginBottom:"1em"}}>
                        <hr />
                    </Typography>    
                    <Box display="flex" alignItems="left" justifyContent="left" marginLeft="2em" marginRight="2em">
                        <Typography variant="body2">
                            {content}
                        </Typography>
                    </Box>
                    <Typography  sx={{marginLeft:"2em", marginRight:"2em", marginTop:"1em", marginBottom:"1em"}}>
                        <hr />
                    </Typography> 
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={11} xs={9}>
                    <Box display="flex" alignItems="center" justifyContent="left" marginLeft="2em" marginRight="2em">
                        <Typography variant="body2">
                            Tags: {String(tags).replace(/,/g, ", ")}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={1} xs={2}>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <Typography variant="subtitle1" fontSize="1em">
                            {currentPosts[index].likesFromAccounts.length}
                        </Typography>
                        <IconButton
                            aria-label="like"
                            onClick={() => ButtonLikeHandler(id, currentUser.accountName, dispatch)}>
                            <FavoriteBorderIcon size="1em" />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
