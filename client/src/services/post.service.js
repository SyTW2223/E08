import axios from "axios";


const API_URL = "http://localhost:8000/";

export const setPost = (accountName, title, content, tags) => {
  console.log("setPost");
  const token = JSON.parse(localStorage.getItem('user')).accessToken;
  return axios.post(API_URL + "/post" ,{
      "accountName": accountName,
      "authorization": "Bearer: " + token,
      "title": title,
      "content": content,
      "tags": tags
  });
};


export const getPost = (accountName) => {
    return axios.get(API_URL + "post", {
        "accountName": accountName,
        "authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
    });
};


export default {
  setPost,
  getPost
};
