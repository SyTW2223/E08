import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { profile } from '../actions/profile';
import { logout } from "../actions/auth";

import { Post } from './posts/Post';
import { PostsList } from './posts/PostsList';


import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import userProfile from '../assets/images/user_profile_icon.png';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export const Profile = () => {
  let navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const [value, setValue] = useState(0);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { profile: profileInfo } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(profile(currentUser.accountName))
      .then(() => {
        setProfileLoaded(true);
        setDescription(profile.description);
        setPosts(profile.posts);
        setLikedPosts(profile.likedPosts);
      }).catch(() => {
        setProfileLoaded(false);
      });
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const profileStyle = {
    maxWidth: '290px',
    height: 'auto',
  };

  return (
    <div className="profile">
      <Box
        display="flex"
        color="primary"
        flexDirection={"column"}
        alignItems="center"
        maxWidth={1000}
        justifyContent="center"
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={5}
        sx={{ backgroundColor: 'primary.main' }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid container xs={12} md={4} justifyContent="center">
            <img src={userProfile} style={profileStyle}></img>
          </Grid>
          <Grid container xs={12} md={6}>
            <Grid item xs={4} md={4}>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6" padding={3}>
                Username:
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              <Typography variant="h6" padding={3}>
                {currentUser.username}
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6" padding={3}>
                Account:
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              <Typography variant="h6" padding={3}>
                {currentUser.accountName}
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6" padding={3}>
                About me:
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              {currentUser.description
                ? <Typography variant="h6" padding={3}>
                  {currentUser.description}
                </Typography>
                : <Typography variant="body1" padding={3.5}>
                  No description has been provided.
                </Typography>
              }
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6" padding={3}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
              <Typography variant="h6" padding={3}>
                {currentUser.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
          <hr />
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="wrapped label tabs example"
            centered
          >
            <Tab label="My posts" value={0} />
            <Tab label="Posts liked" value={1} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </div>
  )
}


export default Profile;