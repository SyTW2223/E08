import axios from "axios";


const API_URL = "http://localhost:8000/";


export const register = (username, accountName, email, password) => {
  return axios.post(API_URL + "account", {
    "username": username,
    "accountName": accountName,
    "email": email,
    "password": password,
  });
};


export const login = (accountName, password) => {
  return axios.post(API_URL + "login", {
    "accountName": accountName,
    "password": password
  });
};

const logout = () => {
  localStorage.removeItem("user");
}

export default {
  register,
  login,
  logout
};
