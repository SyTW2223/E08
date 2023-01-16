import axios from "axios";


const API_URL = "http://localhost:8000/";


export const getProfile = (accountName) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  return axios.get(API_URL + "account", {
    headers: {
      authorization: "Bearer " + accessToken
    },
    params: {
      accountName: accountName,
    }
  });
};
