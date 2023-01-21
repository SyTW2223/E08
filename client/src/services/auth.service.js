import axios from 'axios';


const API_URL = "http://localhost:8000/";


const register = (username, accountName, email, password) => {
  return axios.post(API_URL + "signup", {
    "username": username,
    "accountName": accountName,
    "email": email,
    "password": password,
  });
};


const login = (accountName, password) => {
  return axios.post(API_URL + "login", {
    "accountName": accountName,
    "password": password
  }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data
  });
};


const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("profile");
}


export default {
  register,
  login,
  logout
};
