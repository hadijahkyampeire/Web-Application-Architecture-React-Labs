import React from 'react';
import './PostDetails.css';
import Comments from './Comments';

function PostDetails({ post, handleDeletePost, handleEditPost }) {

  return (
    <div className='post-details'>
      <h3 className='centered'>{post.title}</h3>
      <p className='centered'>{post.author}</p>
      <p>{post.content}</p>
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