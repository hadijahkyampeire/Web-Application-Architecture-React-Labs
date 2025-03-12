import React, { useEffect, useState } from 'react';
import Posts from '../components/Posts';
import './dashboard.css';
import PostDetails from '../components/PostDetails';
import { fetchAllPosts, fetchPost, deletePost } from '../api/posts';
import AddPostModal from '../components/AddPostModal';

// const posts = [
//   { id: 111, title: "Happiness", author: "John", content: "This is content for post one" },
//   { id: 112, title: "MIU", author: "Dean", content: "This is content for post two" },
//   { id: 113, title: "Enjoy Life", author: "Jasmine", content: "This is content for post three" }
// ];

function Dashboard() {
  const [title, setTitle] = useState('');
  const [postData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postDetails, setPostDetails] = useState(null);

  const [clickedPostId, setClickedPostId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleChangeFirstPostTitle = () => {
    const updatePosts = postData.map((p, i) => i === 0 ? {...p, title }: p);
    setPostsData(updatePosts);
  }

  const handlePostDelete = async (postId) => {
    await deletePost(postId);
    setPostDetails(null);
    getAllPosts();
  };


  const getAllPosts = () => {
    fetchAllPosts()
      .then((res) => setPostsData(res.data))
      .catch((e) => console.error(e.message || "Error fetching posts"));
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (!clickedPostId) return;

    setLoading(true);
    setError(null);

    fetchPost(clickedPostId)
      .then((res) => setPostDetails(res.data.data))
      .catch((e) => setError(e.message || "Error fetching post details"))
      .finally(() => setLoading(false));
  }, [clickedPostId]);

  return (
    <div className='dashboard'>
      <div className='form'>
        <input type="text" name="post-title" value={title} onChange={e => setTitle(e.target.value)}/>
        <button 
          onClick={handleChangeFirstPostTitle} 
          disabled={title.trim() === ''}>
            Change Name
        </button>
      </div>
      <button className='new-post-btn' onClick={handleOpen}>Add New Post</button>
      <Posts posts={postData} setClickedPostId={setClickedPostId} />
      <h2>Post Details</h2>
      {loading && <div>Loading post details...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && postDetails ? (
        <PostDetails post={postDetails} fetchPosts={getAllPosts} handleDeletePost={handlePostDelete} />
      ) : (
        <div>No clicked post, please click a post to display its details</div>
      )}
      <AddPostModal open={open} handleClose={handleClose} fetchPosts={getAllPosts} />
    </div>
  )
}

export default Dashboard