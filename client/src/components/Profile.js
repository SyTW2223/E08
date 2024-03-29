import React, { useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { profile } from '../actions/profile';
import { editProfile } from '../actions/profile';
import { IdPostsList } from './posts/IdPostsList';
import { convertToBase64 } from '../helpers';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import Avatar from '@mui/material/Avatar';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import { logout } from "../actions/auth";
import { getTokenExpiration } from "../helpers";

import userAvatar from '../assets/images/user_profile_icon.png';


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
  const [inputUsername, setInputUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [errorUpload, setErrorUpload] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const [value, setValue] = useState(0);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { username } = useSelector((state) => state.profile);
  const { description } = useSelector((state) => state.profile);
  const { profilePicture } = useSelector((state) => state.profile);
  const { posted } = useSelector((state) => state.profile);
  const { likedPosts } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = React.useCallback(() => {
    setProfileLoaded(false);
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  const LoadProfile = (() => {
    React.useEffect(() => {
      dispatch(profile(currentUser.accountName))
        .then(() => {
          setProfileLoaded(true);
        }).catch(() => {
          const tokenExpiration = getTokenExpiration(currentUser.accessToken);
          if (tokenExpiration < new Date()) {
            handleLogout();
          }
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

  const handleEdit = (field) => {
    if (field === 'username') {
      setEditUsername(true)
    } else if (field === 'description') {
      setEditDescription(true)
    }
  }

  const handleCancel = (field) => {
    if (field === 'picture') {
      setEditPicture(false);
      setUploadImage("");
      setErrorUpload(false);
    }
  }

  const handleConfirm = (field) => {
    let changes = {};
    switch (field) {
      case 'username':
        //Validate username
        if (!inputUsername.match(/^[a-zA-Z0-9_\s]{1,25}$/)) {
          setUsernameError("Length less than or equal to 25 with alphanumeric characters.");
          return;
        } else {
          setUsernameError("");
        }
        changes = { username: inputUsername };
        setEditUsername(false);
        break;
      case 'description':
        changes = { description: inputDescription };
        setEditDescription(false);
        break;
      case 'picture':
        changes = { profilePicture: uploadImage };
        setEditPicture(false);
        setErrorUpload(false);
        break;
      default:
        console.log('Changes were not valid');
    }

    dispatch(editProfile(currentUser.accountName, changes))
      .then(() => {
        setUploadImage("");
        setProfileLoaded(true);
      }).catch(() => {
        const tokenExpiration = getTokenExpiration(currentUser.accessToken);
        if (tokenExpiration < new Date()) {
          handleLogout();
        }
        setProfileLoaded(false);
      });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file.size > 51200) { //50Kb en bytes
      setErrorUpload(true);
      return;
    }
    const base64 = await convertToBase64(file);
    setUploadImage(base64);
    setErrorUpload(false);
    setEditPicture(true);
    e.target.value = null;
  }

  const profileStyle = {
    width: '290px',
    height: '290px',
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
        marginY="2em"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <Grid container alignItems="center" justifyContent="center" >
          <Grid container xs={12} md={4} justifyContent="center">
            <Grid item padding={2}>
              <Avatar alt="profile" src={uploadImage || profilePicture || userAvatar} sx={profileStyle} />
            </Grid>
            <Grid container xs={12} md={12} alignItems='center' justifyContent='center'>
              <Grid item>
                <IconButton
                  aria-label="upload picture" component="label">
                  <UploadFileIcon />
                  <input
                    type="file"
                    lable="Image"
                    name="profilePicture"
                    id='file-upload'
                    accept='.jpeg, .png, .jpg'
                    onChange={(e) => { handleFileUpload(e) }}
                    hidden
                  />
                </IconButton>
              </Grid>
              {editPicture && uploadImage
                ? <Grid item>
                  <IconButton aria-label="confirm profile picture" onClick={() => handleConfirm('picture')}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton aria-label="cancel upload profile picture" onClick={() => handleCancel('picture')}>
                    <CancelIcon />
                  </IconButton>
                </Grid>
                : null
              }
              {errorUpload
                ? <Grid item>
                  <Alert severity="error" variant="filled">
                    Size must be less than 50KB!
                  </Alert>
                </Grid>
                : null
              }
            </Grid>
          </Grid>
          <Grid container xs={12} md={8} alignItems="center">
            <Grid item xs={5} md={4}>
              <Typography variant="h6" padding={2}>
                Username:
              </Typography>
            </Grid>
            {editUsername
              ? <>
                <Grid item xs={6} md={7}>
                  <TextField
                    required
                    value={inputUsername}
                    fullWidth
                    id="username-textfield"
                    label={username}
                    variant="outlined"
                    error={usernameError !== ""}
                    helperText={usernameError}
                    onChange={(e) => setInputUsername(e.target.value.substring(0, 25))}
                  />
                </Grid>
                <Grid item xs={1} md={1}>
                  <IconButton aria-label="confirm username" onClick={() => handleConfirm('username')}>
                    <CheckIcon />
                  </IconButton>
                </Grid>
              </>
              : <>
                <Grid item xs={6} md={7}>
                  <Typography variant="h6" padding={2}>
                    {username}
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <IconButton aria-label="edit username" onClick={() => handleEdit('username')}>
                    <CreateSharpIcon />
                  </IconButton>
                </Grid>
              </>
            }
            <Grid container>
              <Grid item xs={5} md={4}>
                <Typography variant="h6" padding={2}>
                  Account:
                </Typography>
              </Grid>
              <Grid item xs={7} md={8}>
                <Typography variant="h6" padding={2}>
                  {currentUser.accountName}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography variant="h6" padding={2}>
                About me:
              </Typography>
            </Grid>
            {editDescription
              ? <>
                <Grid item xs={7} md={7}>
                  <TextField
                    required
                    value={inputDescription}
                    fullWidth
                    id="description-textfield"
                    label="About me"
                    variant="outlined"
                    onChange={(e) => setInputDescription(e.target.value.substring(0, 350))}
                  />
                </Grid>
                <Grid item xs={1} md={1}>
                  <IconButton aria-label="confirm description" onClick={() => handleConfirm('description')}>
                    <CheckIcon />
                  </IconButton>
                </Grid>
              </>
              : <>
                <Grid item xs={7} md={7}>
                  <Typography variant="body1" padding={2}>
                    {description || 'No description has been provided.'}
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <IconButton aria-label="edit description" onClick={() => handleEdit('description')}>
                    <CreateSharpIcon />
                  </IconButton>
                </Grid>
              </>
            }
            <Grid item xs={5} md={4}>
              <Typography variant="h6" padding={2}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={7} md={8}>
              <Typography variant="h6" padding={2}>
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