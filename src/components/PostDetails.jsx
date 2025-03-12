import React from 'react';
import './PostDetails.css';

function PostDetails({ post }) {
  return (
    <div className='post-details'>
      <h3 className='centered'>{post.title}</h3>
      <p className='centered'>{post.author}</p>
      <p>{post.content}</p>
      <div className='footer'>
          <button className='btn btn-edit'>Edit</button>
          <button className='btn btn-delete'>Delete</button>
      </div>
    </div>
  )
}

export default PostDetails