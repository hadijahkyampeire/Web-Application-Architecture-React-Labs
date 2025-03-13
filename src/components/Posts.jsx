import React from 'react'
import Post from './Post';
import './Posts.css';
import { Link } from 'react-router-dom';

function Posts({ posts }) {
  
  return (
    <div className='posts'>
      {posts.map(post => {
        return (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <Post 
              id={post.id} 
              title={post.title} 
              author={post.author} />
          </Link>
        )
      })}
      </div>
  )
}

export default Posts
