import React from 'react'
import Post from './Post';
import './Posts.css';

function Posts({ posts, setClickedPostId }) {
  
  return (
    <div className='posts'>
      {posts.map(post => {
        return (
          <div key={post.id} onClick={() => setClickedPostId(post.id)}>
            <Post 
              id={post.id} 
              title={post.title} 
              author={post.author} />
          </div>
        )
      })}
      </div>
  )
}

export default Posts