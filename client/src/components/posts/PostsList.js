import React from 'react'
import { Post } from './Post'
import { useSelector } from 'react-redux'

export const PostsList = () => {
  const posts = useSelector(state => state.posts)

  const renderedPosts = posts.map(post => (
    <Post post = {post}></Post>
  ))

  return (
    {renderedPosts}
  )
}