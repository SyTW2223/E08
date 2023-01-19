import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { profile } from '../actions/profile';

import { IdPostsList } from './posts/IdPostsList';

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
        <Box marginTop={3}>
          <IdPostsList idPosts={children} />
        </Box>
      )}
    </div>
  );
}


export const Profile = () => {
  // const [username, setUsername] = useState("");
  // const [account, setAccount] = useState("");
  // const [email, setEmail] = useState("");
  // const [description, setDescription] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);

  const [value, setValue] = useState(0);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { description } = useSelector((state) => state.profile);
  const { posted } = useSelector((state) => state.profile);
  const { likedPosts } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const LoadProfile = (() => {
    React.useEffect(() => {
      dispatch(profile(currentUser.accountName))
        .then(() => {
          // setUsername(currentUser.username);
          // setAccount(currentUser.accountName);
          // setEmail(currentUser.email);
          // setDescription(profileInfo.description);
          setProfileLoaded(true);
        }).catch(() => {
          setProfileLoaded(false);
        });
    }, []);
  });

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  } else {
    LoadProfile();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <img src={userProfile} alt="profile" style={profileStyle}></img>
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
              {description
                ? <Typography variant="h6" padding={3}>
                  {description}
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
        <Box sx={{ width: '100%', mt: '1.2em' }}>
          <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="wrapped label tabs example"
              variant="fullWidth"
              centered
            >
              <Tab label="My posts" value={0} />
              <Tab label="Posts liked" value={1} />
            </Tabs>
          </Box>
          {profileLoaded
            ? <div>
              <TabPanel value={value} index={0}>
                {posted}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {likedPosts}
              </TabPanel>
            </div>
            : null
          }
        </Box>
      </Box>
    </div>
  )
}


export default Profile;