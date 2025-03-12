import React from 'react';
import './PostDetails.css';
import Comments from './Comments';

function PostDetails({ post, handleDeletePost, handleEditPost }) {

  return (
    <div className='post-details'>
      <p className='title'>Title: {post.title}</p>
      <p className='author'>Author: {post.author}</p>
      <p>Content: {post.content}</p>
      <h3>Comments</h3>
      <Comments comments={post.comments} />
      <div className='footer'>
          <button className='btn btn-edit' onClick={() => handleEditPost(post)}>Edit</button>
          <button 
            className='btn btn-delete' 
            onClick={() => handleDeletePost(post.id)}>
              Delete
          </button>
      </div>
    </div>
  )
}

export default PostDetails
