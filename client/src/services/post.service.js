import axios from "axios";


const API_URL = "http://localhost:8000/";

const setPost = (accountName, title, content, tags) => {
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


const getPosts = () => {
  return axios.get(API_URL + "posts", {
  });
};

const postService = {
  setPost,
  getPosts
};

export default postService;
