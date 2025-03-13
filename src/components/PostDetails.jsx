import React, { useEffect, useState } from 'react';
import './PostDetails.css';
import Comments from './Comments';
import { useParams } from 'react-router-dom';
import { deletePost, fetchPost } from '../api/posts';
import { useNavigate, Link } from 'react-router-dom';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPostDetails] = useState({});

  useEffect(() => {
    if (!id) return;

    fetchPost(id)
      .then((res) => setPostDetails(res.data.data))
      .catch((e) => console.error(e.message || "Error fetching post details"))
  }, [id]);

  const handleDeletePost = async () => {
      await deletePost(id);
      navigate("/posts")
  }

  return (
    <div className='post-details'>
      <p className='title'>ID: {post.id}</p>
      <p className='title'>Title: {post.title}</p>
      <p className='author'>Author: {post.author}</p>
      <p>Content: {post.content}</p>
      <h3>Comments</h3>
      <Comments comments={post?.comments} />
      <div className='footer'>
          <Link className='btn btn-edit' to="/create-post" state={{ post }}>Edit</Link>
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
