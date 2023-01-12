import axios from "axios";


const API_URL = "http://localhost:8000/";


export const getPost = (accountName) => {
    return axios.get(API_URL + "post", {
        accountName: accountName,
        authoritation: "Bearer " + localStorage.getItem("accessToken")
    });
};


export default {
  getPost
};
