import axios from "axios";


const API_URL = "http://localhost:8000/";


export const getPost = (username, accountName, email, password) => {
    return axios.get(API_URL + "post", {
        accountName: accountName,
    });
};



export default {
  getPost
};
