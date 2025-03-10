import React from 'react';
import './Post.css';

function Post(props) {
  return (
    <div className='post'>
      <h3>Id: {props.id}</h3>
      <span>Title: {props.title}</span>
      <span>Author: {props.author}</span>
    </div>
  )
}

export default Post;