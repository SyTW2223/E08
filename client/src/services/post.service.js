import axios from "axios";


const API_URL = "http://localhost:8000/";

const setPost = (accountName, title, content, tags) => {
  console.log("setPost");
  const token = "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken;
  return axios.post(API_URL + "post", {
    "accountName": accountName,
    "title": title,
    "content": content,
    "tags": tags
  }, {
    headers: {
      authorization: token,
    }
  }
  );
};


const getPost = (accountName) => {
  return axios.get(API_URL + "post", {
    "accountName": accountName,
    "authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
  });
};

const postService = {
  setPost,
  getPost
};

export default postService;
