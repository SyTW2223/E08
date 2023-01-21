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


export const patchProfile = (accountName, accountChanges) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  return axios.patch(API_URL + "account", accountChanges,
    {
      headers: {
        authorization: "Bearer " + accessToken
      },
      params: {
        accountName: accountName
      },
    }
  );
};
