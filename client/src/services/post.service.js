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

const likePosts = (id, accountLike) => {
  const token = "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken;
  return axios.patch(API_URL + "like", {
    "postID": id,
    "accountLike": accountLike
  }, {
    headers: {
      authorization: token,
    },
  },
    { withCredentials: true }
  );
};

const deletePosts = (id, accountDelete) => {
  const token = "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken;
  return axios.delete(API_URL + "post", { headers: {
    authorization: token,
  },
  data: {
    "postID": id,
    "accountName": accountDelete
  }});
};

  const postService = {
    setPost,
    getPosts,
    likePosts,
    deletePosts
  };

  export default postService;
