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
  return axios.get(API_URL + "login", {
  params:{
    "accountName": accountName,
    "password": password
  }
  });
};


export default {
  register,
  login
};
