import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './PostsList';
import { getPostsFromIds } from '../../actions/post';


export const IdPostsList = ({ idPosts }) => {
  const [postsLoaded, setPostLoaded] = useState(false);

  const { posts: currentPosts } = useSelector(state => state.post);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPostsFromIds(idPosts))
      .then(() => {
        setPostLoaded(true);
      }).catch(() => {
        setPostLoaded(false);
      });
  }, [dispatch, idPosts]);

  return (
    <div>
      { postsLoaded
        ? <PostsList posts={currentPosts} />
        : null
      }
    </div>
  )
}
